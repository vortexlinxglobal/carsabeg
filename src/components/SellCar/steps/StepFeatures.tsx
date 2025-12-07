// src/components/SellCar/steps/StepFeatures.tsx
"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { CarFormData } from "../SellCarForm";

interface StepFeaturesProps {
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  errors: Record<string, string>;
  onFilesSelected?: (files: File[]) => void;
}

const COMMON_FEATURES = [
  "Air Conditioning",
  "Leather Seats",
  "Backup Camera",
  "Bluetooth",
  "Power Windows",
  "Power Steering",
  "ABS Brakes",
  "Airbags",
  "Cruise Control",
  "Sunroof",
  "Navigation System",
  "Alloy Wheels",
];

export default function StepFeatures({
  formData,
  updateFormData,
  errors,
}: StepFeaturesProps) {
  const [inputValue, setInputValue] = useState("");

  const addFeature = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const isDuplicate = formData.features.includes(trimmed);
    if (isDuplicate) {
      setInputValue("");
      return;
    }

    updateFormData({
      features: [...formData.features, trimmed],
    });
    setInputValue("");
  };

  const removeFeature = (index: number) => {
    updateFormData({
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const toggleCommonFeature = (feature: string) => {
    if (formData.features.includes(feature)) {
      removeFeature(formData.features.indexOf(feature));
    } else {
      updateFormData({
        features: [...formData.features, feature],
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <p className="text-sm text-gray-600">
        Select or add features to highlight your car.
      </p>

      {/* COMMON FEATURES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {COMMON_FEATURES.map((feature) => (
          <button
            key={feature}
            onClick={() => toggleCommonFeature(feature)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              formData.features.includes(feature)
                ? "bg-green-600 text-white border border-green-600"
                : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-green-500"
            }`}
          >
            {feature}
          </button>
        ))}
      </div>

      {/* CUSTOM FEATURE INPUT */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addFeature();
            }
          }}
          placeholder="Add custom feature..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base rounded-lg border-2 border-gray-300 focus:border-green-500 focus:bg-green-50 outline-none transition-colors"
        />
        <button
          onClick={addFeature}
          className="px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* SELECTED FEATURES LIST */}
      {formData.features.length > 0 && (
        <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">
            Selected Features ({formData.features.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-300 text-xs sm:text-sm text-gray-700"
              >
                {feature}
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700 font-bold ml-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
