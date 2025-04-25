import { UAParser } from "ua-parser-js";
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

const parser = new UAParser();
export async function storeClicks({ id, destinationUrl }) {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";
    const ipResp = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await ipResp.json();
    await supabase.from("clicks").insert({
      url_id: id,
      country: country,
      city: city,
      device: device,
    });

    window.location.href = destinationUrl;
  } catch (error) {
    console.error("Cannot record a click", error);
  }
}

export async function getSingleUrlClicks(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);
  if (error) {
    console.error("Can't find the clicks", error.message);
    throw new Error("No clicks found");
  }
  return data;
}
