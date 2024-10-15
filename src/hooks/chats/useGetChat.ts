import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetChat = ({ chatableType, chatableId }) => {
  const { data, error, isLoading, mutate } = useSWR(
    {
      url: `/chats/${chatableType}/${chatableId}`,
    },
    fetcher
  );

  return { chat: data?.data, error, isLoading, mutate };
}

