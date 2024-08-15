import supabase from "./supabase";

async function getTickets() {
  const { data, error } = await supabase
    .from("tickets")
    .select(
      "id, first_name, last_name, email, phone_number, position, department, title, status, projects(name, date_start, date_end, country)"
    );

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export { getTickets };
