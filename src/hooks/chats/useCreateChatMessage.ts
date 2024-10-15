import fetcher from "@/services/fetcher";
import useSWRMutation from "swr/mutation";

export const useCreateChatMessage = ({ chatableType, chatableId }) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/chats/${chatableType}/${chatableId}/messages`,
      params: {
        method: "POST",
      },
    },
    fetcher
  );

  return { trigger, isLoading };
};

