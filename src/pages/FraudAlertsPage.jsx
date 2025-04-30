// File: src/pages/FraudAlertsPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { FiCheckCircle, FiAlertTriangle, FiDownloadCloud, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import SEOHead from '@/components/SEOHead';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function FraudAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/fraud/alerts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlerts(response.data?.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to load fraud alerts.');
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (alertId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://d-final.onrender.com/fraud/resolve/${alertId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Fraud alert resolved successfully');
      fetchAlerts();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to resolve alert.');
    }
  };

  const exportPDF = () => {
    const container = document.getElementById('fraud-alerts');
    html2canvas(container).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('fraud_alerts.pdf');
    });
  };

  const exportCSV = () => {
    const headers = ['Alert Type', 'Description', 'User ID', 'Status', 'Date'];
    const rows = alerts.map((a) => [
      a.alert_type,
      a.description,
      a.user_id,
      a.status,
      new Date(a.created_at).toLocaleString(),
    ]);
    const csvContent = `data:text/csv;charset=utf-8,${headers.join(',')}
${rows.map((r) => r.join(',')).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'fraud_alerts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SEOHead title="Fraud Alerts - Admin" description="Manage fraud alerts and risks on Dealcross." />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fraud Alerts</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={fetchAlerts}>
            <FiRefreshCw /> Refresh
          </Button>
          <Button variant="secondary" onClick={exportCSV}>
            <FiDownloadCloud /> Export CSV
          </Button>
          <Button variant="secondary" onClick={exportPDF}>
            <FiDownloadCloud /> Export PDF
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No fraud alerts found.</p>
      ) : (
        <div id="fraud-alerts" className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.alert_id || alert.id}
              className="border p-4 rounded-lg bg-white dark:bg-gray-800 shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {(alert.alert_type || 'Unknown').replace('_', ' ').toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alert.description || 'No description provided.'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  User ID: {alert.user_id || 'N/A'} |{' '}
                  {alert.created_at ? new Date(alert.created_at).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge color={alert.status === 'resolved' ? 'green' : 'red'}>
                  {alert.status === 'resolved' ? <FiCheckCircle className="mr-1" /> : <FiAlertTriangle className="mr-1" />}
                  {alert.status}
                </Badge>
                {alert.status !== 'resolved' && (
                  <Button size="sm" onClick={() => handleResolve(alert.alert_id)}>
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}