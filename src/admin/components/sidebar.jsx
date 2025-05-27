import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-primary text-white flex flex-col p-6 shadow-lg">
      {/* Logo / Title */}
      <div className="text-2xl font-bold mb-10">Agroww Admin</div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? "text-secondary font-semibold"
              : "text-white hover:text-secondary"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "text-secondary font-semibold"
              : "text-white hover:text-secondary"
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive
              ? "text-secondary font-semibold"
              : "text-white hover:text-secondary"
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
