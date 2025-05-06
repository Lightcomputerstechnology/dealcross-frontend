// File: src/components/FloatingButtons.jsx

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHeadset, FaCommentDots } from 'react-icons/fa';

const FloatingButtons = () => {
  const [visible, setVisible] = useState(true);

  // Auto-hide after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Toggle to bring buttons back */}
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="mb-2 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition"
          title="Show support buttons"
        >
          <FaHeadset />
        </button>
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            <a
              href="/support"
              className="flex items-center bg-black text-white py-2 px-3 rounded shadow-md text-sm"
            >
              <FaHeadset className="mr-2" />
              Support
            </a>
            <a
              href="/chat"
              className="flex items-center bg-blue-600 text-white py-2 px-3 rounded shadow-md text-sm"
            >
              <FaCommentDots className="mr-2" />
              Deal Chat
            </a>
            <button
              onClick={() => setVisible(false)}
              className="bg-gray-700 text-white p-2 rounded-full ml-auto hover:bg-gray-800 transition"
              title="Hide buttons"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingButtons;