import { useState, useRef, useEffect } from 'react';
import { useStorePhoto } from '@/hooks/photos/useStorePhoto';
import { useFetchPhotos } from '@/hooks/photos/useFetchPhotos';
import { Photo } from './Photo';
import { useUser } from '@/hooks/users/useUser';
import { toast } from 'sonner';

export function Photos({ photoable, photoableType }) {
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [publicPhoto, setPublicPhoto] = useState(false);
  const photoableId = photoable.id;

  const { trigger, isLoading } = useStorePhoto({ photoableId, photoableType });
  const { photos, reloadPhotos } = useFetchPhotos({ photoableId: photoable.id, photoableType });
  const inputFileRef = useRef(null);

  const userData = useUser();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!photo) {
      setMessage('Please select a photo');
      return;
    }

    toast.promise(trigger({ photo, public: publicPhoto }), {
      loading: 'Uploading photo...',
      success: () => {
        setPhoto(null);
        inputFileRef.current.value = '';
        reloadPhotos();
        return 'Photo uploaded successfully';
      },
      error: 'Failed to upload photo',
    });
  };

  if (!photos) {
    return <p>Loading photos...</p>;
  }

  return (
    <div>
      {userData?.status === "authenticated" && (
        <div className="flex flex-col gap-2 mt-5 px-3">
          <input
            ref={inputFileRef}
            className="border-2 border-white-800 rounded-md p-2"
            type="file" onChange={handleFileChange} />
          <div className="flex flex-row align-middle gap-2">
            <input
              type="checkbox"
              name="public"
              id="public"
              className="border-2 border-white-800 rounded-md w-4 h-auto"
              onChange={(e) => setPublicPhoto(e.target.checked)}
            />
            <label htmlFor="public">Public</label>
          </div>
          <button
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
          >Upload Photo
          </button>
          {message && <p>{message}</p>}
        </div>
      )}
      <div className="flex flex-col w-full m-auto max-w-[450px] gap-2 mt-5 px-3">
        {photos.map((photo) => (
          <Photo
            key={photo.id}
            photo={photo}
            photoable={photoable}
            photoableType={photoableType}
            reloadPhotos={reloadPhotos}
          />
        ))}
      </div>
    </div>
  );
}
