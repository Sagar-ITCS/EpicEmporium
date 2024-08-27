import React, { useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const CategoryFields = ({ categories, setCategories, setFormChanged }) => {
  const inputRefs = useRef([]);

  const addCategoryField = () => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories, ""];
      setFormChanged(true);
      return newCategories;
    });

    // Delay focusing until the new field is rendered
    setTimeout(() => {
      inputRefs.current[inputRefs.current.length - 1]?.focus();
    }, 0);
  };

  const removeCategoryField = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
    setFormChanged(true);
    // Update inputRefs after removing a field
    inputRefs.current = inputRefs.current.filter((_, i) => i !== index);
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
    setFormChanged(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategoryField();
    }
  };

  return (
    <div className="mb-4">
      <label className="block">Categories</label>
      {categories.map((category, index) => (
        <div key={index} className="relative mb-2">
          <input
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
            onKeyDown={handleKeyDown}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-200"
            required
          />
          {index !== 0 && (
            <button
              type="button"
              onClick={() => removeCategoryField(index)}
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
              tabIndex={-1}
            >
              <RxCross2 />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addCategoryField}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        + Add Category
      </button>
    </div>
  );
};

export default CategoryFields;
