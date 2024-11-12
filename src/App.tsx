// import Orb from "./components/Orb";
import { Orb } from "./components/OrbSwift";

function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* <Orb />/ */}
      <Orb
        className="w-64"
        config={{
          backgroundColors: ["#22c55e", "#3b82f6", "#ec4899"],
          glowColor: "#c084fc",
          speed: 60,
        }}
      />
    </div>
  );
}

export default App;
