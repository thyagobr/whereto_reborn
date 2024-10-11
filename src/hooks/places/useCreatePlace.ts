import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useCreatePlace = () => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: "/places",
      params: {
        method: "POST",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};
