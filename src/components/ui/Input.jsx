export function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input 
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62] ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
