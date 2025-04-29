// File: src/components/DealActions.jsx

import React, { useState } from 'react';
import { fundDeal, deliverDeal, releaseDeal, disputeDeal } from '@/api';
import { toast } from 'react-hot-toast';

const DealActions = ({ dealId, status }) => {
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAction = async (actionFn, actionName) => {
    setLoadingAction(actionName);
    try {
      await actionFn(dealId);
      toast.success(`${actionName} successful!`);
    } catch (err) {
      toast.error(err.message || `${actionName} failed.`);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {status === 'pending' && (
        <button
          onClick={() => handleAction(fundDeal, 'Funding')}
          disabled={loadingAction !== null}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white transition disabled:opacity-50"
        >
          {loadingAction === 'Funding' ? 'Funding...' : 'Fund Deal'}
        </button>
      )}
      {status === 'active' && (
        <>
          <button
            onClick={() => handleAction(deliverDeal, 'Delivery')}
            disabled={loadingAction !== null}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded text-white transition disabled:opacity-50"
          >
            {loadingAction === 'Delivery' ? 'Delivering...' : 'Mark as Delivered'}
          </button>
          <button
            onClick={() => handleAction(disputeDeal, 'Dispute')}
            disabled={loadingAction !== null}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white transition disabled:opacity-50"
          >
            {loadingAction === 'Dispute' ? 'Disputing...' : 'Raise Dispute'}
          </button>
        </>
      )}
      {status === 'delivered' && (
        <button
          onClick={() => handleAction(releaseDeal, 'Release')}
          disabled={loadingAction !== null}
          className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white transition disabled:opacity-50"
        >
          {loadingAction === 'Release' ? 'Releasing...' : 'Release Funds'}
        </button>
      )}
    </div>
  );
};

export default DealActions;