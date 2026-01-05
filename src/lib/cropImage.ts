export default function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          reject(new Error("Canvas context not found"));
          return;
        }
  
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
  
        resolve(canvas.toDataURL('image/jpeg')); // or 'image/png'
      };
      image.onerror = () => reject(new Error("Failed to load image"));
    });
  }
  