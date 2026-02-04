import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useDeletePlace = (placeId: string | undefined) => {
  const { trigger, isMutating } = useSWRMutation(
    placeId
      ? {
          url: `/places/${placeId}`,
          params: {
            method: "DELETE",
          },
        }
      : null,
    fetcher
  );

  return { trigger, isLoading: isMutating };
};
