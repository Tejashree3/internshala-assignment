import { useState } from "react";

export const useStepper = (totalSteps) => {
  const [step, setStep] = useState(1);

  return {
    step,
    next: () => step < totalSteps && setStep(step + 1),
    back: () => step > 1 && setStep(step - 1),
    goTo: (num) => setStep(num),
  };
};
