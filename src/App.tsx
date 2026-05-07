import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Components
import { SectionUnderConstruction } from "./components/common/SectionUnderConstruction";

// Pages
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { FeaturesPage } from "./pages/Features";
import { TemplatesPage } from "./pages/Templates";
import { HelpPage } from "./pages/Help";
import { SecurityPage } from "./pages/Security";
import { ProtocolPage } from "./pages/Protocol";
import { DocsPage } from "./pages/Docs";

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" theme="dark" closeButton />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/protocol" element={<ProtocolPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<SectionUnderConstruction sectionName="Términos de Servicio" />} />
          <Route path="/faq" element={<SectionUnderConstruction sectionName="FAQ" />} />
          <Route path="/projects" element={<SectionUnderConstruction sectionName="Proyectos" />} />
          <Route path="/sync" element={<SectionUnderConstruction sectionName="Sincronización" />} />
        </Route>

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
