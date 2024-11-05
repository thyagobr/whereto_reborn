import fetcher from "@/services/fetcher";
import useSWR from "swr";

export const useFetchPhotos = ({ photoableId, photoableType }) => {
  const { data, isLoading, mutate } = useSWR(
    {
      url: `/events/${photoableId}/photos`,
      params: {
        method: "GET",
      },
    },
    fetcher
  );

  return { photos: data?.photos, isLoading, reloadPhotos: mutate };
};


