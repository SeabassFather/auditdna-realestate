<<<<<<< HEAD
import React from "react";
=======
ï»¿import React from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import MortgageSearchPage from "./pages/MortgageSearchPage";
import TradeFinanceSearchPage from "./pages/TradeFinanceSearchPage";
import AgMarketplaceSearchPage from "./pages/AgMarketplaceSearchPage";
import TickersPage from "./pages/TickersPage";
import AgreementsPage from "./pages/AgreementsPage";
import Dashboard from "./pages/Dashboard";
import CompliancePage from "./pages/CompliancePage";

// Simple NotFound component
function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you requested does not exist.</p>
    </div>
  );
}

function App() {
  // Example: If you want to fetch data and pass it to HomePage, do it here with useState/useEffect.
  // const [homeData, setHomeData] = React.useState(null);
  // React.useEffect(() => {
  //   fetch("/api/home")
  //     .then(res => res.json())
  //     .then(data => setHomeData(data));
  // }, []);

  return (
    <Router>
      <AppHeader />
      <main style={{ minHeight: "calc(100vh - 80px)", background: "#f7f8fa" }}>
        <Routes>
          <Route path="/" element={<HomePage /* data={homeData} */ />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/mortgage" element={<MortgageSearchPage />} />
          <Route path="/trade-finance" element={<TradeFinanceSearchPage />} />
          <Route path="/ag-market" element={<AgMarketplaceSearchPage />} />
          <Route path="/tickers" element={<TickersPage />} />
          <Route path="/agreements" element={<AgreementsPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

