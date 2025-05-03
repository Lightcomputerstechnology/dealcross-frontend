// File: src/AppRoutes.jsx

import SiteLayout from '@/layouts/SiteLayout';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuthRedirect from '@/hooks/useAuthRedirect';

// Route protection wrappers
const ProtectedUserRoute = ({ children }) => {
  useAuthRedirect();
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  useAuthRedirect({ adminOnly: true });
  return children;
};

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';

import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FaqPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import RefundPolicy from '@/pages/RefundPolicy';
import DocsPage from '@/pages/DocsPage';
import WatermarkTest from '@/pages/WatermarkTest';

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

import BlogListPage from '@/pages/BlogListPage';
import WhyDealcrossBeats from '@/pages/WhyDealcrossBeats';
import DisputeResolutionGuide from '@/pages/DisputeResolutionGuide';
import FastPayoutsExplained from '@/pages/FastPayoutsExplained';
import IntroToDealcross from '@/pages/IntroToDealcross';

import AdminWallet from
'@/pages/AdminWallet';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminAnalyticsPage from '@/pages/AdminAnalyticsPage';
import DealAnalytics from '@/pages/DealAnalytics';
import ReportCenter from '@/pages/ReportCenter';
import EscrowDashboard from '@/pages/EscrowDashboard';
import FraudDetectionLog from '@/pages/FraudDetectionLog';
import UserManagement from '@/pages/UserManagement';
import DisputeLogViewer from '@/pages/DisputeLogViewer';
import PitchDeckViewer from '@/pages/PitchDeckViewer';
import EscrowTracker from '@/pages/EscrowTracker';
import MobileAppPromo from '@/pages/MobileAppPromo';
import AIInsightCenter from '@/pages/AIInsightCenter';
import AdminDealLog from '@/pages/AdminDealLog';
import AdminCharts from '@/pages/AdminCharts';
import AuditLogViewer from '@/pages/AuditLogViewer';
import AdminUserEditPage from '@/pages/AdminUserEditPage';
import FraudAlertsPage from '@/pages/FraudAlertsPage';
import AdminNotifications from '@/pages/AdminNotificationsPage';
import AdminRoleManagement from '@/pages/AdminRoleManagementPage';
import AdminSettingsCenter from '@/pages/AdminSettingsPage';
import FinancialReports from '@/pages/FinancialReportsPage';
import AdminKYCReviews from '@/pages/AdminKYCReviewsPage';
import RealTimeMetrics from '@/pages/RealTimeMetricsPage';
import ReferralLogs from '@/pages/ReferralLogsPage';
import AdminSearch from '@/pages/AdminSearchPage';
import FraudAnalysis from '@/pages/FraudAnalysisPage';
import DataExportPage from '@/pages/DataExportPage';
import ServerHealth from '@/pages/ServerHealthPage';
import APIUsageStats from '@/pages/APIUsageStatsPage';
import SystemLogsViewer from '@/pages/SystemLogsViewerPage';
import ExchangeRatesViewer from '@/pages/ExchangeRatesViewerPage';
import SubscriptionPlansManager from '@/pages/SubscriptionPlansManagerPage';

import PendingDealList from '@/components/admin/PendingDealList';
import UserControlList from '@/components/admin/UserControlList';

