import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";

export function Menu({
  setCurrentView,
  setSelectedDrink,
  setAlcohol,
  setMenuButton,
  menuButton,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSelect = (value) => {
    setSelectedDrink(null);
    setAlcohol("");
    setCurrentView(value);
    setMenuButton(value);
    setIsOpen(false); // close menu after selecting
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-wrapper flex justify-between items-center">
        {/* Left side: logo */}
        <div className="menu flex items-center gap-4">
          <h2
            onClick={() => {
              setSelectedDrink(null);
              setAlcohol("");
              setCurrentView("default");
              setMenuButton("");
            }}
            className="menu-h2"
          >
            Alco<span style={{ color: "gray" }}>Logic</span>
          </h2>
        </div>

        {/* Right side: icons + hamburger menu */}
        <div
          className="menu-right flex items-center gap-2 relative"
          ref={menuRef}
        >
          <button>👤</button>
          <button>🆕</button>

          {/* Hamburger menu button */}
          {/* Wrap the button and dropdown in a relative div */}
          <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaBars size={24} color="white" />
            </button>

            {isOpen && (
              <div className="absolute left-0 top-full mt-1 bg-[#04384b] rounded shadow-lg z-50 min-w-[120px] flex flex-col overflow-hidden">
                <button
                  className="block px-4 py-2 w-full text-left text-white hover:bg-[#0b6a8c]"
                  onClick={() => handleSelect("creative")}
                >
                  Creative
                </button>
                <button
                  className="block px-4 py-2 w-full text-left text-white hover:bg-[#0b6a8c]"
                  onClick={() => handleSelect("alcohols")}
                >
                  By Alcohol
                </button>
                <button
                  className="block px-4 py-2 w-full text-left text-white hover:bg-[#0b6a8c]"
                  onClick={() => handleSelect("byo")}
                >
                  BYO
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
