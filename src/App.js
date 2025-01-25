import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import { LanguageProvider } from "./context/LanguageContext";
import DashboardLayout from "./layouts/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SectionPage from "./pages/SectionPage"; // Add SectionPage for dynamic rendering of sections
import { SectionsProvider } from "./context/SectionsContext";
import DynamicTablePage from "./pages/DynamicTablePage"; // Import DynamicTablePage
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

function App() {
  return (
    <LanguageProvider>
      <I18nextProvider i18n={i18n}>
      <Router>

        <AuthProvider>
          <SectionsProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<HomePage />} />

              {/* Dashboard Layout with Nested Routes */}
              <Route
                path="/dashboard"
                element={
                  <DashboardLayout>
                    <ProfilePage />
                  </DashboardLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <DashboardLayout>
                    <SettingsPage />
                  </DashboardLayout>
                }
              />

              {/* Dynamic Section Routes */}
              <Route
                path="/dashboard/section/:sectionId"
                element={
                  <DashboardLayout>
                    <SectionPage /> {/* SectionPage dynamically renders section content */}
                  </DashboardLayout>
                }
              />

               {/* Dynamic Table Route */}
               <Route
                path="/section/:sectionId/table/:tableId"
                element={
                  <DashboardLayout>
                    <DynamicTablePage />
                  </DashboardLayout>
                }
              />
            </Routes>
          </SectionsProvider>
        </AuthProvider>
      </Router>
      </I18nextProvider>
    </LanguageProvider>
  );
}

export default App;
