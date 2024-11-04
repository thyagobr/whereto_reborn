import React, { useState, useEffect } from 'react';

export function InlineImage({ imageUrl }) {
  const [base64Image, setBase64Image] = useState(null);
  console.log(imageUrl);

  useEffect(() => {
    // Function to fetch image and convert to Base64
    const fetchImage = async () => {
      try {
        // Fetch the image with the ngrok-skip-browser-warning header
        const response = await fetch(imageUrl, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch image');

        // Convert response to Blob
        const blob = await response.blob();

        // Convert Blob to Base64
        const reader = new FileReader();
        reader.onloadend = () => setBase64Image(reader.result);
        reader.readAsDataURL(blob); // This triggers the onloadend event
      } catch (error) {
        console.error('Error fetching or converting image:', error);
      }
    };

    fetchImage();
  }, [imageUrl]);

  // Render the image or a loading message
  return (
    <div>
      {base64Image ? (
        <img src={base64Image} alt="Event Photo" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}
