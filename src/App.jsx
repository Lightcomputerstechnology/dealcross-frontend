import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider, { AuthContext } from "./context/AuthContext";
import Layout from "./components/Layout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CreateWrestlerPage from "./pages/CreateWrestlerPage";
import MyWrestlersPage from "./pages/MyWrestlersPage";
import StartMatchPage from "./pages/StartMatchPage";
import SubmitResultPage from "./pages/SubmitResultPage";
import ReplayLoggerPage from "./pages/ReplayLoggerPage";
import MyReplaysPage from "./pages/MyReplaysPage";
import LiveMatchPage from "./pages/LiveMatchPage";
import TitleBeltsPage from "./pages/TitleBeltsPage";
import WalletPage from "./pages/WalletPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotificationsPage from "./pages/NotificationsPage";
import ReferralProgramPage from "./pages/ReferralProgramPage";
import SettingsPage from "./pages/SettingsPage";
import BanAppealPage from "./pages/BanAppealPage";
import AdminDashboard from "./pages/AdminDashboard";
import MatchArchivePage from "./pages/MatchArchivePage";
import XPHistoryPage from "./pages/XPHistoryPage";
import XPLevelHistoryPage from "./pages/XPLevelHistoryPage";
import XPInfoPage from "./pages/XPInfoPage";
import AchievementPage from "./pages/AchievementPage";
import RankBadgePage from "./pages/RankBadgePage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import HelpDeskPage from "./pages/HelpDeskPage";
import SupportChatPage from "./pages/SupportChatPage";
import DisputeCenterPage from "./pages/DisputeCenterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin wrapper
import AdminOnly from "./utils/AdminOnly";

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* Protected */}
          <Route path="/dashboard" element={<PrivateRoute><Layout><DashboardPage /></Layout></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Layout><ProfilePage /></Layout></PrivateRoute>} />
          <Route path="/create-wrestler" element={<PrivateRoute><Layout><CreateWrestlerPage /></Layout></PrivateRoute>} />
          <Route path="/my-wrestlers" element={<PrivateRoute><Layout><MyWrestlersPage /></Layout></PrivateRoute>} />
          <Route path="/start-match" element={<PrivateRoute><Layout><StartMatchPage /></Layout></PrivateRoute>} />
          <Route path="/submit-result" element={<PrivateRoute><Layout><SubmitResultPage /></Layout></PrivateRoute>} />
          <Route path="/replay-logger" element={<PrivateRoute><Layout><ReplayLoggerPage /></Layout></PrivateRoute>} />
          <Route path="/my-replays" element={<PrivateRoute><Layout><MyReplaysPage /></Layout></PrivateRoute>} />
          <Route path="/live-match" element={<PrivateRoute><Layout><LiveMatchPage /></Layout></PrivateRoute>} />
          <Route path="/titles" element={<PrivateRoute><Layout><TitleBeltsPage /></Layout></PrivateRoute>} />
          <Route path="/wallet" element={<PrivateRoute><Layout><WalletPage /></Layout></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><Layout><LeaderboardPage /></Layout></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Layout><NotificationsPage /></Layout></PrivateRoute>} />
          <Route path="/referrals" element={<PrivateRoute><Layout><ReferralProgramPage /></Layout></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Layout><SettingsPage /></Layout></PrivateRoute>} />
          <Route path="/ban-appeal" element={<PrivateRoute><Layout><BanAppealPage /></Layout></PrivateRoute>} />
          <Route path="/match-archive" element={<PrivateRoute><Layout><MatchArchivePage /></Layout></PrivateRoute>} />
          <Route path="/xp-history" element={<PrivateRoute><Layout><XPHistoryPage /></Layout></PrivateRoute>} />
          <Route path="/xp-level-history" element={<PrivateRoute><Layout><XPLevelHistoryPage /></Layout></PrivateRoute>} />
          <Route path="/xp-info" element={<PrivateRoute><Layout><XPInfoPage /></Layout></PrivateRoute>} />
          <Route path="/achievements" element={<PrivateRoute><Layout><AchievementPage /></Layout></PrivateRoute>} />
          <Route path="/rank-badges" element={<PrivateRoute><Layout><RankBadgePage /></Layout></PrivateRoute>} />
          <Route path="/faq" element={<PrivateRoute><Layout><FAQPage /></Layout></PrivateRoute>} />
          <Route path="/blog" element={<PrivateRoute><Layout><BlogPage /></Layout></PrivateRoute>} />
          <Route path="/help" element={<PrivateRoute><Layout><HelpDeskPage /></Layout></PrivateRoute>} />
          <Route path="/support" element={<PrivateRoute><Layout><SupportChatPage /></Layout></PrivateRoute>} />
          <Route path="/disputes" element={<PrivateRoute><Layout><DisputeCenterPage /></Layout></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><AdminOnly><Layout><AdminDashboard /></Layout></AdminOnly></PrivateRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;