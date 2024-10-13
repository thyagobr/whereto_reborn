import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useGetChat = ({ chatable_type, chatable_id }) => {
  const { data, error, isLoading } = useSWR(
    {
      url: `/chats/${chatable_type}/${chatable_id}`,
    },
    fetcher
  );

  return { chat: data, error, isLoading };
}

