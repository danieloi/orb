import { Orb } from './components/Orb';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Orb 
        className="w-64"
        config={{
          backgroundColors: ['#22c55e', '#3b82f6', '#ec4899'],
          glowColor: '#ffffff',
          speed: 60,
        }}
      />
    </div>
  );
}

export default App;