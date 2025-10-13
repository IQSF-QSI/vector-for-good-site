import "./App.css";
import "./styles/landing.css";
import "./styles/enterprise.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterpriseLanding from "./components/EnterpriseLanding";
import CommunityLanding from "./components/CommunityLanding";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterpriseLanding />} />
          <Route path="/community" element={<CommunityLanding />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;