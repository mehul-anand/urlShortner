import supabase, { supabaseUrl } from "./supabase";
export async function getClicksForUrls(urlIds) {
  //takes an array of urls -> id of urls as an array
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load clicks");
  }
  return data;
}

