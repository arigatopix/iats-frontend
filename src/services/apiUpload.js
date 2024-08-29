import supabase from "./supabase";

async function fileUpload(fileName, file, folder) {
  const { data, error } = await supabase.storage
    .from(`iats-bucket/${folder}`)
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) {
    console.log("error", error.message);
    throw new Error(error.message);
  }

  return data;
}

export { fileUpload };
