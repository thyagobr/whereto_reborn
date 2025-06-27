import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetCrew = (id: number | string | undefined) => {
  const shouldFetch = Boolean(id);
  const { data, error, isLoading } = useSWR(
    shouldFetch ? { url: `/crews/${id}` } : null,
    fetcher
  );

  return { crew: data?.crew, error, isLoading };
}; 
