export default function ImageUploader({ form, label, error }) {
  const { setValue } = form;

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setValue("images", files, { shouldValidate: true });
  };

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <label
        className={`
          absolute left-3 top-3 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none
          ${error ? "text-red-500" : ""}

          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#73926F]
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
          peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
        `}
      >
        {label}
      </label>

      {/* Upload Box */}
      <div
        className={`
          peer border-2 border-dashed rounded-xl px-3 py-6 mt-1 bg-white
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 mb-2">Drag and drop</p>

          <p className="text-gray-300 text-sm mb-3">or</p>

          <label className="cursor-pointer bg-[#73926F] text-white px-4 py-2 rounded-md hover:bg-[#5e755b] transition">
            Browse
            <input type="file" hidden multiple onChange={handleImage} />
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
