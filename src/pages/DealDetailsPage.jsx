// src/pages/DealDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import DealChatRoom from '@/components/DealChatRoom';

export default function DealDetailsPage() {
  const { dealId } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(`https://d-final.onrender.com/deals/${dealId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeal(res.data);
      } catch (err) {
        console.error('Error fetching deal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [dealId]);

  return (
    <>
      <Helmet>
        <title>Deal #{dealId} - Dealcross</title>
        <meta name="description" content="View escrow deal details and chat with your counterparty securely on Dealcross." />
        <meta name="keywords" content="deal details, escrow, transaction, Dealcross" />
        <meta name="author" content="Dealcross Team" />
      </Helmet>

      <main className="max-w-4xl mx-auto py-10 px-6 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Deal #{dealId}</h1>

        {loading ? (
          <p className="text-yellow-500">Loading deal details...</p>
        ) : deal ? (
          <section className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 mb-8 shadow">
            <h2 className="text-xl font-semibold mb-2">Escrow Deal Details</h2>
            <p className="mb-1"><strong>Item:</strong> {deal.title}</p>
            <p className="mb-1"><strong>Status:</strong> {deal.status}</p>
            <p className="mb-1"><strong>Buyer:</strong> {deal.buyer_email}</p>
            <p className="mb-1"><strong>Seller:</strong> {deal.seller_email}</p>
          </section>
        ) : (
          <p className="text-red-500">Deal not found or failed to load.</p>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-4">Live Chat with Counterparty</h2>
          <DealChatRoom />
        </section>
      </main>
    </>
  );
            }