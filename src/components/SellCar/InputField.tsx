// src/components/SellCar/InputField.tsx
interface InputFieldProps {
  label?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
  hint?: string;
}

export default function InputField({
  label,
  value = "",
  onChange = () => {},
  placeholder,
  type = "text",
  error,
  required,
  hint,
}: InputFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={String(value || "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-base rounded-lg border-2 transition-colors outline-none ${
          error
            ? "border-red-500 bg-red-50 focus:border-red-600"
            : "border-gray-300 bg-white focus:border-green-500 focus:bg-green-50"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1 text-xs sm:text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}
