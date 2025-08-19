export function Menu({
  setCurrentView,
  setSelectedDrink,
  setAlcohol,
  setMenuButton,
  menuButton,
}) {
  return (
    <>
      <div className="navbar">
        <div className="navbar-wrapper">
          <div className="menu">
            <h2
              onClick={function resetDrink() {
                setSelectedDrink(null);
                setAlcohol("");
                setCurrentView("");
                setMenuButton("");
              }}
            >
              Alco<span style={{ color: "gray" }}>Logic</span>
            </h2>
            <button
              className={`whitespace-nowrap px-3 py-1 text-white text-base transition duration-300 ${
                menuButton === "creative"
                  ? "underline font-semibold"
                  : "hover:underline"
              } text-white px-3 py-1 transition-colors duration-300`}
              onClick={function resetDrink() {
                setSelectedDrink(null);
                setAlcohol("");
                setCurrentView("creative");
                setMenuButton("creative");
              }}
            >
              RanGen
            </button>
            <button
              className={`whitespace-nowrap px-3 py-1 text-white text-base transition duration-300 ${
                menuButton === "alcohols"
                  ? "underline font-semibold"
                  : "hover:underline"
              } text-white px-3 py-1 transition-colors duration-300`}
              onClick={function chosenFeature() {
                setCurrentView("random");
                setMenuButton("alcohols");
              }}
            >
              By Alcohol
            </button>

            {/* <button className="menu-Button" onClick={() => setCurrentView("byo")}> */}
            <button
              className={`whitespace-nowrap px-3 py-1 text-white text-base transition duration-300 ${
                menuButton === "byo"
                  ? "underline font-semibold"
                  : "hover:underline"
              } text-white px-3 py-1 transition-colors duration-300`}
              onClick={function resetDrink() {
                setSelectedDrink(null);
                setAlcohol("");
                setCurrentView("byo");
                setMenuButton("byo");
              }}
            >
              BYO
            </button>
          </div>
          <div className="menu-right">
            <button>👤</button>
            <button>🆕</button>
          </div>
        </div>
      </div>
    </>
  );
}
