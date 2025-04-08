import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  if (error) {
    throw new Error(error.message);
  }
  return session.session?.user;
}

export async function signUp({ name, email, password, profilePic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profile-pic")
    .upload(fileName, profilePic);
  if (storageError) {
    throw new Error(storageError.error);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profilePic: `${supabaseUrl}/storage/v1/object/public/profile-pic/${fileName}`,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}


export async function logout() {
  const {error} = await supabase.auth.signOut()
  if(error){
    throw new Error(error.message)
  }
}