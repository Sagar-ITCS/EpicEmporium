import React from "react";
import { RiCloseLine } from "react-icons/ri";
import imageCompression from "browser-image-compression";

const ImageUpload = ({
  images,
  setImages,
  setFormChanged,
  imgbbApiKey,
  setImagesRatio,
}) => {
  const convertImageToWebP = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.15, // Adjusted to approximately 150KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp",
      };
      const compressedFile = await imageCompression(file, options);
      const webPFile = new File([compressedFile], "image.webp", {
        type: "image/webp",
      });
      return webPFile;
    } catch (error) {
      console.error("Error converting image to WebP:", error);
      return null;
    }
  };

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const calculateImageRatio = (width, height) => {
    console.log(width, height);
    const divisor = gcd(width, height);
    const aspectRatioWidth = width / divisor;
    const aspectRatioHeight = height / divisor;
    console.log(aspectRatioWidth, aspectRatioHeight);
    return `${aspectRatioWidth}:${aspectRatioHeight}`;
  };

  const handleImageUpload = async (files) => {
    console.log(files);
    const uploadedImages = [];

    for (const file of files) {
      const webPFile = await convertImageToWebP(file);
      if (webPFile) {
        const formData = new FormData();
        formData.append("image", webPFile);

        try {
          const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();

          const aspectRatio = calculateImageRatio(
            data.data.width,
            data.data.height
          );

          setImagesRatio((prevImagesRatio) => [
            ...prevImagesRatio,
            aspectRatio,
          ]);

          if (data.success) {
            uploadedImages.push(data.data.url);
          } else {
            console.error("Image upload failed:", data);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }

    setImages([...images, ...uploadedImages]);
    setFormChanged(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleImageUpload(files);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagesRatio((prevImagesRatio) => {
      const newImagesRatio = [...prevImagesRatio];
      newImagesRatio.splice(index, 1);
      return newImagesRatio;
    });

    setFormChanged(true);
  };

  return (
    <div className="mb-4">
      <label className="block  font-medium mb-2">Images</label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-40 border-dashed border-2 border-yellow-400 rounded-lg flex flex-col items-center justify-center cursor-pointer"
      >
        <label htmlFor="upload" className="cursor-pointer">
          <input
            id="upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <span className="text-gray-500">
            Click or drag images here to upload
          </span>
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Uploaded ${index}`}
              className="w-full h-40 object-cover rounded-lg mb-2"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded-full"
            >
              <RiCloseLine />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
