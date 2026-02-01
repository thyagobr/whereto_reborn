import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetPlaceEvents = (placeId) => {
  const { data, error, isLoading } = useSWR(
    {
      url: `/places/${placeId}/events`,
    },
    fetcher
  );

  return { events: data?.data?.events, error, isLoading };
}
