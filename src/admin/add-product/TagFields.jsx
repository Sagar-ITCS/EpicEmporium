import React from "react";
import { RxCross2 } from "react-icons/rx";

const TagFields = ({ tags, setTags, setFormChanged }) => {
  const addTagField = () => {
    setTags([...tags, ""]);
    setFormChanged(true);
  };

  const removeTagField = (index) => {
    setTags(tags.filter((_, i) => i !== index));
    setFormChanged(true);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
    setFormChanged(true);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTagField();
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-300">Tags</label>
      {tags.map((tag, index) => (
        <div key={index} className="relative mb-2">
          <input
            type="text"
            value={tag}
            onChange={(e) => handleTagChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white border-gray-600"
            required
          />
          {index !== 0 && (
            <button
              type="button"
              onClick={() => removeTagField(index)}
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
        onClick={addTagField}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        + Add Tag
      </button>
    </div>
  );
};

export default TagFields;
