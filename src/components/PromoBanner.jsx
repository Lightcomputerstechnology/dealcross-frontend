// File: src/components/PromoBanner.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-4 py-2 text-sm font-medium flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-2">
        <Megaphone className="w-4 h-4" />
        <span>
          New! Enjoy <strong>0% escrow fees</strong> this week —{' '}
          <Link to="/upgrade" className="underline hover:text-yellow-700 dark:hover:text-yellow-300">
            Upgrade now
          </Link>
        </span>
      </div>

      {/* Optional Close (expandable in future) */}
      {/* <button className="ml-4 text-xs hover:underline">Dismiss</button> */}
    </div>
  );
};

export default SiteLayout;
