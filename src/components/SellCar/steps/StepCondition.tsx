// src/components/SellCar/steps/StepCondition.tsx
"use client";

import InputField from "../InputField";
import SelectField from "../SelectField";
import { CarFormData } from "../SellCarForm";

interface StepConditionProps {
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  errors: Record<string, string>;
  onFilesSelected?: (files: File[]) => void;
}

const CONDITIONS = [
  { value: "foreign-used", label: "Foreign Used (Tokunbo)" },
  { value: "nigerian-used", label: "Nigerian Used" },
  { value: "brand-new", label: "Brand New" },
];

const REGISTRATION_STATES = [
  "Lagos",
  "Abuja",
  "Kano",
  "Katsina",
  "Kaduna",
  "Rivers",
  "Delta",
  "Edo",
  "Osun",
  "Oyo",
  "Other",
];

export default function StepCondition({
  formData,
  updateFormData,
  errors,
}: StepConditionProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* CONDITION & REGISTRATION STATE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <SelectField
          label="Condition"
          value={formData.condition}
          onChange={(value) => updateFormData({ condition: value })}
          options={CONDITIONS}
          placeholder="Select condition"
          error={errors.condition}
          required
        />
        <SelectField
          label="Registration State"
          value={formData.registrationState}
          onChange={(value) => updateFormData({ registrationState: value })}
          options={REGISTRATION_STATES.map((state) => ({
            value: state,
            label: state,
          }))}
          placeholder="Select state"
        />
      </div>

      {/* MILEAGE & LAST SERVICE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <InputField
          label="Mileage (KM)"
          type="number"
          value={String(formData.mileage)}
          onChange={(value) => updateFormData({ mileage: value })}
          placeholder="e.g., 120000"
          hint="Approximate mileage"
        />
        <InputField
          label="Last Service Date (Optional)"
          type="date"
          value=""
          onChange={() => {}}
          placeholder="e.g., 2024-08-01"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Details (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Accident history, upgrades, maintenance records, etc..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base rounded-lg border-2 border-gray-300 focus:border-green-500 focus:bg-green-50 outline-none transition-colors resize-none"
          rows={4}
        />
      </div>

      {/* INFO BOX */}
      <div className="p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs sm:text-sm text-yellow-700">
          <strong>📋 Note:</strong> Detailed information about the car condition
          increases buyer confidence.
        </p>
      </div>
    </div>
  );
}
