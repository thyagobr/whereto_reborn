import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetCrews = () => {
  const { data, error, isLoading, mutate } = useSWR(
    { url: `/crews` },
    fetcher
  );

  return { crews: data?.crews, error, isLoading, mutate };
}; 
