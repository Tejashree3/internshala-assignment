import React from "react";
import { useFieldArray } from "react-hook-form";

export default function Properties({ form }) {
  const { register, control, setValue, formState: { errors } } = form;

  const dosage = useFieldArray({ control, name: "properties.dosage" });
  const usage = useFieldArray({ control, name: "properties.usage" });
  const primaryIngredients = useFieldArray({ control, name: "properties.primaryIngredients" });
  const allIngredients = useFieldArray({ control, name: "properties.allIngredients" });
  const duration = useFieldArray({ control, name: "properties.duration" });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm space-y-8">
      {/* DOSAGE */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Dosage</h3>
        <div className="space-y-3">
          {dosage.fields.map((field, i) => (
            <div key={field.id}>
              <div className="flex items-center gap-3">
                <label className="w-24 h-12 border rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm">
                  📷 Icon
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setValue(`properties.dosage.${i}.icon`, e.target.files[0], { shouldDirty: true })}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Dosage Description"
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.properties?.dosage?.[i]?.text ? "border-red-500" : ""
                  }`}
                  {...register(`properties.dosage.${i}.text`, {
                    required: "Dosage description is required"
                  })}
                  defaultValue={field.text || ""}
                />
                {dosage.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      dosage.remove(i);
                    }}
                    className="text-red-500 text-xl font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.properties?.dosage?.[i]?.text && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.properties.dosage[i].text.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            dosage.append({ icon: null, text: "" });
          }}
          className="mt-3 text-green-600 font-medium hover:underline"
        >
          + Add Dosage
        </button>
      </div>

      {/* USAGE */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Usage</h3>
        <div className="space-y-3">
          {usage.fields.map((field, i) => (
            <div key={field.id}>
              <div className="flex items-center gap-3">
                <label className="w-24 h-12 border rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm">
                  📷 Icon
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setValue(`properties.usage.${i}.icon`, e.target.files[0], { shouldDirty: true })}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Left"
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.properties?.usage?.[i]?.left ? "border-red-500" : ""
                  }`}
                  {...register(`properties.usage.${i}.left`, {
                    required: "Left field is required"
                  })}
                  defaultValue={field.left || ""}
                />
                <input
                  type="text"
                  placeholder="Right"
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.properties?.usage?.[i]?.right ? "border-red-500" : ""
                  }`}
                  {...register(`properties.usage.${i}.right`, {
                    required: "Right field is required"
                  })}
                  defaultValue={field.right || ""}
                />
                {usage.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      usage.remove(i);
                    }}
                    className="text-red-500 text-xl font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.properties?.usage?.[i]?.left && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.properties.usage[i].left.message}
                </p>
              )}
              {errors.properties?.usage?.[i]?.right && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.properties.usage[i].right.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            usage.append({ icon: null, left: "", right: "" });
          }}
          className="mt-3 text-green-600 font-medium hover:underline"
        >
          + Add Usage
        </button>
      </div>

      {/* PRIMARY INGREDIENTS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Primary Ingredients</h3>
        <div className="space-y-3">
          {primaryIngredients.fields.map((field, i) => (
            <div key={field.id}>
              <div className="flex items-center gap-3">
                <select
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.properties?.primaryIngredients?.[i] ? "border-red-500" : ""
                  }`}
                  {...register(`properties.primaryIngredients.${i}`, {
                    required: "Please select an ingredient"
                  })}
                  defaultValue={field || ""}
                >
                  <option value="">Select Ingredient</option>
                  <option value="Ingredient 1">Ingredient 1</option>
                  <option value="Ingredient 2">Ingredient 2</option>
                </select>
                {primaryIngredients.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      primaryIngredients.remove(i);
                    }}
                    className="text-red-500 text-xl font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.properties?.primaryIngredients?.[i] && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.properties.primaryIngredients[i].message}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            primaryIngredients.append("");
          }}
          className="mt-3 text-green-600 font-medium hover:underline"
        >
          + Add Ingredient
        </button>
      </div>

      {/* ALL INGREDIENTS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">All Ingredients</h3>
        <div className="space-y-3">
          {allIngredients.fields.map((field, i) => (
            <div key={field.id}>
              <div className="flex items-center gap-3">
                <select
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.properties?.allIngredients?.[i] ? "border-red-500" : ""
                  }`}
                  {...register(`properties.allIngredients.${i}`, {
                    required: "Please select an ingredient"
                  })}
                  defaultValue={field || ""}
                >
                  <option value="">Select Ingredient</option>
                  <option value="Ingredient 1">Ingredient 1</option>
                  <option value="Ingredient 2">Ingredient 2</option>
                </select>
                {allIngredients.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      allIngredients.remove(i);
                    }}
                    className="text-red-500 text-xl font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.properties?.allIngredients?.[i] && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.properties.allIngredients[i].message}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            allIngredients.append("");
          }}
          className="mt-3 text-green-600 font-medium hover:underline"
        >
          + Add Ingredient
        </button>
      </div>

      {/* DURATION */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Duration</h3>
        <div className="space-y-3">
          {duration.fields.map((field, i) => (
            <div key={field.id}>
              <div className="flex items-center gap-3">
                <label className="w-24 h-12 border rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm">
                  📷 Icon
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setValue(`properties.duration.${i}.icon`, e.target.files[0], { shouldDirty: true })}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Duration Description"
                  className={`flex-1 border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.properties?.duration?.[i]?.text ? "border-red-500" : ""
                  }`}
                  {...register(`properties.duration.${i}.text`, {
                    required: "Duration description is required"
                  })}
                  defaultValue={field.text || ""}
                />
                {duration.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      duration.remove(i);
                    }}
                    className="text-red-500 text-xl font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.properties?.duration?.[i]?.text && (
                <p className="text-red-500 text-sm mt-1">
                  ⚠ {errors.properties.duration[i].text.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            duration.append({ icon: null, text: "" });
          }}
          className="mt-3 text-green-600 font-medium hover:underline"
        >
          + Add Duration
        </button>
      </div>
    </div>
  );
}
