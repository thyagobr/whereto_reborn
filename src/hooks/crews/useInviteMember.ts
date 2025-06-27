import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useInviteMember = (crewId: number | string) => {
  const { trigger, isMutating } = useSWRMutation(
    {
      url: `/crews/${crewId}/memberships`,
      params: {
        method: "POST",
      },
    },
    fetcher
  );

  return { trigger, isMutating };
}; 
