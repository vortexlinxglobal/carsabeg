// src/components/SellCar/steps/StepContact.tsx
"use client";

import InputField from "../InputField";
import { CarFormData } from "../SellCarForm";

interface StepContactProps {
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  errors: Record<string, string>;
  onFilesSelected?: (files: File[]) => void;
}

export default function StepContact({
  formData,
  updateFormData,
  errors,
}: StepContactProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <p className="text-sm text-gray-600">
        Buyers will use this info to contact you about your listing.
      </p>

      {/* FULL NAME */}
      <InputField
        label="Your Full Name"
        type="text"
        value={formData.sellerName}
        onChange={(value) => updateFormData({ sellerName: value })}
        placeholder="e.g., John Doe"
        error={errors.sellerName}
        required
      />

      {/* WHATSAPP PHONE */}
      <InputField
        label="WhatsApp Phone Number"
        type="tel"
        value={formData.sellerPhone}
        onChange={(value) => updateFormData({ sellerPhone: value })}
        placeholder="e.g., +234 800 123 4567"
        error={errors.sellerPhone}
        required
        hint="Buyers will message you on this number"
      />

      {/* EMAIL (OPTIONAL) */}
      <InputField
        label="Email Address (Optional)"
        type="email"
        value={formData.sellerEmail}
        onChange={(value) => updateFormData({ sellerEmail: value })}
        placeholder="e.g., john@example.com"
      />

      {/* LOCATION */}
      <InputField
        label="Location / City"
        type="text"
        value={formData.sellerLocation}
        onChange={(value) => updateFormData({ sellerLocation: value })}
        placeholder="e.g., Lagos, Ikoyi"
      />

      {/* INFO BOX */}
      <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs sm:text-sm text-blue-700">
          <strong>🔒 Privacy:</strong> Your contact info is only visible to
          serious buyers. We never share your information.
        </p>
      </div>
    </div>
  );
}
