import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

const ImageUploaderCrop = ({
  setImage,
  aspect
}: {
  setImage: (val: any) => void;
  aspect: number;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const imgAspect = img.width / img.height;

        // Always show cropper (even if ratio matches, for consistency)
        setImageSrc(reader.result as string);
        setShowCrop(true);

        if (Math.abs(imgAspect - aspect) < 0.01) {
          setFinalImage(reader.result as string);
          setImage((reader.result as string).replace(/^data:image\/\w+;base64,/, ''));
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setFinalImage(croppedImage);
    setImage(croppedImage.replace(/^data:image\/\w+;base64,/, ''));
    setShowCrop(false);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <label className="flex items-center h-[46px] justify-center gap-2 w-full cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l3 3m-3-3l-3 3M12 3v9" />
        </svg>
        Set cover image
        <input hidden type="file" accept="image/*" onChange={handleCoverChange} />
      </label>

      {/* Cropper */}
      {showCrop && imageSrc && (
        <>
          <div className="relative w-full h-[400px] overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <button
            type="button"
            onClick={handleCropSave}
            className="w-full bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
          >
            Crop
          </button>
        </>
      )}

      {/* Preview */}
      {finalImage && (
        <div className="mt-4">
          <img
            src={finalImage}
            alt="Final"
            className="max-w-full rounded-md border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploaderCrop;
