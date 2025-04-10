import supabase, { supabaseUrl } from "./supabase";
export async function getUrls(user_id) {
  //getting all URLs for that user
  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}
export async function deleteUrl(url_id) {
  //to delete a particular URL
  let { data, error } = await supabase.from("urls").delete("").eq("id", url_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete the URL");
  }
  return data;
}