import { UAParser } from "ua-parser-js";
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

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrCode
) {
  // generating a short url
  const shortUrl = Math.random().toString(36).substring(2, 6);
  // uploading QR
  const fileName = `qr-${shortUrl}`;
  const { error: storageError } = await supabase.storage
    .from("qr")
    .upload(fileName, qrCode);
  if (storageError) {
    throw new Error(storageError.error);
  }
  //url creation
  const supa_qr = `${supabaseUrl}/storage/v1/object/public/qr/${fileName}`;
  let { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        destination_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url: shortUrl,
        qr: supa_qr,
      },
    ])
    .select();
  if (error) {
    console.error(error.message);
    throw new Error("Unable to create the short URL");
  }
  return data;
}

export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id,destination_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Can't find the short link");
  } else {
    return data;
  }
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

    window.location.href = destinationUrl
  } catch (error) {
    console.error("Cannot record a click",error)
  }
}
