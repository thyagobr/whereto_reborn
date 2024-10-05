import fetch from '@/services/fetcher';
import useSWRMutation from 'swr/mutation';

export const useToggleInterest = (eventId) => {
  const { trigger, isLoading } = useSWRMutation(
    {
      url: `/events/${eventId}/interests`,
      params: {
        method: 'POST',
      },
    },
    fetch
  );

  return { trigger, isLoading };
};
