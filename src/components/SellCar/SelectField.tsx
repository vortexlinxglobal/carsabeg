// src/components/SellCar/SelectField.tsx
interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  error?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

export default function SelectField({
  label,
  value = "",
  onChange = () => {},
  options = [],
  error,
  placeholder,
  required,
  hint,
}: SelectFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={String(value || "")}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-base rounded-lg border-2 transition-colors outline-none bg-white ${
          error
            ? "border-red-500 bg-red-50 focus:border-red-600"
            : "border-gray-300 focus:border-green-500 focus:bg-green-50"
        }`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
