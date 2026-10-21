// DRAFT - not wired in yet. Review before merging.
// Target path: src/lib/avatar.ts
// Profile picture upload/remove. Files go to the public "avatars" storage bucket under
// <user_id>/avatar-<timestamp>.<ext>. The public URL is saved to user_metadata.avatar_url,
// which AuthContext already reads.
import { supabase } from "./supabase";

const BUCKET = "avatar";
const MAX_BYTES = 2 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Returns an error message for a bad file, or null if the file is OK. */
export function validateAvatarFile(file: File): string | null {
  if (!EXT_BY_TYPE[file.type]) return "Please choose a JPG, PNG or WebP image.";
  if (file.size > MAX_BYTES) return "Image must be 2 MB or smaller.";
  return null;
}

async function clearOldAvatars(userId: string) {
  const { data: existing, error } = await supabase.storage.from(BUCKET).list(userId);
  if (error) throw error;
  if (existing && existing.length > 0) {
    const { error: rmError } = await supabase.storage
      .from(BUCKET)
      .remove(existing.map((f) => `${userId}/${f.name}`));
    if (rmError) throw rmError;
  }
}

/** Uploads a new profile picture and returns its public URL. */
export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) throw new Error("Unsupported image type.");

  await clearOldAvatars(userId);

  // A new file name each time avoids showing a cached old picture.
  const path = `${userId}/avatar-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: "3600", upsert: false });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const { error: metaError } = await supabase.auth.updateUser({
    data: { avatar_url: data.publicUrl },
  });
  if (metaError) throw metaError;

  return data.publicUrl;
}

/** Deletes the uploaded picture. Google's picture (if any) shows again. */
export async function removeAvatar(userId: string): Promise<void> {
  await clearOldAvatars(userId);
  const { error } = await supabase.auth.updateUser({ data: { avatar_url: null } });
  if (error) throw error;
}
