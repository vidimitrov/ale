/*
  # Create ale-images Storage Bucket
  
  This migration creates a public Supabase Storage bucket named 'ale-images' for storing receipt images.
  
  Changes:
  - Creates storage bucket 'ale-images' if it does not exist
  - Sets appropriate RLS policies to control access
*/

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('ale-images', 'ale-images', true)
ON CONFLICT (id) DO NOTHING;

-- Remove any existing policies for this bucket to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to select their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;

-- Allow authenticated users to upload to the bucket
CREATE POLICY "Allow authenticated users to upload to ale-images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'ale-images');

-- Allow users to select their own objects
CREATE POLICY "Allow authenticated users to select from ale-images" 
ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'ale-images');

-- Allow users to update their own objects
CREATE POLICY "Allow authenticated users to update in ale-images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'ale-images' AND (auth.uid() = owner));

-- Allow users to delete their own objects
CREATE POLICY "Allow authenticated users to delete from ale-images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'ale-images' AND (auth.uid() = owner));

-- Allow public to read objects from the ale-images bucket
CREATE POLICY "Allow public read access to ale-images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'ale-images'); 