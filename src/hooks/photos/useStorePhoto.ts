import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useStorePhoto = ({ photoableId, photoableType }) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/events/${photoableId}/photos`,
      params: {
        method: "POST",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};
