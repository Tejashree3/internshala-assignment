import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function Benefits({ form }) {
  const { register, control, formState: { errors } } = form;
  
  const { fields: primaryFields, append: appendPrimary, remove: removePrimary } = useFieldArray({
    control,
    name: "benefits.primary",
  });

  const { fields: secondaryFields, append: appendSecondary, remove: removeSecondary } = useFieldArray({
    control,
    name: "benefits.secondary",
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Primary Benefits</h2>
        <div className="space-y-3">
          {primaryFields.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.benefits?.primary?.[index] ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Primary Benefit"
                  {...register(`benefits.primary.${index}`, { 
                    required: "Primary benefit is required" 
                  })}
                  defaultValue={item || ""}
                />
                {primaryFields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removePrimary(index);
                    }}
                    className="text-red-500 text-xl font-bold hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.benefits?.primary?.[index] && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.benefits.primary[index].message}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            appendPrimary("");
          }}
          className="mt-3 text-green-600 font-medium hover:underline"
        >
          + Add Another Benefit
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Secondary Benefits</h2>
        <div className="space-y-4">
          {secondaryFields.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border">
                <label className="w-24 h-12 border rounded-lg flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 text-sm font-medium">
                  📷 Upload
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register(`benefits.secondary.${index}.icon`)}
                  />
                </label>

                <input
                  type="text"
                  placeholder="Enter Secondary Benefit"
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.benefits?.secondary?.[index]?.text ? "border-red-500" : ""
                  }`}
                  {...register(`benefits.secondary.${index}.text`, {
                    required: "Secondary benefit is required"
                  })}
                  defaultValue={item.text || ""}
                />

                {secondaryFields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeSecondary(index);
                    }}
                    className="text-red-500 text-xl font-bold hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.benefits?.secondary?.[index]?.text && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.benefits.secondary[index].text.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            appendSecondary({ icon: null, text: "" });
          }}
          className="mt-3 text-green-600 font-medium hover:underline"
        >
          + Add Another Benefit
        </button>
      </div>
    </div>
  );
}
