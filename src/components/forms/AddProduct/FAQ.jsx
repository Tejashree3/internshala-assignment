import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function FAQ({ form }) {
  const { register, control, setValue, formState: { errors } } = useFormContext();

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control,
    name: "faq",
  });

  const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "additionalProducts",
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">FAQ</h2>
        {faqFields.map((item, index) => (
          <div key={item.id} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  className={`w-full border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.faq?.[index]?.question ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Question"
                  {...register(`faq.${index}.question`, {
                    required: "Question is required"
                  })}
                  defaultValue={item.question || ""}
                />
                {errors.faq?.[index]?.question && (
                  <p className="text-red-500 text-sm mt-1">
                    ⚠ {errors.faq[index].question.message}
                  </p>
                )}
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <input
                    className={`w-full border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                      errors.faq?.[index]?.answer ? "border-red-500" : ""
                    }`}
                    placeholder="Enter Answer"
                    {...register(`faq.${index}.answer`, {
                      required: "Answer is required"
                    })}
                    defaultValue={item.answer || ""}
                  />
                  {errors.faq?.[index]?.answer && (
                    <p className="text-red-500 text-sm mt-1">
                      ⚠ {errors.faq[index].answer.message}
                    </p>
                  )}
                </div>
                {faqFields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFaq(index);
                    }}
                    className="text-red-500 text-xl font-bold hover:text-red-700 mt-3"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            appendFaq({ question: "", answer: "" });
          }}
          className="text-green-600 font-medium hover:underline"
        >
          + Add Another FAQ
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Products</h2>
        <div className="mb-6">
          <label className="block font-medium mb-2">Section Title</label>
          <input
            className="border rounded-lg p-3 w-full focus:ring focus:ring-green-200"
            placeholder="Products for Related Concerns"
            {...register("additionalProductsTitle")}
          />
        </div>

        {productFields.map((item, index) => (
          <div key={item.id} className="mb-4">
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 cursor-pointer">
                <div className="border rounded-lg px-3 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 h-20">
                  {item.image ? (
                    <img
                      src={typeof item.image === "string" ? item.image : URL.createObjectURL(item.image)}
                      className="w-16 h-16 object-cover rounded-md"
                      alt="Product"
                    />
                  ) : (
                    <span className="text-gray-600 text-sm">📷 Add Image</span>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    setValue(`additionalProducts.${index}.image`, e.target.files[0], { shouldDirty: true })
                  }
                />
              </label>

              <div className="col-span-8">
                <input
                  className={`w-full border rounded-lg p-3 focus:ring focus:ring-green-200 ${
                    errors.additionalProducts?.[index]?.product ? "border-red-500" : ""
                  }`}
                  placeholder="Add Product Name"
                  {...register(`additionalProducts.${index}.product`, {
                    required: "Product name is required"
                  })}
                  defaultValue={item.product || ""}
                />
                {errors.additionalProducts?.[index]?.product && (
                  <p className="text-red-500 text-sm mt-1">
                    ⚠ {errors.additionalProducts[index].product.message}
                  </p>
                )}
              </div>

              {productFields.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeProduct(index);
                  }}
                  className="text-red-500 text-xl font-bold hover:text-red-700 col-span-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            appendProduct({ image: null, product: "" });
          }}
          className="text-green-600 font-medium hover:underline"
        >
          + Add Another Product
        </button>
      </div>
    </div>
  );
}
