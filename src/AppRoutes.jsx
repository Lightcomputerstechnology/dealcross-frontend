// File: src/AppRoutes.jsx

import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SiteLayout from '@/layouts/SiteLayout';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

// Page imports (same as yours)
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';
// ... (other imports unchanged)

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

const AnimatedRouteWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const ProtectedUserRoute = ({ children }) => {
  useAuthRedirect();
  return children;
};

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<SiteLayout />}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<AnimatedRouteWrapper><LandingPage /></AnimatedRouteWrapper>} />
          <Route path="/login" element={<AnimatedRouteWrapper><LoginPage /></AnimatedRouteWrapper>} />
          <Route path="/signup" element={<AnimatedRouteWrapper><SignupPage /></AnimatedRouteWrapper>} />
          <Route path="/verify-email" element={<AnimatedRouteWrapper><VerifyEmailPage /></AnimatedRouteWrapper>} />
          <Route path="/unauthorized" element={<AnimatedRouteWrapper><Unauthorized /></AnimatedRouteWrapper>} />
          <Route path="/about" element={<AnimatedRouteWrapper><AboutPage /></AnimatedRouteWrapper>} />
          <Route path="/contact" element={<AnimatedRouteWrapper><ContactPage /></AnimatedRouteWrapper>} />
          <Route path="/faq" element={<AnimatedRouteWrapper><FAQPage /></AnimatedRouteWrapper>} />
          <Route path="/privacy-policy" element={<AnimatedRouteWrapper><PrivacyPolicyPage /></AnimatedRouteWrapper>} />
          <Route path="/terms" element={<AnimatedRouteWrapper><TermsPage /></AnimatedRouteWrapper>} />
          <Route path="/refund-policy" element={<AnimatedRouteWrapper><RefundPolicy /></AnimatedRouteWrapper>} />
          <Route path="/docs" element={<AnimatedRouteWrapper><DocsPage /></AnimatedRouteWrapper>} />
          <Route path="/watermark" element={<AnimatedRouteWrapper><WatermarkTest /></AnimatedRouteWrapper>} />

          {/* BLOG */}
          <Route path="/blog" element={<AnimatedRouteWrapper><BlogListPage /></AnimatedRouteWrapper>} />
          <Route path="/blog/why-dealcross" element={<AnimatedRouteWrapper><WhyDealcrossBeats /></AnimatedRouteWrapper>} />
          <Route path="/blog/dispute-guide" element={<AnimatedRouteWrapper><DisputeResolutionGuide /></AnimatedRouteWrapper>} />
          <Route path="/blog/fast-payouts" element={<AnimatedRouteWrapper><FastPayoutsExplained /></AnimatedRouteWrapper>} />
          <Route path="/blog/intro" element={<AnimatedRouteWrapper><IntroToDealcross /></AnimatedRouteWrapper>} />

          {/* PROTECTED USER ROUTES */}
          <Route path="/deals" element={<ProtectedUserRoute><AnimatedRouteWrapper><DealsPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/deal/:id" element={<ProtectedUserRoute><AnimatedRouteWrapper><DealDetailsPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/start-deal" element={<ProtectedUserRoute><AnimatedRouteWrapper><StartDealPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/pair-deal" element={<ProtectedUserRoute><AnimatedRouteWrapper><StartDealPairing /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/confirm-deal" element={<ProtectedUserRoute><AnimatedRouteWrapper><DealConfirmation /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/deal-tracker" element={<ProtectedUserRoute><AnimatedRouteWrapper><DealTrackerPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/wallet" element={<ProtectedUserRoute><AnimatedRouteWrapper><WalletPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/fund-wallet" element={<ProtectedUserRoute><AnimatedRouteWrapper><FundWalletPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/transaction-history" element={<ProtectedUserRoute><AnimatedRouteWrapper><TransactionHistory /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/wallet-history" element={<ProtectedUserRoute><AnimatedRouteWrapper><WalletHistoryPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/kyc-status" element={<ProtectedUserRoute><AnimatedRouteWrapper><KYCStatusPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/kyc-upload" element={<ProtectedUserRoute><AnimatedRouteWrapper><KYCUploadPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/share-trading" element={<ProtectedUserRoute><AnimatedRouteWrapper><ShareTrading /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/share-tips" element={<ProtectedUserRoute><AnimatedRouteWrapper><ShareTradingTips /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/trading-chart" element={<ProtectedUserRoute><AnimatedRouteWrapper><TradingChartPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/live-chart" element={<ProtectedUserRoute><AnimatedRouteWrapper><LiveTradingChart /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/profile" element={<ProtectedUserRoute><AnimatedRouteWrapper><UserProfile /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/profile/edit" element={<ProtectedUserRoute><AnimatedRouteWrapper><UserProfileEditPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/account-settings" element={<ProtectedUserRoute><AnimatedRouteWrapper><UserSettingsPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/settings" element={<ProtectedUserRoute><AnimatedRouteWrapper><SettingsPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/upgrade" element={<ProtectedUserRoute><AnimatedRouteWrapper><UpgradePage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/disputes" element={<ProtectedUserRoute><AnimatedRouteWrapper><DisputeResolutionPage /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/referral" element={<ProtectedUserRoute><AnimatedRouteWrapper><ReferralProgram /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/security" element={<ProtectedUserRoute><AnimatedRouteWrapper><SecurityCenter /></AnimatedRouteWrapper></ProtectedUserRoute>} />
          <Route path="/chat/:dealId" element={<ProtectedUserRoute><AnimatedRouteWrapper><ChatSupport /></AnimatedRouteWrapper></ProtectedUserRoute>} />

          {/* PROTECTED ADMIN ROUTES (Apply same AnimatedWrapper pattern if desired) */}
          <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin-wallet" element={<ProtectedAdminRoute><AdminWallet /></ProtectedAdminRoute>} />
          {/* Continue like above for other admin pages... */}

          {/* 404 */}
          <Route path="*" element={<AnimatedRouteWrapper><NotFound /></AnimatedRouteWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}