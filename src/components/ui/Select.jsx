export default function Select({ label, required, options = [], ...rest }) {
  return (
    <div className="relative w-full">

      <select
        {...rest}
        defaultValue=""
        className="
          peer w-full rounded-lg px-3 py-3.5
          bg-white cursor-pointer text-sm
          border border-gray-300
          shadow-sm
          transition-all duration-200

          hover:border-gray-400
          focus:outline-none 
          focus:ring-2 focus:ring-[#73926F]/40
          focus:border-[#73926F]
        "
      >
        {/* Blank placeholder */}
        <option value="" disabled hidden></option>

        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Floating Label */}
      <label
        className="
          absolute left-3 top-3.5 bg-white px-1 text-gray-500
          pointer-events-none
          transition-all duration-200 ease-out

          peer-focus:-top-2.5
          peer-focus:left-2.5
          peer-focus:text-xs
          peer-focus:text-[#73926F]

          peer-[&:not([value=''])]:-top-2.5
          peer-[&:not([value=''])]:left-2.5
          peer-[&:not([value=''])]:text-xs
        "
      >
        dfd
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}
