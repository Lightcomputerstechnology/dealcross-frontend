// File: src/AppRoutes.jsx

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SiteLayout from '@/layouts/SiteLayout';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const ProtectedUserRoute = ({ children }) => {
  useAuthRedirect();
  return children;
};
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

// All page imports (same as before)
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FaqPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import RefundPolicy from '@/pages/RefundPolicy';
import DocsPage from '@/pages/DocsPage';
import WatermarkTest from '@/pages/WatermarkTest';

import BlogListPage from '@/pages/BlogListPage';
import WhyDealcrossBeats from '@/pages/WhyDealcrossBeats';
import DisputeResolutionGuide from '@/pages/DisputeResolutionGuide';
import FastPayoutsExplained from '@/pages/FastPayoutsExplained';
import IntroToDealcross from '@/pages/IntroToDealcross';

import DealsPage from '@/pages/DealsPage';
import DealDetailsPage from '@/pages/DealDetailsPage';
import StartDealPage from '@/pages/StartDealPage';
import StartDealPairing from '@/pages/StartDealPairing';
import DealConfirmation from '@/pages/DealConfirmation';
import DealTrackerPage from '@/pages/DealTrackerPage';
import WalletPage from '@/pages/WalletPage';
import FundWalletPage from '@/pages/FundWalletPage';
import TransactionHistory from '@/pages/TransactionHistory';
import WalletHistoryPage from '@/pages/WalletHistoryPage';

import KYCStatusPage from '@/pages/KYCStatusPage';
import KYCUploadPage from '@/pages/KYCUploadPage';
import ShareTrading from '@/pages/ShareTrading';
import ShareTradingTips from '@/pages/ShareTradingTips';
import TradingChartPage from '@/pages/TradingChartPage';
import LiveTradingChart from '@/pages/LiveTradingChart';

import UserProfile from '@/pages/UserProfile';
import UserProfileEditPage from '@/pages/UserProfileEditPage';
import UserSettingsPage from '@/pages/UserSettingsPage';
import UpgradePage from '@/pages/UpgradePage';
import SettingsPage from '@/pages/Settings';
import DisputeResolutionPage from '@/pages/DisputeResolutionPage';
import ReferralProgram from '@/pages/ReferralProgram';
import SecurityCenter from '@/pages/SecurityCenter';
import ChatSupport from '@/pages/ChatSupport';

import AdminDashboard from '@/pages/AdminDashboard';
import AdminAnalyticsPage from '@/pages/AdminAnalyticsPage';
import AdminWallet from '@/pages/AdminWallet';
import AdminReferralBonuses from '@/pages/AdminReferralBonuses';
import AdminKYCReviews from '@/pages/AdminKYCReviewsPage';
import ReferralLogs from '@/pages/ReferralLogsPage';
import AdminSearch from '@/pages/AdminSearchPage';

import DealAnalytics from '@/pages/DealAnalytics';
import AdminDealLog from '@/pages/AdminDealLog';
import DisputeLogViewer from '@/pages/DisputeLogViewer';
import EscrowDashboard from '@/pages/EscrowDashboard';
import EscrowTracker from '@/pages/EscrowTracker';
import ReportCenter from '@/pages/ReportCenter';
import UserManagement from '@/pages/UserManagement';
import AdminUserEditPage from '@/pages/AdminUserEditPage';
import AdminRoleManagement from '@/pages/AdminRoleManagementPage';
import AdminNotifications from '@/pages/AdminNotificationsPage';
import FraudDetectionLog from '@/pages/FraudDetectionLog';
import FraudAlertsPage from '@/pages/FraudAlertsPage';
import FraudAnalysis from '@/pages/FraudAnalysisPage';
import AuditLogViewer from '@/pages/AuditLogViewer';

import FinancialReports from '@/pages/FinancialReportsPage';
import RealTimeMetrics from '@/pages/RealTimeMetricsPage';
import AdminSettingsCenter from '@/pages/AdminSettingsPage';
import ServerHealth from '@/pages/ServerHealthPage';
import APIUsageStats from '@/pages/APIUsageStatsPage';
import ExchangeRatesViewer from '@/pages/ExchangeRatesViewerPage';
import SystemLogsViewer from '@/pages/SystemLogsViewerPage';
import SubscriptionPlansManager from '@/pages/SubscriptionPlansManagerPage';

import PitchDeckViewer from '@/pages/PitchDeckViewer';
import MobileAppPromo from '@/pages/MobileAppPromo';
import AIInsightCenter from '@/pages/AIInsightCenter';
import DataExportPage from '@/pages/DataExportPage';

import PendingDealList from '@/components/admin/PendingDealList';
import UserControlList from '@/components/admin/UserControlList';

export default function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/watermark" element={<WatermarkTest />} />

          {/* Blog Pages */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/why-dealcross" element={<WhyDealcrossBeats />} />
          <Route path="/blog/dispute-guide" element={<DisputeResolutionGuide />} />
          <Route path="/blog/fast-payouts" element={<FastPayoutsExplained />} />
          <Route path="/blog/intro" element={<IntroToDealcross />} />

          {/* Protected Routes */}
          {/* ... Keep all existing user and admin routes as they are ... */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
