// src/components/SellCar/ProgressBar.tsx
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full h-1 sm:h-1.5 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 ease-out"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}
