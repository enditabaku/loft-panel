import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderVariant(variant: string) {
  switch (variant) {
    case "active":
      return 'success'
    case "deactive":
      return 'danger'
    case "true":
      return 'success'
    case "false":
      return 'danger'
    default:
      return 'primary'
  }
}

export const fileToBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64WithoutPrefix = base64String.split(',')[1]; // Remove prefix
      resolve(base64WithoutPrefix);
    };
    reader.onerror = reject;
  });
  
export const imageToBase64 = async (file: File): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64WithoutPrefix = base64String.split(',')[1];
        resolve(base64WithoutPrefix);
      };
      reader.onerror = (error) => {
        console.log('Error converting file to base64', error);
        reject("Error");
      };
    } catch (error) {
      console.log('Error converting file to base64', error);
      reject("Error");
    }
  });
};

export function base64ToBlobUrl(base64: string, contentType = "image/jpeg") {
  // Remove base64 prefix if present
  if(base64){
    const byteString = atob(base64?.split(",")[1] || base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: contentType });
    return URL.createObjectURL(blob);
  }
  return [''];
}


 export function formatTime(seconds: number): string {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }

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

export function readablePermission(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')   // add space before capital letters
    .replace(/^./, c => c.toUpperCase()) // capitalize first letter
    .trim();
}
  