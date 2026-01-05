import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/utils';
import { UploadIcon } from '@/assets/icons';

const ImageUploader = ({ setImage, aspect }: { setImage: any, aspect: number }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const imgAspect = img.width / img.height;
        if (Math.abs(imgAspect - aspect) > 0.01) {
          setImageSrc(reader.result as string);
          setShowCrop(true);
        } else {
          console.log("Image is already at the aspect ratio, using as-is");
          setImageSrc(null);
          setShowCrop(true);
          setFinalImage(reader.result as string);
          setImage((reader.result as string).replace(/^data:image\/\w+;base64,/, ''))
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
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setFinalImage(croppedImage);
      setImage(croppedImage.replace(/^data:image\/\w+;base64,/, ''))
      setShowCrop(false);
    }
  };

  return (
    <div>
      <div
        id="FileUpload"
        className="relative mb-5.5 block w-full cursor-pointer appearance-none border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
      >
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleCoverChange}
          accept="image/png, image/jpg, image/jpeg"
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
            <UploadIcon />
          </div>
          <p className="mt-2.5 text-body-sm font-medium">
            <span className="text-primary">Click to upload</span> or
            drag and drop
          </p>
          <p className="mt-1 text-body-xs">
            SVG, PNG, JPG or GIF (aspect ratio 4/3)
          </p>
        </div>
      </div>

      {showCrop && imageSrc && (
        <>
          <div style={{ position: 'relative', width: '100%', height: 400, marginTop: 10 }}>
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
          <button type="button" onClick={handleCropSave} style={{ marginTop: 10 }} className='px-3 py-1 bg-lime-500 w-full text-white rounded-md'>
            Crop
          </button>
        </>
      )}

      {finalImage && (
        <div style={{ marginTop: 20 }}>
          <img src={finalImage} alt="Final" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
