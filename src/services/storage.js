import { supabase } from './supabase';

/**
 * Uploads a file to the 'uploads' bucket in Supabase storage.
 * @param {File} file - The file to upload
 * @param {string} folder - The subfolder in the bucket (e.g. 'avatars' or 'services')
 * @returns {Promise<string>} The public URL of the uploaded image
 */
export async function uploadImage(file, folder = 'general') {
  if (!file) throw new Error('No file provided');

  // Create a clean unique file name
  const fileExt = file.name.split('.').pop();
  const randomId = Math.random().toString(36).substring(2, 15);
  const fileName = `${randomId}-${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(filePath);

  if (!publicUrlData) {
    throw new Error('Failed to get public URL for uploaded file.');
  }

  return publicUrlData.publicUrl;
}
