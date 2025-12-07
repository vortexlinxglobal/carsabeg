// src/components/SellCar/steps/StepPricing.tsx
"use client";

import InputField from "../InputField";
import SelectField from "../SelectField";
import { CarFormData } from "../SellCarForm";

interface StepPricingProps {
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  errors: Record<string, string>;
  onFilesSelected?: (files: File[]) => void;
}

export default function StepPricing({
  formData,
  updateFormData,
  errors,
}: StepPricingProps) {
  const formatPrice = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* PRICE INPUT */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price (₦)
        </label>
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold text-lg">
            ₦
          </span>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => updateFormData({ price: e.target.value })}
            placeholder="0"
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-3 text-base sm:text-lg font-bold rounded-lg border-2 transition-colors outline-none ${
              errors.price
                ? "border-red-500 bg-red-50 focus:border-red-600"
                : "border-gray-300 bg-white focus:border-green-500 focus:bg-green-50"
            }`}
          />
        </div>
        {errors.price && (
          <p className="mt-1 text-xs sm:text-sm text-red-600 font-medium">
            {errors.price}
          </p>
        )}
        {formData.price && (
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            ₦{formatPrice(String(formData.price))}
          </p>
        )}
      </div>

      {/* NEGOTIABLE */}
      <SelectField
        label="Price is negotiable?"
        value={String(formData.negotiable)}
        onChange={(value) => updateFormData({ negotiable: value === "true" })}
        options={[
          { value: "true", label: "Yes, price is negotiable" },
          { value: "false", label: "No, fixed price" },
        ]}
      />

      {/* INFO BOX */}
      <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-xs sm:text-sm text-green-700">
          <strong>💰 Tip:</strong> Competitive pricing increases visibility.
          Check similar cars in your area for reference.
        </p>
      </div>
    </div>
  );
}
