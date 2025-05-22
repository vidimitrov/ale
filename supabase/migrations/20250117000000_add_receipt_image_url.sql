/*
  # Add Receipt Image URL to Expenses Table
  
  This migration adds a receipt_image_url column to the expenses table to store references to
  uploaded receipt images in Supabase Storage.
  
  Changes:
  - Add receipt_image_url TEXT column to expenses table (nullable)
*/

-- Add receipt_image_url column to expenses table
ALTER TABLE expenses 
ADD COLUMN receipt_image_url TEXT;

-- Add comment to explain the column's purpose
COMMENT ON COLUMN expenses.receipt_image_url IS 'URL reference to receipt image stored in Supabase Storage ale-images bucket'; 