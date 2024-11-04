import { useState } from 'react';
import { useStorePhoto } from '@/hooks/photos/useStorePhoto';
import { Photo } from './Photo';
import { useUser } from '@/hooks/users/useUser';

export function Photos({ photoable, photoableType }) {
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [publicPhoto, setPublicPhoto] = useState(false);
  const photoableId = photoable.id;

  const { trigger, isLoading } = useStorePhoto({ photoableId, photoableType });

  const userData = useUser();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!photo) {
      setMessage('Please select a photo');
      return;
    }
    const response = await trigger(
      {
        photo,
        public: publicPhoto
      }
    );

    if (response.ok) {
      setMessage('Photo uploaded successfully');
      setPhoto(null);
    } else if (response.error) {
      setMessage('Failed to upload photo');
    }
  };

  return (
    <div>
      {userData?.status === "authenticated" && (
        <div className="flex flex-col gap-2 mt-5 px-3">
          <input
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
        {photoable.photos.map((photo) => (
          <Photo
            key={photo.id}
            photo={photo}
            photoable={photoable}
            photoableType={photoableType}
          />
        ))}
      </div>
    </div>
  );
}
