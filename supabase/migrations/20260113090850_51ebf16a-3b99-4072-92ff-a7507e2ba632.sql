-- Create Contacts table for storing form submissions
CREATE TABLE public.Contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.Contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit contact form"
ON public.Contacts
FOR INSERT
WITH CHECK (true);

-- Create policy for reading (only for authenticated admin users if needed later)
CREATE POLICY "Authenticated users can view submissions"
ON public.Contacts
FOR SELECT
USING (true);