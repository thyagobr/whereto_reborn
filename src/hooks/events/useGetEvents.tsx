import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetEvents = () => {
  const { data, error, isLoading } = useSWR(
    {
      url: `/events`,
    },
    fetcher
  );

  return { events: data?.events, error, isLoading };
}

