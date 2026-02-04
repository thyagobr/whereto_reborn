import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useEditPlace = (placeId: string | undefined) => {
  const { trigger, isMutating } = useSWRMutation(
    placeId
      ? {
          url: `/places/${placeId}`,
          params: {
            method: "PATCH",
          },
        }
      : null,
    fetcher
  );

  return { trigger, isLoading: isMutating };
};
