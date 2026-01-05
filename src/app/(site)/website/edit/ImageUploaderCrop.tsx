import React, { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import Cropper from 'react-easy-crop';
import getCroppedImg from 'utils/cropImage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const ImageUploaderCrop = ({ setImage, aspect }: { setImage: any, aspect: number }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onCropComplete = useCallback((_, croppedPixels) => {
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
      <Button
        variant="outlined"
        startIcon={<ImageOutlinedIcon />}
        component="label"
        fullWidth
      >
        Set cover image
        <input hidden type="file" accept="image/*" onChange={handleCoverChange} />
      </Button>

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
          <Button type="button" onClick={handleCropSave} style={{ marginTop: 10 }} className='px-3' variant='contained' fullWidth color="info">
            Crop
          </Button>
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

export default ImageUploaderCrop;
