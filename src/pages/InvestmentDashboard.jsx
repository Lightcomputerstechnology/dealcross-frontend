// File: src/pages/InvestmentDashboard.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

const InvestmentDashboard = () => {
  const investments = [
    {
      id: 1,
      name: 'TechCorp',
      shares: 20,
      buyPrice: 120,
      currentPrice: 140,
    },
    {
      id: 2,
      name: 'GreenEnergy',
      shares: 15,
      buyPrice: 90,
      currentPrice: 85,
    },
    {
      id: 3,
      name: 'HealthPlus',
      shares: 10,
      buyPrice: 200,
      currentPrice: 220,
    },
  ];

  const totalInvested = investments.reduce(
    (sum, inv) => sum + inv.shares * inv.buyPrice,
    0
  );

  const totalValue = investments.reduce(
    (sum, inv) => sum + inv.shares * inv.currentPrice,
    0
  );

  const totalProfit = totalValue - totalInvested;

  return (
    <>
      <Helmet>
        <title>Investment Dashboard - Dealcross</title>
        <meta name="description" content="Track your investments and monitor profit/loss performance." />
      </Helmet>

      <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-6">Investment Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-sm text-gray-500">Total Invested</h2>
            <p className="text-xl font-semibold">${totalInvested.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-sm text-gray-500">Current Value</h2>
            <p className="text-xl font-semibold">${totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-sm text-gray-500">Total Profit</h2>
            <p
              className={`text-xl font-semibold ${
                totalProfit >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {totalProfit >= 0 ? '+' : ''}
              ${totalProfit.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">My Shares</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-2 px-4">Company</th>
                <th className="py-2 px-4">Shares</th>
                <th className="py-2 px-4">Buy Price</th>
                <th className="py-2 px-4">Current Price</th>
                <th className="py-2 px-4">Profit</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => {
                const profit = (inv.currentPrice - inv.buyPrice) * inv.shares;
                return (
                  <tr key={inv.id} className="border-b border-gray-700">
                    <td className="py-2 px-4">{inv.name}</td>
                    <td className="py-2 px-4">{inv.shares}</td>
                    <td className="py-2 px-4">${inv.buyPrice.toFixed(2)}</td>
                    <td className="py-2 px-4">${inv.currentPrice.toFixed(2)}</td>
                    <td
                      className={`py-2 px-4 ${
                        profit >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {profit >= 0 ? '+' : ''}
                      ${profit.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InvestmentDashboard;