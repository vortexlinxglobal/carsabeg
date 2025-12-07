// src/components/SellCar/steps/StepReview.tsx
"use client";

import { CarFormData } from "../SellCarForm";
import { Check } from "lucide-react";

interface StepReviewProps {
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  errors: Record<string, string>;
  onFilesSelected?: (files: File[]) => void;
}

export default function StepReview({ formData }: StepReviewProps) {
  const formatPrice = (value: string | number) => {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* TITLE */}
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
          Review Your Listing
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Make sure everything is correct before publishing
        </p>
      </div>

      {/* MAIN VEHICLE INFO CARD */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-lg border border-green-200">
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
          {formData.year} {formData.make} {formData.model}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Body Type</p>
            <p className="font-semibold text-gray-900">{formData.bodyType}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Transmission</p>
            <p className="font-semibold text-gray-900 capitalize">
              {formData.transmission}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Fuel Type</p>
            <p className="font-semibold text-gray-900 capitalize">
              {formData.fuelType}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Condition</p>
            <p className="font-semibold text-gray-900">{formData.condition}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Mileage</p>
            <p className="font-semibold text-gray-900">
              {formData.mileage ? formatPrice(formData.mileage) : "N/A"} KM
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Location</p>
            <p className="font-semibold text-gray-900">
              {formData.sellerLocation || formData.registrationState}
            </p>
          </div>
        </div>
      </div>

      {/* PRICE CARD */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 sm:p-6 rounded-lg border border-yellow-200">
        <p className="text-gray-600 text-xs sm:text-sm mb-1">Asking Price</p>
        <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          ₦{formatPrice(formData.price)}
        </p>
        <p className="text-xs sm:text-sm text-gray-700">
          {formData.negotiable ? "✓ Price is negotiable" : "✓ Fixed price"}
        </p>
      </div>

      {/* PHOTOS PREVIEW */}
      {formData.photoFiles && formData.photoFiles.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Photos ({formData.photoFiles.length})
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
            {formData.photoFiles.map((file, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden bg-gray-200 aspect-square"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Review ${index}`}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-1 right-1 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                    MAIN
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURES */}
      {formData.features.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Features</p>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                <Check size={16} />
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* DESCRIPTION */}
      {formData.description && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            Description
          </p>
          <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap">
            {formData.description}
          </p>
        </div>
      )}

      {/* SELLER INFO */}
      <div className="p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-3">
          Contact Information
        </p>
        <div className="space-y-2 text-xs sm:text-sm text-blue-800">
          <p>
            <strong>Name:</strong> {formData.sellerName}
          </p>
          <p>
            <strong>Phone:</strong> {formData.sellerPhone}
          </p>
          {formData.sellerEmail && (
            <p>
              <strong>Email:</strong> {formData.sellerEmail}
            </p>
          )}
        </div>
      </div>

      {/* FINAL CONFIRMATION */}
      <div className="p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs sm:text-sm text-green-800 flex items-start gap-2">
          <Check size={18} className="flex-shrink-0 mt-0.5" />
          <span>
            By clicking &quot;Publish Listing&quot;, you agree that all
            information is accurate and complete. Your listing will be reviewed
            before going live.
          </span>
        </p>
      </div>
    </div>
  );
}
