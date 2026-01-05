import React, { useState } from "react";

const ImageUploader = ({ path, setImage }: { path: string, setImage: (path: string, img: string) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImage(path, base64); // remove prefix (optional)
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button
        className="bg-dark text-white px-4 py-1"
      >
        Upload image
        <input hidden type="file" accept="image/*" onChange={handleImageChange} />
      </button>

      {preview && (
        <div style={{ marginTop: 20 }}>
          <img src={preview} alt="Preview" style={{ width: "50%", borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
