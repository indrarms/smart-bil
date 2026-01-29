type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-black">
        {label}
      </label>
      <input
        className={`w-full rounded px-3 py-2 text-sm bg-white text-black placeholder-gray-400 border focus:outline-none focus:ring
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
            }`}
          {...props}
        />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
