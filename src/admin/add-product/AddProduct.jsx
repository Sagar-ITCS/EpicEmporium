"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import ImageUpload from "./ImageUpload";
import CategoryFields from "./CategoryFields";

const replaceCharacters = (value) => {
  const replacements = {
    "!": "i",
    "@": "a",
    "©": "c",
    "€": "e",
    0: "o",
    "&": "and",
    $: "s",
  };
  const pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
  return value.replace(pattern, (match) => replacements[match] || match);
};
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const calculateImageRatio = (width, height) => {
  const divisor = gcd(width, height);
  const aspectRatioWidth = width / divisor;
  const aspectRatioHeight = height / divisor;
  console.log(aspectRatioWidth, aspectRatioHeight);
  return `${aspectRatioWidth}:${aspectRatioHeight}`;
};
const AddProduct = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [imagesRatio, setImagesRatio] = useState([]);
  const imgbbApiKey = "5f05dd558c48caa0c163e420fe6c18fe";

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formChanged) {
        const confirmationMessage =
          "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    const handlePaste = async (e) => {
      const items = e.clipboardData.items;
      const files = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file" && items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          files.push(file);
        }
      }
      if (files.length > 0) {
        await handleImageUpload(files);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("paste", handlePaste);
    };
  }, [formChanged]);

  const handleImageUpload = async (files) => {
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
    setImages((prevImages) => [...prevImages, ...uploadedImages]);

    setFormChanged(true);
  };

  const convertImageToWebP = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.1, // Adjusted to approximately 150KB
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      setLoading(false);
      return;
    }
    const data = {
      name,
      slug,
      images: [...new Set(images)],
      categories: [
        ...new Set(categories.filter((category) => category.trim() !== "")),
      ],
      description,
      imagesRatio,
      price,
    };
    try {
      const response = await fetch("http://localhost:3000/api/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      toast.success("Post added: " + result.name);
      setName("");
      setSlug("");
      setDescription("");
      setImages([]);
      setCategories([""]);
      setFormChanged(false);
      setImagesRatio([]);
      setPrice("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
    setLoading(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    const value = replaceCharacters(e.target.value);
    setFormChanged(true);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .substring(0, 149)
        .replace(/^-+/g, "") +
        "-" +
        Math.random().toString(36).substring(2, 7)
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-md md:rounded-md my-20 border border-gray-300">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block ">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block ">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setFormChanged(true);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400  border-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block ">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setFormChanged(true);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block ">Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setFormChanged(true);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400  border-gray-200"
            required
          />
        </div>
        <ImageUpload
          images={images}
          setImages={setImages}
          setFormChanged={setFormChanged}
          imgbbApiKey={imgbbApiKey}
          setImagesRatio={setImagesRatio}
        />

        <CategoryFields
          categories={categories}
          setCategories={setCategories}
          setFormChanged={setFormChanged}
        />

        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            loading ? "bg-yellow-500" : "bg-yellow-400 hover:bg-yellow-500"
          } text-white`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
