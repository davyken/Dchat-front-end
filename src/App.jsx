import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import ChatPage from "./pages/chatPage/ChatPage";
import ReserPassword from "./pages/resertPass/ReserPassword";
import GeneralSettings from "./pages/settings/Settings";
import AccountSetting from "./pages/settings/account-settings/AccountSetting";
import ProfilePage from "./pages/profile/ProfilePage";
import Status from "./pages/status_page/Status";
import SearchUsers from "./pages/serch_users/SearchUsers";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthProvider />}>
          <Route index element={<LandingPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="chatPage" element={<ChatPage />} />
            <Route path="resertPass" element={<ReserPassword />} />
            <Route path="settings" element={<GeneralSettings />} />
            <Route path="account-settings" element={<AccountSetting />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="status_page" element={<Status />} />
            <Route path="search_users" element={<SearchUsers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
