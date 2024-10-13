import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useCreateChatMessage = ({ chatable_type, chatable_id }) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/chats/${chatable_type}/${chatable_id}/messages`,
      params: {
        method: "POST",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};

