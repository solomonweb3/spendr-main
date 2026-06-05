import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbListing {
  id: number;
  name: string;
  type: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  tag: string | null;
  description: string | null;
  accepted_crypto: string[];
}

export const useListings = () => {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("id");
      if (error) throw error;
      return data as DbListing[];
    },
  });
};

export const useListing = (id: number) => {
  return useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as DbListing;
    },
  });
};
