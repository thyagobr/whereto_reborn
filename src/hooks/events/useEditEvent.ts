import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useEditEvent = (eventId) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/events/${eventId}`,
      params: {
        method: "PATCH",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};

