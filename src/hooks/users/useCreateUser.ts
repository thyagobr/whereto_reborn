import fetch from '@/services/fetcher';
import useSWRMutation from 'swr/mutation';

export const useCreateUser = () => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/users`,
      params: {
        method: 'POST',
      },
    },
    fetch
  );

  return { trigger, isLoading };
};