import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="docs" element={<DocsPage />} />
        <Route path="watermark" element={<WatermarkTest />} />

        {/* User Routes */}
        <Route path="deals" element={<ProtectedUserRoute><DealsPage /></ProtectedUserRoute>} />
        <Route path="deal/:id" element={<ProtectedUserRoute><DealDetailsPage /></ProtectedUserRoute>} />
        <Route path="start-deal" element={<ProtectedUserRoute><StartDealPage /></ProtectedUserRoute>} />
        <Route path="pair-deal" element={<ProtectedUserRoute><StartDealPairing /></ProtectedUserRoute>} />
        <Route path="confirm-deal" element={<ProtectedUserRoute><DealConfirmation /></ProtectedUserRoute>} />
        <Route path="deal-tracker" element={<ProtectedUserRoute><DealTrackerPage /></ProtectedUserRoute>} />
        <Route path="wallet" element={<ProtectedUserRoute><WalletPage /></ProtectedUserRoute>} />
        <Route path="fund-wallet" element={<ProtectedUserRoute><FundWalletPage /></ProtectedUserRoute>} />
        <Route path="transaction-history" element={<ProtectedUserRoute><TransactionHistory /></ProtectedUserRoute>} />
        <Route path="wallet-history" element={<ProtectedUserRoute><WalletHistoryPage /></ProtectedUserRoute>} />
        <Route path="kyc-status" element={<ProtectedUserRoute><KYCStatusPage /></ProtectedUserRoute>} />
        <Route path="kyc-upload" element={<ProtectedUserRoute><KYCUploadPage /></ProtectedUserRoute>} />

        <Route path="share-trading" element={<ProtectedUserRoute><ShareTrading /></ProtectedUserRoute>} />
        <Route path="share-tips" element={<ProtectedUserRoute><ShareTradingTips /></ProtectedUserRoute>} />
        <Route path="trading-chart" element={<ProtectedUserRoute><TradingChartPage /></ProtectedUserRoute>} />
        <Route path="live-chart" element={<ProtectedUserRoute><LiveTradingChart /></ProtectedUserRoute>} />

        <Route path="profile" element={<ProtectedUserRoute><UserProfile /></ProtectedUserRoute>} />
        <Route path="profile/edit" element={<ProtectedUserRoute><UserProfileEditPage /></ProtectedUserRoute>} />
        <Route path="settings" element={<ProtectedUserRoute><SettingsPage /></ProtectedUserRoute>} />
        <Route path="account-settings" element={<ProtectedUserRoute><UserSettingsPage /></ProtectedUserRoute>} />
        <Route path="upgrade" element={<ProtectedUserRoute><UpgradePage /></ProtectedUserRoute>} />
        <Route path="disputes" element={<ProtectedUserRoute><DisputeResolutionPage /></ProtectedUserRoute>} />
        <Route path="referral" element={<ProtectedUserRoute><ReferralProgram /></ProtectedUserRoute>} />
        <Route path="security" element={<ProtectedUserRoute><SecurityCenter /></ProtectedUserRoute>} />
        <Route path="chat/:dealId" element={<ProtectedUserRoute><ChatSupport /></ProtectedUserRoute>} />

        {/* Blog Routes */}
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/why-dealcross" element={<WhyDealcrossBeats />} />
        <Route path="blog/dispute-guide" element={<DisputeResolutionGuide />} />
        <Route path="blog/fast-payouts" element={<FastPayoutsExplained />} />
        <Route path="blog/intro" element={<IntroToDealcross />} />

        {/* Admin Routes */}
        <Route path="admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="admin-analytics" element={<ProtectedAdminRoute><AdminAnalyticsPage /></ProtectedAdminRoute>} />
        <Route path="deal-analytics" element={<ProtectedAdminRoute><DealAnalytics /></ProtectedAdminRoute>} />
        <Route path="report-center" element={<ProtectedAdminRoute><ReportCenter /></ProtectedAdminRoute>} />
        <Route path="escrow-dashboard" element={<ProtectedAdminRoute><EscrowDashboard /></ProtectedAdminRoute>} />
        <Route path="fraud-log" element={<ProtectedAdminRoute><FraudDetectionLog /></ProtectedAdminRoute>} />
        <Route path="user-management" element={<ProtectedAdminRoute><UserManagement /></ProtectedAdminRoute>} />
        <Route path="dispute-log" element={<ProtectedAdminRoute><DisputeLogViewer /></ProtectedAdminRoute>} />
        <Route path="pitch-deck" element={<ProtectedAdminRoute><PitchDeckViewer /></ProtectedAdminRoute>} />
        <Route path="escrow-tracker" element={<ProtectedAdminRoute><EscrowTracker /></ProtectedAdminRoute>} />
        <Route path="mobile-promo" element={<ProtectedAdminRoute><MobileAppPromo /></ProtectedAdminRoute>} />
        <Route path="ai-insight" element={<ProtectedAdminRoute><AIInsightCenter /></ProtectedAdminRoute>} />
        <Route path="admin-deals" element={<ProtectedAdminRoute><AdminDealLog /></ProtectedAdminRoute>} />
        <Route path="admin-charts" element={<ProtectedAdminRoute><AdminCharts /></ProtectedAdminRoute>} />
        <Route path="audit-log" element={<ProtectedAdminRoute><AuditLogViewer /></ProtectedAdminRoute>} />
        <Route path="pending-deals" element={<ProtectedAdminRoute><PendingDealList /></ProtectedAdminRoute>} />
        <Route path="user-controls" element={<ProtectedAdminRoute><UserControlList /></ProtectedAdminRoute>} />
        <Route path="admin-user/:id" element={<ProtectedAdminRoute><AdminUserEditPage /></ProtectedAdminRoute>} />
        <Route path="fraud-alerts" element={<ProtectedAdminRoute><FraudAlertsPage /></ProtectedAdminRoute>} />
        <Route path="admin-notifications" element={<ProtectedAdminRoute><AdminNotifications /></ProtectedAdminRoute>} />
        <Route path="admin-roles" element={<ProtectedAdminRoute><AdminRoleManagement /></ProtectedAdminRoute>} />
        <Route path="admin-settings" element={<ProtectedAdminRoute><AdminSettingsCenter /></ProtectedAdminRoute>} />
        <Route path="financial-reports" element={<ProtectedAdminRoute><FinancialReports /></ProtectedAdminRoute>} />
        <Route path="admin-kyc-reviews" element={<ProtectedAdminRoute><AdminKYCReviews /></ProtectedAdminRoute>} />
        <Route path="real-time-metrics" element={<ProtectedAdminRoute><RealTimeMetrics /></ProtectedAdminRoute>} />
        <Route path="referral-logs" element={<ProtectedAdminRoute><ReferralLogs /></ProtectedAdminRoute>} />
        <Route path="admin-search" element={<ProtectedAdminRoute><AdminSearch /></ProtectedAdminRoute>} />
        <Route path="fraud-analysis" element={<ProtectedAdminRoute><FraudAnalysis /></ProtectedAdminRoute>} />
        <Route path="data-export" element={<ProtectedAdminRoute><DataExportPage /></ProtectedAdminRoute>} />
        <Route path="server-health" element={<ProtectedAdminRoute><ServerHealth /></ProtectedAdminRoute>} />
        <Route path="api-usage" element={<ProtectedAdminRoute><APIUsageStats /></ProtectedAdminRoute>} />
        <Route path="system-logs" element={<ProtectedAdminRoute><SystemLogsViewer /></ProtectedAdminRoute>} />
        <Route path="exchange-rates" element={<ProtectedAdminRoute><ExchangeRatesViewer /></ProtectedAdminRoute>} />
        <Route path="subscription-plans" element={<ProtectedAdminRoute><SubscriptionPlansManager /></ProtectedAdminRoute>} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
