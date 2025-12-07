import React from "react";
import amrutamLogo from "../Asset/image.svg"; 
import amrutamText from "../Asset/Amrutam.svg"; 
import userImg from "../Asset/userimg.svg";
const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-3 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between max-w-full">

        {/* LEFT SECTION — Logo */}
        <div className="flex items-center gap-3">
          <img src={amrutamLogo} alt="Logo" className="w-10 h-10 object-contain" />
          <img src={amrutamText} alt="Amrutam" className="h-6 object-contain" />
        </div>

        {/* RIGHT SECTION — User */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-green-700 font-semibold text-sm">Liam Michael</p>
            <p className="text-gray-400 text-xs">Admin</p>
          </div>

          <img
            src={userImg}
            alt="User"
            className="w-10 h-10 rounded-full border object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
