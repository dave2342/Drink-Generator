export function DefaultPage({ setCurrentView }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to AlcoLogic!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Have you ever been at a bar or restaurant and had NO idea what cocktail
        you wanted?
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Or maybe you just want to try a fresh, new drink you've never had
        before?
      </p>

      <p className="text-lg text-gray-700 mb-6">
        Meet AlcoLogic: Discover random cocktails, build and save your own
        creations, and explore unique drink ideas with our AI-powered
        mixologist!
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Get started by picking an alcohol{" "}
        <span
          onClick={() => setCurrentView("alcohols")}
          className="text-blue-600 cursor-pointer hover:underline hover:text-blue-800 transition-colors duration-200"
        >
          here
        </span>
        !
      </p>
    </div>
  );
}
