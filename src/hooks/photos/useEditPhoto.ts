import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useEditPhoto = ({ photoableId, photoableType, photoId }) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/events/${photoableId}/photos/${photoId}`,
      params: {
        method: "PUT",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};

