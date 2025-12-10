import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Stepper from "../../stepper/Stepper";
import { useStepper } from "../../../commmon/hook/useStepper";

import GeneralInformation from "./GeneralInformation";
import Benefits from "./Benefits";
import Properties from "./Properties";
import FAQ from "./FAQ";
import Overview from "./Overview";
import { productSchema } from "../../../commmon/Validation/productSchema";

export default function ProductStepper() {
  const steps = ["General Info", "Benefits", "Properties", "FAQ", "Overview"];
  const { step, next, back } = useStepper(steps.length);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: yupResolver(productSchema),
    mode: "onChange", // Real-time validation
    defaultValues: {
      productName: "",
      subtitle: "",
      quantity: "",
      price: "",
      month: "",
      description: "",
      images: [],
      benefits: {
        primary: [""],
        secondary: [{ icon: null, text: "" }],
      },
      properties: {
        dosage: [{ icon: null, text: "" }],
        usage: [{ icon: null, left: "", right: "" }],
        primaryIngredients: [""],
        allIngredients: [""],
        duration: [{ icon: null, text: "" }],
      },
      faq: [{ question: "", answer: "" }],
      additionalProductsTitle: "",
      additionalProducts: [{ image: null, product: "" }],
    },
  });

  /** Step → Field Mapping */
  const stepFields = {
    1: ["productName", "subtitle", "quantity", "month", "price", "description", "images"],
    2: ["benefits"],
    3: ["properties"],
    4: ["faq", "additionalProducts"],
    5: [],
  };

  /** Check if current step is valid */
  const isStepValid = async () => {
    const fieldsToValidate = stepFields[step];
    return await form.trigger(fieldsToValidate);
  };

  /** Handle NEXT + VALIDATION */
  const handleNextStep = async () => {
    const valid = await isStepValid();

    if (!valid) {
      console.log("Step validation failed");
      return;
    }

    next();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** FINAL FORM SUBMIT */
  const onSubmit = async (data) => {
    if (step !== steps.length) {
      handleNextStep();
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("FINAL PRODUCT → ", data);
      // TODO: Add your API call here
      // await submitProduct(data);
      alert("Product Submitted Successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Step Component Handler */
  const StepContent = () => {
    switch (step) {
      case 1:
        return <GeneralInformation form={form} />;
      case 2:
        return <Benefits form={form} />;
      case 3:
        return <Properties form={form} />;
      case 4:
        return <FAQ form={form} />;
      case 5:
        return <Overview form={form.getValues()} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto p-4"
      >
        <Stepper steps={steps} activeStep={step} />

        <div className="bg-white p-6 rounded-xl shadow-md border mt-6">
          <StepContent />
        </div>

        <div className="flex justify-between mt-8 gap-4">
          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => {
              back();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={step === 1}
            className={`px-6 py-2 border rounded-lg font-medium transition ${
              step === 1
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Back
          </button>

          {/* NEXT / SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting || (step < steps.length && !form.formState.isDirty)}
            className={`px-8 py-2 rounded-lg font-medium transition ${
              isSubmitting || (step < steps.length && !form.formState.isDirty)
                ? "opacity-50 cursor-not-allowed bg-gray-400"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : step < steps.length
              ? "Next"
              : "Submit"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}