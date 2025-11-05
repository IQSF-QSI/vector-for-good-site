import "./App.css";
import "./styles/landing.css";
import "./styles/enterprise.css";
import "./styles/demo.css";
import "./styles/investor.css";
import "./styles/investor-page.css";
import "./styles/corporate-travel.css";
import "./styles/mobile-responsive.css";
import "./styles/card-fixes.css";
import "./styles/blog.css";
import "./styles/privacy.css";
import "./styles/faq.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import EnterpriseLanding from "./components/EnterpriseLanding";
import CommunityLanding from "./components/CommunityLanding";
import EmployeeDemo from "./components/EmployeeDemo";
import InvestorPage from "./components/InvestorPage";
import CorporateTravel from "./components/CorporateTravel";
import BlogListing from "./components/BlogListing";
import BlogPost from "./components/BlogPost";
import PrivacyGDPR from "./components/PrivacyGDPR";
import PrivacyCCPA from "./components/PrivacyCCPA";
import FAQPage from "./components/FAQPage";
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
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy/gdpr" element={<PrivacyGDPR />} />
          <Route path="/privacy/ccpa" element={<PrivacyCCPA />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;