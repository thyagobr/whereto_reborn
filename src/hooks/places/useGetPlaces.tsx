import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetPlaces = (params = {}) => {
  const { id } = params;
  const { data, error, isLoading } = useSWR(
    {
      url: id ? `/places/${id}` : "/places",
    },
    fetcher
  );

  return { places: data?.data?.places, error, isLoading };
};
