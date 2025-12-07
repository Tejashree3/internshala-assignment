export default function Stepper({ steps, activeStep }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const current = index + 1;
        const isActive = current === activeStep;
        const isCompleted = current < activeStep;

        return (
          <div key={index} className="flex flex-col items-center text-center flex-1">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
              ${isCompleted ? "bg-green-600 text-white border-green-600" : ""}
              ${isActive ? "bg-green-700 text-white border-green-700" : ""}
              ${!isActive && !isCompleted ? "border-green-500 text-green-600" : ""}
              `}
            >
              {current}
            </div>
            <p className="mt-2 text-sm text-gray-700">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
