import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import GenerateJD from "./pages/GenerateJD";
import AddCandidate from "./pages/AddCandidate";
import HRScreening from "./pages/HRScreening";
import TechnicalScreening from "./pages/TechnicalScreening";
import AuthForms from "./components/AuthForm";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <Routes>
      {/* Default: redirect to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login page */}
      <Route path="/login" element={<AuthForms />} />


      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="generate-jd" element={<GenerateJD />} />
        <Route path="add-candidate" element={<AddCandidate />} />
        <Route path="hr-screening" element={<HRScreening />} />
        <Route path="technical-screening" element={<TechnicalScreening />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default App;
