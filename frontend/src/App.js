import "./App.css";
import "./styles/landing.css";
import LandingPage from "./components/LandingPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;