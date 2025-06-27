import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useCreateCrew = () => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/crews`,
      params: {
        method: "POST",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
}; 
