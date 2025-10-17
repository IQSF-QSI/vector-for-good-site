import "./App.css";
import "./styles/landing.css";
import "./styles/enterprise.css";
import "./styles/demo.css";
import "./styles/investor.css";
import "./styles/investor-page.css";
import "./styles/corporate-travel.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterpriseLanding from "./components/EnterpriseLanding";
import CommunityLanding from "./components/CommunityLanding";
import EmployeeDemo from "./components/EmployeeDemo";
import InvestorPage from "./components/InvestorPage";
import CorporateTravel from "./components/CorporateTravel";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterpriseLanding />} />
          <Route path="/community" element={<CommunityLanding />} />
          <Route path="/demo" element={<EmployeeDemo />} />
          <Route path="/investors" element={<InvestorPage />} />
          <Route path="/corporate-travel/*" element={<CorporateTravel />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;