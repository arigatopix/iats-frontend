// import axios from "axios";
import { axiosInstance, BACKEND_URL } from "./axios";
import supabase, { supaBACKEND_URL } from "./supabase";
import { clearSession } from "../utils/session";

export async function login() {
  window.location.href = `${BACKEND_URL}/auth/login`;
}

export async function getCurrentUser() {
  try {
    const { data } = await axiosInstance.get(
      `${BACKEND_URL}/auth/getCurrentUser`
    );

    const { isAuthenticated, token, user } = data;

    return { isAuthenticated, token, ...user };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logout() {
  clearSession();
  window.location.href = `${BACKEND_URL}/auth/logout`;
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
        avatar: `${supaBACKEND_URL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  return updatedUser;
}
