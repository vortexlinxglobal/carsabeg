// src/components/SellCar/steps/StepBasicInfo.tsx
"use client";

import InputField from "../InputField";
import SelectField from "../SelectField";
import { CarFormData } from "../SellCarForm";

interface StepBasicInfoProps {
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  errors: Record<string, string>;
  onFilesSelected?: (files: File[]) => void;
}

const CAR_MAKES = [
  "Toyota",
  "Honda",
  "Mercedes-Benz",
  "BMW",
  "Lexus",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Audi",
  "Ford",
  "Nissan",
  "Mazda",
  "Mitsubishi",
  "Subaru",
  "Volvo",
  "Land Rover",
  "Range Rover",
  "Porsche",
  "Tesla",
  "Peugeot",
];

const BODY_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Wagon",
  "Minivan",
  "Truck",
  "Pickup",
  "Bus",
  "Van",
];

const TRANSMISSION_TYPES = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automatic" },
  { value: "cvt", label: "CVT" },
];

const FUEL_TYPES = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
  { value: "lpg", label: "LPG" },
];

export default function StepBasicInfo({
  formData,
  updateFormData,
  errors,
}: StepBasicInfoProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => String(currentYear - i));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* YEAR, MAKE, MODEL */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <SelectField
          label="Year"
          value={String(formData.year)}
          onChange={(value) => updateFormData({ year: Number(value) })}
          options={years.map((year) => ({ value: year, label: year }))}
          placeholder="Select year"
          error={errors.year}
          required
        />
        <SelectField
          label="Make"
          value={formData.make}
          onChange={(value) => updateFormData({ make: value })}
          options={CAR_MAKES.map((make) => ({ value: make, label: make }))}
          placeholder="Select make"
          error={errors.make}
          required
        />
        <InputField
          label="Model"
          type="text"
          value={formData.model}
          onChange={(value) => updateFormData({ model: value })}
          placeholder="e.g., Camry, CR-V, E-Class"
          error={errors.model}
          required
        />
      </div>

      {/* BODY TYPE, TRANSMISSION, FUEL */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <SelectField
          label="Body Type"
          value={formData.bodyType}
          onChange={(value) => updateFormData({ bodyType: value })}
          options={BODY_TYPES.map((type) => ({ value: type, label: type }))}
          placeholder="Select body type"
          required
        />
        <SelectField
          label="Transmission"
          value={formData.transmission}
          onChange={(value) => updateFormData({ transmission: value })}
          options={TRANSMISSION_TYPES}
        />
        <SelectField
          label="Fuel Type"
          value={formData.fuelType}
          onChange={(value) => updateFormData({ fuelType: value })}
          options={FUEL_TYPES}
        />
      </div>

      {/* TIP BOX */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs sm:text-sm text-blue-700">
          <strong>💡 Tip:</strong> Accurate car details help buyers find your
          listing. Double-check the make, model, and year.
        </p>
      </div>
    </div>
  );
}
