import axios from "axios";
import { getEmployee } from "./apiEmployee";
import { appURL, keycloakLogoutURL } from "./axios";
import supabase, { supabaseUrl } from "./supabase";

export async function login() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "keycloak",
    options: {
      scopes: "openid",
      redirectTo: `${appURL}/tickets`,
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session, error: errorSession } =
    await supabase.auth.getSession();

  if (errorSession) throw new Error(errorSession.message);

  if (!session.session) return null;

  const { data, error: errorGetUser } = await supabase.auth.getUser();

  if (errorGetUser) throw new Error(errorGetUser.message);

  const employee_id = data?.user?.user_metadata.provider_id.split(":")[2];

  const emp = await getEmployee(employee_id);

  const user = {
    ...data?.user,
    employee_id,
    name: `${emp?.first_name} ${emp.last_name}`,
    position: emp.stell_text_short,
    department: emp.dept_short,
  };

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2 Upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in user

  const { data: updatedUser, error: avatarUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  return updatedUser;
}
