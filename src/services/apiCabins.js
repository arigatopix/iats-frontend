import supabase, { supabaseURL } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

async function createOrEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseURL);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  // https://zrzupdjycakvahffevxw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) create cabin record และ อ่าน imagePath แล้ว upload ไปยัง table
  let query = supabase.from("cabins");

  // CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    const message = `Cabins could not be ${id ? "edit" : "create"}`;
    throw new Error(message);
  }

  // 2) upload file
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export { getCabins, deleteCabin, createOrEditCabin };
