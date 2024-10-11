import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useCreateEvent = (placeId) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/places/${placeId}/events`,
      params: {
        method: "POST",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};

