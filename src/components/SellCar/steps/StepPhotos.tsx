// src/components/SellCar/steps/StepPhotos.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Info } from "lucide-react";
import { CarFormData } from "../SellCarForm";

interface StepPhotosProps {
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  errors: Record<string, string>;
  onFilesSelected?: (files: File[]) => void;
}

export default function StepPhotos({
  formData,
  updateFormData,
  errors,
  onFilesSelected,
}: StepPhotosProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files).slice(0, 12);
    updateFormData({ photoFiles: selectedFiles });
    onFilesSelected?.(selectedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files) return;

    const selectedFiles = Array.from(files).slice(0, 12);
    updateFormData({ photoFiles: selectedFiles });
    onFilesSelected?.(selectedFiles);
  };

  const removeImage = (index: number) => {
    updateFormData({
      photoFiles: formData.photoFiles.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Upload size={24} className="text-green-600 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm sm:text-base">Upload Photos</p>
          <p className="text-xs text-gray-500">
            Max 12 photos (first becomes main)
          </p>
        </div>
      </div>

      {/* DRAG & DROP ZONE */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
          isDragging
            ? "border-green-500 bg-green-50"
            : "border-gray-300 bg-gray-50 hover:border-green-400"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="pointer-events-none">
          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="font-semibold text-gray-700 text-sm sm:text-base mb-1">
            Click or drop photos here
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            JPG, PNG up to 10MB each
          </p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {errors.photos && (
        <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex gap-2">
          <Info size={18} className="flex-shrink-0 mt-0.5" />
          <span>{errors.photos}</span>
        </div>
      )}

      {/* PHOTO PREVIEW GRID */}
      {formData.photoFiles && formData.photoFiles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            {formData.photoFiles.length} photo
            {formData.photoFiles.length > 1 ? "s" : ""} uploaded
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
            {formData.photoFiles.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden bg-gray-200 aspect-square"
                >
                  <Image
                    src={previewUrl}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />

                  {/* MAIN BADGE */}
                  {index === 0 && (
                    <div className="absolute top-1 right-1 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                      MAIN
                    </div>
                  )}

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 left-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* INFO BOX */}
      <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs sm:text-sm text-blue-700">
          <strong>📸 Tips:</strong> High-quality, clear photos increase buyer
          interest. Show exterior, interior, engine, mileage display.
        </p>
      </div>
    </div>
  );
}
