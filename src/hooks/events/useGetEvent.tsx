
import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetEvent = (id) => {
  const { data, error, isLoading } = useSWR(
    {
      url: `/events/${id}`,
    },
    fetcher
  );

  return { events: data?.events, error, isLoading };
}

