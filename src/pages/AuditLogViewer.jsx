import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getAuditLogs, getCurrentUser } from '@/api';
import { toast } from 'react-hot-toast';
import { FiDownload, FiSearch } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getAuditLogs();
      setLogs(data);
      setFilteredLogs(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load audit logs.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    const logSection = document.querySelector('.audit-log-section');
    if (!logSection) return toast.error('Log section not found');

    html2canvas(logSection).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.text('Dealcross Audit Logs', 14, 15);
      pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight);
      pdf.save('dealcross_audit_logs.pdf');
    });
  };

  const handleExportCSV = () => {
    if (filteredLogs.length === 0) return toast.error('No logs to export');
    const headers = Object.keys(filteredLogs[0] || {}).join(',');
    const rows = filteredLogs.map(log => Object.values(log).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'audit_logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const user = await getCurrentUser();
        if (user.role !== 'admin') {
          setIsAdmin(false);
          toast.error('Access denied.');
        } else {
          setIsAdmin(true);
          fetchLogs();
          const interval = setInterval(fetchLogs, 20000);
          return () => clearInterval(interval);
        }
      } catch {
        setIsAdmin(false);
        toast.error('User verification failed.');
      }
    };
    verifyAdmin();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(
        logs.filter(log =>
          log.action.toLowerCase().includes(search.toLowerCase()) ||
          log.admin_username.toLowerCase().includes(search.toLowerCase()) ||
          log.target.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, logs]);

  if (isAdmin === false) {
    return <div className="p-10 text-red-500 text-center text-lg">Access denied.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Audit Logs - Dealcross Admin</title>
        <meta name="description" content="View system audit logs for administrative actions on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Audit Log Viewer</h2>
          <div className="flex gap-2">
            <button onClick={handleExportCSV} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-1">
              <FiDownload /> CSV
            </button>
            <button onClick={handleExportPDF} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-1">
              <FiDownload /> PDF
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 text-white rounded px-4 py-2 w-full max-w-sm"
          />
        </div>

        {loading ? (
          <p className="text-yellow-400">Loading audit logs...</p>
        ) : filteredLogs.length === 0 ? (
          <p className="text-gray-400 text-sm">No logs found.</p>
        ) : (
          <div className="space-y-4 audit-log-section">
            {filteredLogs.map((log, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{log.admin_username}</span>{' '}
                      performed <span className="text-blue-400">{log.action}</span> on{' '}
                      <span className="text-green-400">{log.target}</span>
                    </p>
                    {log.note && (
                      <p className="text-gray-400 text-xs mt-1">Note: {log.note}</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AuditLogViewer;
