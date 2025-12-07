import { Helmet } from "react-helmet";
import ProductStepper from "../../components/forms/AddProduct/ProductStepper";

export default function ProductAdd() {
  return (
    <>
      <Helmet>
        <title>Add Product</title>
        <meta
          name="description"
          content="Add product details including benefits, FAQ, pricing, and overview."
        />
      </Helmet>

      <ProductStepper />
    </>
  );
}
