export default function Input({ label, id, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label htmlFor={id} className="text-sm font-semibold text-stone-700 ml-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className={`w-full px-3 py-2 border rounded-md shadow-sm 
                   bg-stone-50 text-stone-800 transition-all duration-200
                   focus:outline-none focus:ring-2 
                   ${
                     error
                       ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                       : "border-stone-300 focus:ring-amber-500 focus:border-amber-500"
                   }`}
      />

      <p className="min-h-4">
        {error && (
          <span className="text-xs text-red-500 ml-1 italic">{error}</span>
        )}
      </p>
    </div>
  );
}
