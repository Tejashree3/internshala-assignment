import { useForm } from "react-hook-form";
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

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      productName: "",
      subtitle: "",
      quantity: "",
      price: "",
      description: "",
      images: [],
    },
  });

  const onSubmit = (data) => {
    if (step < steps.length) {
      next();
      return;
    }
    console.log("FINAL PRODUCT → ", data);
  };

  const StepContent = () => {
    switch (step) {
      case 1: return <GeneralInformation form={form} />;
      case 2: return <Benefits form={form} />;
      case 3: return <Properties form={form} />;
      case 4: return <FAQ form={form} />;
      case 5: return <Overview form={form} />;
      default: return null;
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto p-4">
      
      <Stepper steps={steps} activeStep={step} />
      
      <div className="bg-white p-6 rounded-xl shadow-md border mt-6">
        <StepContent />
      </div>

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="px-6 py-2 border rounded-lg"
          >
            Back
          </button>
        )}

        <button
          type="submit"
          className="px-6 py-2 bg-green-700 text-white rounded-lg"
        >
          {step < steps.length ? "Next" : "Submit"}
        </button>
      </div>
    </form>
  );
}
