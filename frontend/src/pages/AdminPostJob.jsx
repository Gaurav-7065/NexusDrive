import React, { useState } from 'react';
import Select from 'react-select';
import { API } from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Building, Briefcase, DollarSign, Award, Calendar, Link, ArrowLeft, Loader2 } from 'lucide-react';

function AdminPostJob() {
  const navigate = useNavigate();
  
  const options = [
    { value: 1, label: "1st Year" },
    { value: 2, label: "2nd Year" },
    { value: 3, label: "3rd Year" },
    { value: 4, label: "4th Year" },
  ];

  // Form State Properties matching your schema exactly
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [ctc, setCtc] = useState('');
  const [minCgpa, setMinCgpa] = useState('');
  const [allowedYears, setAllowedYears] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [externalLink, setExternalLink] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        companyName,
        role,
        ctc,
        minCgpa: Number(minCgpa), // Safe number cast
        allowedYears,
        deadline,
        externalLink
      };

      await API.post('/jobs', payload);
      toast.success("Job Posted Successfully!");
      
      // Reset form fields
      setCompanyName('');
      setRole('');
      setCtc('');
      setMinCgpa('');
      setDeadline('');
      setExternalLink('');
      
      // Auto-redirect back to admin portal view
      setTimeout(() => {
        navigate('/admin/jobs');
      }, 1200);

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please check your inputs.");
      toast.error("Failed to publish job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-slate-50 flex flex-col justify-center items-center min-h-screen py-12 px-4 antialiased font-sans'>
      
      {/* Navigation Row Utility */}
      <div className="w-full max-w-xl mb-4 flex justify-start">
        <button 
          onClick={() => navigate('/admin/jobs')} 
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} /> Back to Openings
        </button>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className='p-6 md:p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col bg-white w-full max-w-xl gap-5 text-xs font-bold text-slate-500 uppercase tracking-wide'
      >
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight normal-case">Publish Corporate Track</h2>
          <p className="text-xs font-bold text-slate-400 mt-0.5 tracking-wide">Add a new career milestone opening for eligible branches</p>
        </div>

        {/* Error notification banner inside form container layout wrapper */}
        {error && (
          <div className='bg-red-50 border border-red-100 rounded-xl p-3 normal-case text-red-600 font-semibold flex items-center gap-2 animate-pulse'>
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className='flex flex-col gap-1.5'>
          <label className='text-slate-700 flex items-center gap-1.5'><Building size={13}/> Company Name</label>
          <input 
            required
            type="text"
            value={companyName}
            className='px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium tracking-normal normal-case text-slate-800 focus:outline-none focus:border-violet-500 transition-colors' 
            placeholder='e.g. Microsoft' 
            onChange={(e) => setCompanyName(e.target.value)} 
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-slate-700 flex items-center gap-1.5'><Briefcase size={13}/> Designation Role</label>
          <input 
            required
            type="text"
            value={role}
            className='px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium tracking-normal normal-case text-slate-800 focus:outline-none focus:border-violet-500 transition-colors' 
            placeholder='e.g. Frontend Developer Intern' 
            onChange={(e) => setRole(e.target.value)} 
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-slate-700 flex items-center gap-1.5'><DollarSign size={13}/> Compensation (CTC)</label>
            <input 
              required
              type="text"
              value={ctc}
              className='px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium tracking-normal normal-case text-slate-800 focus:outline-none focus:border-violet-500 transition-colors' 
              placeholder='e.g. 18 LPA' 
              onChange={(e) => setCtc(e.target.value)} 
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-slate-700 flex items-center gap-1.5'><Award size={13}/> Min CGPA Cutoff</label>
            <input 
              required
              type='number' 
              step="0.01"
              value={minCgpa}
              className='px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium tracking-normal normal-case text-slate-800 focus:outline-none focus:border-violet-500 transition-colors' 
              placeholder='e.g. 7.5' 
              onChange={(e) => setMinCgpa(e.target.value)} 
            />
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-slate-700 flex items-center gap-1.5'>Target Eligible Batches</label>
          <Select
            isMulti
            options={options}
            placeholder="Choose graduation timelines..."
            menuPortalTarget={document.body}
            menuPosition="fixed"
            onChange={(selectedOptions) => setAllowedYears(selectedOptions ? selectedOptions.map(opt => opt.value) : [])}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: '#f8fafc',
                borderRadius: '0.75rem',
                borderColor: '#e2e8f0',
                padding: '0.125rem',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'none',
                fontFamily: 'inherit'
              })
            }}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-slate-700 flex items-center gap-1.5'><Calendar size={13}/> Close Registration Deadline</label>
          <input 
            required
            type='date' 
            value={deadline}
            className='px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium tracking-normal text-slate-800 focus:outline-none focus:border-violet-500 transition-colors' 
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-slate-700 flex items-center gap-1.5'><Link size={13}/> External Gateway Form Link</label>
          <input 
            required
            type='url' 
            value={externalLink}
            className='px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium tracking-normal normal-case text-slate-800 focus:outline-none focus:border-violet-500 transition-colors' 
            placeholder='https://careers.microsoft.com/...' 
            onChange={(e) => setExternalLink(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className='mt-3 px-4 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:bg-slate-300'
        >
          {loading ? <Loader2 className="animate-spin" size={14} /> : 'Publish Post Opportunity'}
        </button>

      </form>
    </div>
  );
}

export default AdminPostJob;