import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetPlaces = () => {
  const { data, error, isLoading } = useSWR(
    {
      url: "/places",
    },
    fetcher
  );

  return { places: data?.places, error, isLoading };
};
