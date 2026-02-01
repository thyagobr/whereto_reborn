import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetEvent = (id) => {
  const { data, error, isLoading } = useSWR(
    {
      url: `/events/${id}`,
    },
    fetcher
  );

  return { event: data?.data?.event, error, isLoading };
}
