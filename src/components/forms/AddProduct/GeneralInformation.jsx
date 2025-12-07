import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import ImageUploader from "../../ui/ImageUploader";

export default function GeneralInformation({ form }) {
  const { register } = form;

  return (
    <div className="grid gap-6">

      {/* Product Name Dropdown */}
      <Select
        label="Product Name"
        required
        options={[
          { value: "wildForestHoney", label: "Wild Forest Honey" },
          { value: "organicPeanutButter", label: "Organic Peanut Butter" },
          { value: "herbalChyawanprash", label: "Herbal Chyawanprash" },
          { value: "almondButter", label: "Almond Butter" },
          { value: "coldPressedMustardOil", label: "Cold Pressed Mustard Oil" },
        ]}
        {...register("productName")}
      />

      {/* Subtitle Dropdown */}
      <Select
        label="Subtitle"
        required
        options={[
          { value: "pureNaturalHoney", label: "Pure & Natural Honey" },
          { value: "highProteinCrunchy", label: "High Protein Crunchy" },
          { value: "immunityBooster", label: "Immunity Booster" },
          { value: "premiumQuality", label: "Premium Quality" },
          { value: "organicHealthy", label: "100% Organic & Healthy" },
        ]}
        {...register("subtitle")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Quantity (already dropdown) */}
        <Select
          label="Quantity"
          required
          options={[
            { value: "170gm", label: "170 GM" },
            { value: "250gm", label: "250 GM" },
            { value: "500gm", label: "500 GM" },
          ]}
          {...register("quantity")}
        />

        {/* Month / Jar Dropdown */}
        <Select
          label="Month / Jar"
          required
          options={[
            { value: "6", label: "6 Months" },
            { value: "12", label: "12 Months" },
            { value: "18", label: "18 Months" },
            { value: "24", label: "24 Months" },
          ]}
          {...register("month")}
        />

        {/* Price Dropdown */}
        <Select
          label="Add Price"
          required
          options={[
            { value: "150", label: "₹150" },
            { value: "249", label: "₹249" },
            { value: "350", label: "₹350" },
            { value: "399", label: "₹399" },
            { value: "499", label: "₹499" },
          ]}
          {...register("price")}
        />
      </div>

      <Textarea
        label="Description"
        required
        {...register("description")}
      />

      <ImageUploader
        label="Product Images"
        form={form}
      />
    </div>
  );
}
