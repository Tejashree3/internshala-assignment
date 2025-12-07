export default function Input({ label, required, ...rest }) {
  return (
    <div className="relative w-full">
      <input
        {...rest}
        placeholder=" "
        className="
          peer w-full border border-gray-300 rounded-md px-3 py-3
          focus:outline-none focus:ring-2 focus:ring-[#73926F]
          bg-white
        "
      />

      <label
        className="
          absolute left-3 top-3 text-gray-500 
          transition-all duration-200 
          pointer-events-none bg-white px-1
          
          peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-base

          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#73926F]
          peer-not-placeholder-shown:-top-2 
          peer-not-placeholder-shown:text-sm
        "
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}
