import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center max-w-[1000px] mx-auto">
        <h1 className="text-2xl font-bond">Alcol</h1>
      </div>
    </nav>
  );
};
