// src/components/SellCar/SellCarForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import ProgressBar from "./ProgressBar";
import StepBasicInfo from "./steps/StepBasicInfo";
import StepCondition from "./steps/StepCondition";
import StepFeatures from "./steps/StepFeatures";
import StepPhotos from "./steps/StepPhotos";
import StepPricing from "./steps/StepPricing";
import StepContact from "./steps/StepContact";
import StepReview from "./steps/StepReview";
import { Loader2, Zap, ChevronLeft, ChevronRight } from "lucide-react";

export interface CarFormData {
  make: string;
  model: string;
  year: number | string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  mileage: number | string;
  condition: string;
  registrationState: string;
  features: string[];
  description: string;
  photos: string[];
  photoFiles: File[];
  price: number | string;
  negotiable: boolean;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerLocation: string;
}

const initialData: CarFormData = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  bodyType: "",
  transmission: "manual",
  fuelType: "petrol",
  mileage: "",
  condition: "",
  registrationState: "",
  features: [],
  description: "",
  photos: [],
  photoFiles: [],
  price: "",
  negotiable: true,
  sellerName: "",
  sellerEmail: "",
  sellerPhone: "",
  sellerLocation: "",
};

const TOTAL_STEPS = 7;

export default function SellCarForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<CarFormData>(() => {
    if (typeof window === "undefined") return initialData;
    try {
      const raw = localStorage.getItem("sellCarForm");
      return raw ? { ...initialData, ...JSON.parse(raw) } : initialData;
    } catch {
      return initialData;
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sellCarForm", JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = (patch: Partial<CarFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
    setErrors({});
  };

  const validateStep = (step = currentStep): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.make) newErrors.make = "Make is required";
      if (!formData.model) newErrors.model = "Model is required";
      if (!formData.year) newErrors.year = "Year is required";
      if (!formData.bodyType) newErrors.bodyType = "Body type is required";
    }

    if (step === 2) {
      if (!formData.condition) newErrors.condition = "Condition is required";
      if (!formData.registrationState && !formData.sellerLocation) {
        newErrors.location = "Location is required";
      }
    }

    if (step === 4) {
      if (!formData.photoFiles || formData.photoFiles.length === 0) {
        newErrors.photos = "Upload at least one photo";
      }
      if ((formData.photoFiles?.length || 0) < 3) {
        newErrors.photos =
          "At least 3 photos recommended for better visibility";
      }
    }

    if (step === 6) {
      if (!formData.sellerName) newErrors.sellerName = "Name is required";
      if (!formData.sellerPhone) newErrors.sellerPhone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onFilesSelected = (files: File[]) => {
    const slice = Array.from(files).slice(0, 12);
    updateFormData({ photoFiles: slice });
  };

  const uploadToSupabase = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        const fileExt = file.name.split(".").pop() ?? "jpg";
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${fileExt}`;

        const { error: uploadError } = await supabaseBrowser.storage
          .from("car_images")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabaseBrowser.storage
          .from("car_images")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrlData.publicUrl);
      } catch (err) {
        console.error("Image upload error:", err);
        throw new Error(`Failed to upload image: ${file.name}`);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setIsUploading(true);
    setErrors({});

    try {
      // Upload images
      const filesToUpload = formData.photoFiles || [];
      if (filesToUpload.length === 0) {
        throw new Error("Please add at least one photo");
      }

      const uploadedImageUrls = await uploadToSupabase(filesToUpload);

      if (uploadedImageUrls.length === 0) {
        throw new Error("Image upload failed");
      }

      setIsUploading(false);

      // Prepare payload for database (adjust field names to match your schema)
      const listingPayload = {
        make: formData.make,
        model: formData.model,
        year: Number(formData.year),
        body_type: formData.bodyType,
        transmission: formData.transmission,
        fuel: formData.fuelType,
        mileage: Number(formData.mileage || 0),
        condition: formData.condition,
        registration_state: formData.registrationState,
        features: formData.features,
        description: formData.description || null,
        images: uploadedImageUrls,
        price: Number(formData.price || 0),
        negotiable: formData.negotiable,
        dealer_name: formData.sellerName,
        dealer_phone: formData.sellerPhone,
        dealer_email: formData.sellerEmail || null,
        location: formData.sellerLocation,
        approved: false,
        featured_paid: false,
      };

      // Insert into database
      const { error: insertError, data } = await supabaseBrowser
        .from("cars")
        .insert(listingPayload)
        .select()
        .single();

      if (insertError) throw insertError;

      // Success - clear localStorage and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("sellCarForm");
      }

      router.push("/?success=sell");
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrors({
        submit: err.message || "Failed to publish listing. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = { formData, updateFormData, errors, onFilesSelected };

    switch (currentStep) {
      case 1:
        return <StepBasicInfo {...stepProps} />;
      case 2:
        return <StepCondition {...stepProps} />;
      case 3:
        return <StepFeatures {...stepProps} />;
      case 4:
        return <StepPhotos {...stepProps} />;
      case 5:
        return <StepPricing {...stepProps} />;
      case 6:
        return <StepContact {...stepProps} />;
      case 7:
        return <StepReview {...stepProps} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    "Basic Info",
    "Condition",
    "Features",
    "Photos",
    "Pricing",
    "Contact",
    "Review",
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden w-full">
      {/* PROGRESS BAR */}
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* STEP HEADER */}
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          {stepTitles[currentStep - 1]}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
      </div>

      {/* FORM CONTENT */}
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 min-h-96">
        {renderCurrentStep()}
      </div>

      {/* ERROR MESSAGE */}
      {errors.submit && (
        <div className="mx-4 sm:mx-6 md:mx-8 mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-sm sm:text-base text-red-700">
          {errors.submit}
        </div>
      )}

      {/* NAVIGATION BUTTONS */}
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-gray-200 bg-gray-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="text-xs sm:text-sm text-gray-600 font-medium text-center">
          Step {currentStep} of {TOTAL_STEPS}
        </div>

        {currentStep === TOTAL_STEPS ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {isSubmitting || isUploading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>{isUploading ? "Uploading..." : "Publishing..."}</span>
              </>
            ) : (
              <>
                <Zap size={20} />
                <span>Publish Listing</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
