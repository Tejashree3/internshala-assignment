import * as yup from "yup";

export const productSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  subtitle: yup.string().nullable(),
  quantity: yup.string().required("Quantity is required"),
  price: yup.string().required("Price is required"),
  description: yup.string().required("Description is required").min(10),
  images: yup.array().min(1, "At least 1 image is required"),
});
