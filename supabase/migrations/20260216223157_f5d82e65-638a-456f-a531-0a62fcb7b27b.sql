
-- Create listings table for real crypto-accepting businesses
CREATE TABLE public.listings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Hotel',
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.5,
  reviews INTEGER NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  tag TEXT,
  description TEXT,
  accepted_crypto TEXT[] DEFAULT '{}',
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Public read access (everyone can browse listings)
CREATE POLICY "Listings are publicly readable"
  ON public.listings FOR SELECT
  USING (true);
