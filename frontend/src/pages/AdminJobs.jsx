import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../api/Jobs';
import { Loader2, AlertCircle, Plus, Building, Briefcase, DollarSign, Calendar, Eye } from 'lucide-react';

function AdminJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminPortalData = async () => {
      try {
        setLoading(true);
        setError('');
        const responseData = await getAllJobs();
        
        // Handle common backend variations: either a straight array or wrapped as { success: true, jobs: [] }
        const verifiedArray = Array.isArray(responseData) 
          ? responseData 
          : responseData?.jobs || [];
          
        setJobs(verifiedArray);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin listings.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminPortalData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="animate-spin text-violet-600" size={32} />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Syncing Admin Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 antialiased font-sans">
      {/* Top Header Row with explicit CTA Button redirect mapping */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Placement Management Board</h2>
          <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide">Monitor and initialize campus recruitment processes</p>
        </div>
        <button 
          onClick={() => navigate('/admin/post-job')}
          className="py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={14} /> Post New Job
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h5 className="text-xs font-bold text-red-700 uppercase tracking-wider">Dashboard Error</h5>
            <p className="text-xs font-semibold text-red-600 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50/50">
          <Briefcase className="mx-auto text-slate-300 mb-3" size={28} />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">No active postings</p>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5">Click "Post New Job" above to create your first campus track.</p>
        </div>
      ) : (
        /* Day 21 Requirement: Display list matching instructions formatting layout matrix rules */
        <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><Building size={12}/> Company</div></th>
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><Briefcase size={12}/> Role</div></th>
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><DollarSign size={12}/> CTC</div></th>
                  <th className="py-4 px-6"><div className="flex items-center gap-1.5"><Calendar size={12}/> Deadline</div></th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-600">
                {jobs.map((job) => {
                  const rawDate = job.deadline || job.updatedAt;
                  const formattedDeadline = rawDate 
                    ? new Date(rawDate).toISOString().split('T')[0] 
                    : 'N/A';

                  return (
                    <tr key={job._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800">{job.companyName}</td>
                      <td className="py-4 px-6 text-slate-600">{job.role}</td>
                      <td className="py-4 px-6 font-mono text-[11px] text-slate-500">{job.ctc || 'Competitive'}</td>
                      <td className="py-4 px-6 text-red-500 font-mono text-[11px] font-bold">{formattedDeadline}</td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => navigate(`/jobs/${job._id}`,{ state: { fromAdmin: true } })}
                          className="p-1.5 text-slate-400 hover:text-violet-600 border border-slate-100 bg-white hover:bg-violet-50 rounded-lg cursor-pointer inline-flex items-center gap-1 transition-colors font-bold text-[10px] uppercase tracking-wide px-2.5"
                        >
                          <Eye size={12} /> View Details
                        </button>
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

export default AdminJobs;