import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { adminNavLinks } from "../config/adminNavLinks";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const isChildActive = (children) => {
    return children?.some(child => location.pathname.includes(child.path));
  };

  return (
<div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-16 px-4 py-2 overflow-y-auto">

      <p className="text-gray-500 text-sm font-semibold mb-4 mt-1">Menu</p>

      {adminNavLinks.map((menu, index) => (
        <div key={index} className="mb-2">

          <button
            onClick={() => toggleMenu(menu.label)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition
              ${isChildActive(menu.children) ? "bg-gray-100" : "hover:bg-gray-100"}
            `}
          >
            <div className="flex items-center gap-3">
              <menu.icon size={20} />
              <span className="text-sm font-medium">{menu.label}</span>
            </div>
          </button>

          {openMenu === menu.label && menu.children && (
            <div className="ml-10 mt-2 flex flex-col gap-2">
              {menu.children.map((child, i) => (
               <NavLink
  key={i}
  to={child.path}
  className={({ isActive }) =>
    `p-2 rounded-md text-sm transition 
     ${isActive ? "bg-[#F3F4F6] text-gray-900 font-semibold" : "text-gray-700 hover:bg-[#F3F4F6]"}`
  }
>
  {child.label}
</NavLink>

              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
