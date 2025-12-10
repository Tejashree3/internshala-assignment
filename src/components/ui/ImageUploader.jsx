import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ImageUploader({ label, form, errors }) {
  const { setValue, watch } =  useFormContext();
  const [previewUrls, setPreviewUrls] = useState([]);
  const uploadedImages = watch("images") || [];

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // Max 5 images
    const totalImages = (uploadedImages?.length || 0) + files.length;
    if (totalImages > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    // Preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);

    // Update form state
    const updatedImages = [...(uploadedImages || []), ...files];
    setValue("images", updatedImages, { shouldDirty: true, shouldValidate: true });
  };

  const removeImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setValue("images", updatedImages, { shouldDirty: true, shouldValidate: true });

    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updatedPreviews);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {label && <span className="text-red-500">*</span>}
      </label>

      {/* Upload Area */}
      <label className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG up to 5 images</p>
        </div>
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleImageSelect}
        />
      </label>

      {/* Image Previews */}
      {previewUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Preview ({previewUrls.length}/5)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errors?.images && (
        <p className="text-red-500 text-sm mt-2">⚠ {errors.images.message}</p>
      )}
    </div>
  );
}
