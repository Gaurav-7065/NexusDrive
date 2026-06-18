import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getJobById } from '../api/Jobs';
import { applyToJob, getMyApplication } from '../api/applications';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, ArrowLeft, CheckCircle, ExternalLink, HelpCircle, Loader2, Clock } from 'lucide-react';

const formatDate = (raw) => {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin = location.state?.fromAdmin || user?.role === 'coordinator';

  const [job, setJob] = useState(null);
  const [hasApplied, sethasApplied] = useState(false);

  const [formOpend, setFormOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobandApplicationStatus = async () => {
      try {
        setLoading(true);
        setError('');

        if (isAdmin) {
          const jobData = await getJobById(id);
          setJob(jobData);
        } else {
          const [jobData, myApplications] = await Promise.all([getJobById(id), getMyApplication()]);
          setJob(jobData);

          const rawList = myApplications?.applications;
          const applicationsArray = Array.isArray(rawList) ? rawList : [];

          const alreadyApplied = applicationsArray.some((app) => {
            const targetJobId = app.jobId?._id || app.jobId;
            return targetJobId === id;
          });

          sethasApplied(alreadyApplied);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to finalize application status');
      } finally {
        setLoading(false);
      }
    };
    fetchJobandApplicationStatus();
  }, [id, isAdmin]);

  const handleOpenForm = () => {
    if (job?.externalLink) {
      window.open(job.externalLink, '_blank', 'noopener,noreferrer');
      setFormOpened(true);
    } else {
      setError("External application link missing for this posting.");
    }
  };

  const handleConfirmSubmission = async () => {
    setApplyLoading(true);
    setError('');
    try {
      await applyToJob(id);
      sethasApplied(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to finalize application status");
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center gap-2 px-4 text-center'>
        <Loader2 size={32} className='animate-spin text-violet-600' />
        <span className='text-xs text-slate-400 uppercase font-medium'>Syncing Data...</span>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className='max-w-md mx-auto mt-12 bg-red-50 rounded-2xl border border-dashed border-red-100 flex items-start gap-3 p-4 mx-4'>
        <AlertTriangle size={24} className='text-red-500 shrink-0 mt-0.5' />
        <div>
          <h5 className="text-xs font-bold text-red-700 uppercase tracking-wider">Failed to Load</h5>
          <p className="text-xs font-semibold text-red-600 mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  const formattedDeadline = formatDate(job?.deadline);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 antialiased font-sans">
      
      {/* Back button */}
      <button 
        onClick={() => navigate(isAdmin ? '/admin/jobs' : '/jobs')} 
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-violet-500 transition-colors uppercase tracking-wider mb-6 cursor-pointer"
      >
        <ArrowLeft size={14} /> Return to {isAdmin ? 'Management Board' : 'Openings'}
      </button>

      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-5 md:p-8 ">
        
        {/* HEADER BLOCK (Responsive Layout) */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight break-words">{job?.role}</h2>
            <p className="text-sm font-bold text-slate-400 mt-0.5 truncate">{job?.companyName}</p>
          </div>

          {/* Applied Badge: Highly visible floating badge on desktop, drops cleanly below on mobile */}
          {!isAdmin && hasApplied && (
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold text-[11px] px-3 py-1.5 rounded-full shrink-0 self-start sm:self-auto shadow-sm">
              <CheckCircle size={13} /> Applied
            </span>
          )}
        </div>

        {/* METADATA ROW (CTC + Deadline side-by-side) */}
        <div className="flex flex-wrap items-center gap-2.5 mt-4">
          <span className="text-[10px] font-extrabold tracking-widest text-violet-600 uppercase bg-violet-50 px-2.5 py-1.5 rounded-md shadow-sm">
            {job?.ctc || 'Competitive CTC'}
          </span>
          
          {formattedDeadline && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-amber-700 uppercase bg-amber-50 border border-amber-100 px-2.5 py-1.5 rounded-md shadow-sm">
              <Clock size={11} className="text-amber-500" /> Deadline: {formattedDeadline}
            </span>
          )}
        </div>

        {/* ROLE SPECIFICATIONS */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role Specifications</h4>
          <p className="text-xs font-medium text-slate-600 mt-2 leading-relaxed whitespace-pre-line break-words">
            {job?.description || "No job description supplied for this post configuration."}
          </p>
        </div>

        {/* BOTTOM INTERACTIVE WORKFLOW AREA */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col gap-3">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-semibold break-words">
              ⚠️ {error}
            </div>
          )}

          {/* ADMIN REVIEW CARD */}
          {isAdmin ? (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-center normal-case">
              <span className="text-xs font-bold text-slate-700 block">🛡️ Administrative Review Window</span>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5 leading-normal">
                Eligibility and application gateways are hidden on the coordinator overview panel.
              </p>
            </div>
          ) : hasApplied ? (
            <div className="w-full bg-slate-100 text-slate-500 font-bold text-xs rounded-xl py-3.5 flex items-center justify-center gap-1.5 select-none border border-slate-200">
              <CheckCircle size={15} className="text-emerald-500" /> Applied ✓
            </div>
          ) : job?.eligible === false ? (
            <div className="w-full bg-slate-50 text-slate-400 font-bold text-xs rounded-xl py-3.5 text-center border border-dashed border-slate-200 select-none">
              Profile Ineligible 
            </div>
          ) : !formOpend ? (
            <button
              onClick={handleOpenForm}
              className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl uppercase tracking-wide shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Step 1: Open External Application Form <ExternalLink size={13} />
            </button>
          ) : (
            <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <HelpCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h6 className="text-xs font-bold text-amber-900 uppercase tracking-wide">External Form Opened</h6>
                  <p className="text-[11px] font-medium text-amber-700 mt-0.5 leading-relaxed">
                    Please fill out the form in your other browser tab. If you closed it accidentally, you can safely click the button below to open it again.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <button
                  onClick={handleOpenForm}
                  className="w-full sm:flex-1 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-[11px] rounded-lg uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Re-open Tab
                </button>
                <button
                  onClick={handleConfirmSubmission}
                  disabled={applyLoading}
                  className="w-full sm:flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg uppercase tracking-wider cursor-pointer shadow-sm transition-colors flex items-center justify-center gap-1"
                >
                  {applyLoading ? <Loader2 className="animate-spin" size={12} /> : "Confirm Submitted ✓"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;