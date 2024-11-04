import { useDeletePhoto } from '@/hooks/photos/useDeletePhoto';
import { useEditPhoto } from '@/hooks/photos/useEditPhoto';
import { useUser } from '@/hooks/users/useUser';
import { useState } from 'react';
import { InlineImage } from '@/components/InlineImage';

export function Photo({ photo, photoable, photoableType }) {
  const { user } = useUser();
  const [isPublic, setIsPublic] = useState(photo.public);

  const { trigger: deletePhoto } = useDeletePhoto({ photoableId: photoable.id, photoableType, photoId: photo.id });
  const { trigger: editPhoto } = useEditPhoto({ photoableId: photoable.id, photoableType, photoId: photo.id });

  const handleDelete = async () => {
    const response = await deletePhoto(); 

    if (response.ok) {
      console.log('Photo deleted successfully');
    } else {
      console.log('Failed to delete photo');
    }
  }

  const setPublicPhoto = async (value) => {
    const response = await editPhoto({ public: value });

    if (response.ok) {
      console.log('Photo updated successfully');
    }
    if (response.error) {
      console.log('Failed to update photo');
    }
  }

  const ownPhoto = user && photo.user.id === user.id;

  return (
    <div
      key={photo.id}
      className={`flex flex-col justify-center gap-2 ${ownPhoto ? 'border-primary' : 'border-slate-400'} rounded border-2 p-2`}>
      <InlineImage imageUrl={photo.url} />
      <div className="flex justify-between">
        <p>{photo.user.name}</p>
        <p>{photo.created_at}</p>
        {ownPhoto && (
          <>
            <div className="flex flex-row align-middle gap-2">
              <input
                type="checkbox"
                name="public"
                id="public"
                checked={isPublic}
                className="border-2 border-white-800 rounded-md w-4 h-auto"
                onChange={(e) => setPublicPhoto(e.target.checked)}
              />
              <label htmlFor="public">Public</label>
            </div>
            <button
              className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(photo.id)}
            >Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
