import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useEditEvent = (eventId) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/events/${eventId}`,
      params: {
        method: "PUT",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};

