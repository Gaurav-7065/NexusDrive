import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { getMyApplication } from '../api/applications';

import { Loader2, AlertCircle, Calendar, Briefcase, DollarSign, Building } from 'lucide-react';
function MyApplicationPage() {
  const [applications, setApplications] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMyApplication = async () => {
      setLoading(true);
      setError('');
      try {
        const myapplications = await getMyApplication();
        const rawList = myapplications?.applications;
        const applicationArray = Array.isArray(rawList) ? rawList : [];

        setApplications(applicationArray);
      }
      catch (error) {
        setError(error.response?.data.message || 'didnt  fetched ur application');
      }
      finally {
        setLoading(false);
      }
    }
    fetchAllMyApplication();
  }, [])

  // // Helper utility function to handle dynamic task status badge styling dynamically
  const getStatusBadgeStyle = (status) => {
    const normalized = status?.toLowerCase() || 'applied';

    switch (normalized) {
      case 'shortlisted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'selected':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'applied':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';

    }

  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="animate-spin text-violet-600" size={32} />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Fetching applications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
        <div>
          <h5 className="text-xs font-bold text-red-700 uppercase tracking-wider">Error</h5>
          <p className="text-xs font-semibold text-red-600 mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 antialiased font-sans">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Application Tracking Portal</h2>
        <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide">Monitor your active recruitment cycles</p>
      </div>

      {applications.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50/50">
          <Briefcase className="mx-auto text-slate-300 mb-3" size={28} />
          <button
            onClick={() => navigate('/jobs')}
            className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors uppercase tracking-wide cursor-pointer inline-flex items-center gap-1"
          >
            You haven't applied to any jobs yet. Browse jobs →
          </button>
        </div>
      ) : (
        /* Clean Tailwind-styled HTML Table layout Container Wrapper */
        <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><Building size={12} /> Company</div></th>
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><Briefcase size={12} /> Role</div></th>
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><DollarSign size={12} /> CTC</div></th>
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><Calendar size={12} /> Applied On</div></th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-600">
                {applications.map((app) => {
                  // Fallback handling if a job listing gets deleted by an admin
                  const jobInfo = app.jobId || {};
                  const formattedDate = app.updatedAt
                    ? new Date(app.updatedAt).toISOString().split('T')[0]
                    : 'N/A';

                  return (
                    <tr key={app._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800">{jobInfo.companyName || 'Unknown Employer'}</td>
                      <td className="py-4 px-6 text-slate-600">{jobInfo.role || 'General Role Posting'}</td>
                      <td className="py-4 px-6 font-mono text-[11px] text-slate-500">{jobInfo.ctc || 'N/A'}</td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">{formattedDate}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider border rounded-md ${getStatusBadgeStyle(app.status)}`}>
                          {app.status || 'applied'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApplicationPage;