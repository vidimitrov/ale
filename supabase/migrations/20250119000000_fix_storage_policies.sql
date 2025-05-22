/*
  # Fix Storage RLS Policies for ale-images bucket
  
  This migration fixes the row-level security policies for the ale-images storage bucket
  to properly allow authenticated users to upload and access images.
  
  The previous policies were causing 403 Unauthorized errors.
*/

-- Remove any existing policies for this bucket to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to select their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;

-- Make sure the bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('ale-images', 'ale-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to the bucket
CREATE POLICY "ale_images_insert_policy" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'ale-images');

-- Allow everyone to view objects in this bucket
CREATE POLICY "ale_images_select_policy" 
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'ale-images');

-- Allow authenticated users to update their own objects
CREATE POLICY "ale_images_update_policy" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'ale-images' AND (auth.uid() = owner));

-- Allow authenticated users to delete their own objects
CREATE POLICY "ale_images_delete_policy" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'ale-images' AND (auth.uid() = owner)); 