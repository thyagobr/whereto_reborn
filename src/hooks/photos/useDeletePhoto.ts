import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useDeletePhoto = ({ photoableId, photoableType, photoId }) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/events/${photoableId}/photos/${photoId}`,
      params: {
        method: "DELETE",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};
