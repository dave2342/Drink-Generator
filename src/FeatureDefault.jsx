export function DefaultPage({ setCurrentView }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to AlcoLogic!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Discover random cocktails, build and save your own creations, and
        explore unique drink ideas with our AI-powered mixologist!
      </p>
      <p>
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
