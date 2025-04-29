// File: src/components/SEOHead.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({
  title = 'Dealcross - Escrow & Trading Platform',
  description = 'Secure deals, manage your wallet, and trade confidently on Dealcross.',
  keywords = 'escrow, dealcross, trading, fintech, secure payments, wallet, share trading, crypto',
  author = 'Dealcross Team',
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dealcross" />
      <meta property="og:image" content="/logo.png" />
      <meta property="og:url" content="https://dealcross.com" />

      {/* Twitter Meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/logo.png" />
    </Helmet>
  );
};

export default SEOHead;