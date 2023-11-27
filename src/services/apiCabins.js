import supabase, { supabaseUrl } from './supabase';

//* get all cabins
export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

//* create a cabin
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
  // https://icgaksqkujdjbsajbare.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  //* 1. Create/Edit a cabin
  let query = await supabase.from('cabins');
  //* 1A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //* 1B. Update
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error('Cabins could not be created');
  }
  //* 2. Upload image
  const { error: storageError } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, newCabin.image);

  //* 3 Delete cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }
  return data;
}

//* delete a cabin
export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabins could not be deleted');
  }
}
