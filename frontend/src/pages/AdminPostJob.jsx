import React, { useState } from 'react';
import Select from 'react-select';
import { API } from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Building, Briefcase, Award, Calendar, Link, ArrowLeft, Loader2, IndianRupee } from 'lucide-react';

function AdminPostJob() {
  const navigate = useNavigate();

  const options = [
    { value: 1, label: "1st Year" },
    { value: 2, label: "2nd Year" },
    { value: 3, label: "3rd Year" },
    { value: 4, label: "4th Year" },
  ];

  // Form State Properties
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
        minCgpa: Number(minCgpa),
        allowedYears,
        deadline,
        externalLink
      };

      await API.post('/jobs', payload);
      toast.success("Job Posted Successfully!");

      setCompanyName('');
      setRole('');
      setCtc('');
      setMinCgpa('');
      setDeadline('');
      setExternalLink('');

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
    /* FIXED: Changed bg-slate-50 to bg-base-200 to dynamically follow theme backgrounds */
    <div className='bg-base-200 flex flex-col justify-center items-center min-h-screen py-12 px-4 antialiased font-sans transition-colors duration-200'>

      {/* Navigation Row Utility */}
      <div className="w-full max-w-xl mb-4 flex justify-start">
        {/* FIXED: Dynamic base-content color with fallback opacity */}
        <button
          onClick={() => navigate('/admin/jobs')}
          className="flex items-center gap-1.5 text-xs font-bold text-base-content/50 hover:text-base-content uppercase tracking-wider cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} /> Back to Openings
        </button>
      </div>

      {/* FIXED: Changed template background and text variables to base tokens */}
      <form
        onSubmit={handleSubmit}
        className='p-6 md:p-10 rounded-3xl border border-base-300 shadow-sm flex flex-col bg-base-100 w-full max-w-xl gap-5 text-xs font-bold text-base-content/70 uppercase tracking-wide transition-colors duration-200'
      >
        <div>
          {/* FIXED: Text target altered for theme support */}
          <h2 className="text-xl font-black text-base-content tracking-tight normal-case">Publish Corporate Track</h2>
          <p className="text-xs font-bold text-base-content/40 mt-0.5 tracking-wide">Add a new career milestone opening for eligible branches</p>
        </div>

        {error && (
          <div className='bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl p-3 normal-case text-red-600 dark:text-red-400 font-semibold flex items-center gap-2 animate-pulse'>
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Input Fields Content Sections */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-base-content flex items-center gap-1.5'><Building size={13} /> Company Name</label>
          {/* FIXED: Input bg switched to base-200, colors to text-base-content */}
          <input
            required
            type="text"
            value={companyName}

            className='px-4 py-3 bg-base-200 border border-base-300 rounded-xl font-medium tracking-normal normal-case text-base-content focus:outline-none focus:border-violet-500 transition-colors'
            placeholder='e.g. Microsoft'
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-base-content flex items-center gap-1.5'><Briefcase size={13} /> Designation Role</label>
          <input
            required
            type="text"
            value={role}
            className='px-4 py-3 bg-base-200 border border-base-300 rounded-xl font-medium tracking-normal normal-case text-base-content focus:outline-none focus:border-violet-500 transition-colors'
            placeholder='e.g. Frontend Developer Intern'
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-base-content flex items-center gap-1.5'><IndianRupee size={13} /> Compensation (CTC)</label>
            <input
              required
              type="text"
              value={ctc}
              className='px-4 py-3 bg-base-200 border border-base-300 rounded-xl font-medium tracking-normal normal-case text-base-content focus:outline-none focus:border-violet-500 transition-colors'
              placeholder='e.g. 18 LPA'
              onChange={(e) => setCtc(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-base-content flex items-center gap-1.5'><Award size={13} /> Min CGPA Cutoff</label>
            <input
              required
              type='number'
              step="0.01"
              value={minCgpa}
              className='px-4 py-3 bg-base-200 border border-base-300 rounded-xl font-medium tracking-normal normal-case text-base-content focus:outline-none focus:border-violet-500 transition-colors'
              placeholder='e.g. 7.5'
              onChange={(e) => setMinCgpa(e.target.value)}
            />
          </div>
        </div>

        <div className='flex flex-col gap-1.5 w-full'>
          <label className='text-base-content flex items-center gap-1.5 font-semibold text-sm'>
            Target Eligible Batches
          </label>
          <Select
            isMulti
            options={options}
            placeholder="Choose graduation timelines..."
            onChange={(selectedOptions) => setAllowedYears(selectedOptions ? selectedOptions.map(opt => opt.value) : [])}

            classNames={{
              control: ({ isFocused }) => `
        !bg-base-200 !border-base-300 !rounded-xl !p-0.5 !text-sm
        !normal-case !font-normal
        ${isFocused ? '!border-primary !ring-1 !ring-primary' : 'hover:!border-base-content/30'}
      `,
              menu: () => `
        !bg-base-100 !border !border-base-300 !rounded-xl !shadow-xl !mt-2 !z-50
      `,
              option: ({ isFocused, isSelected }) => `
        !px-4 !py-2.5 !text-sm !cursor-pointer !transition-colors
        !normal-case !font-normal
        ${isSelected
                  ? '!bg-primary !text-primary-content'
                  : isFocused
                    ? '!bg-base-300 !text-base-content'
                    : '!bg-transparent !text-base-content'
                }
      `,
              multiValue: () => `
        !bg-base-300 !rounded-lg !m-0.5
      `,
              multiValueLabel: () => `
        !text-base-content !text-xs !px-2 !py-0.5 !normal-case !font-normal
      `,
              multiValueRemove: () => `
        !text-base-content/60 hover:!bg-error/20 hover:!text-error !px-1.5 !rounded-r-lg !transition-colors
      `,
              placeholder: () => `
        !text-base-content/40 !text-sm !normal-case !font-normal
      `
            }}

            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 })
            }}
          />
        </div>
        <div className='flex flex-col gap-1.5'>
          <label className='text-base-content flex items-center gap-1.5'><Calendar size={13} /> Close Registration Deadline</label>
          <input
            required
            type='date'
            value={deadline}
            className='px-4 py-3 bg-base-200 border border-base-300 rounded-xl font-medium tracking-normal text-base-content focus:outline-none focus:border-violet-500 transition-colors [color-scheme:light] dark:[color-scheme:dark]'
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-base-content flex items-center gap-1.5'><Link size={13} /> External Gateway Form Link</label>
          <input
            required
            type='url'
            value={externalLink}
            className='px-4 py-3 bg-base-200 border border-base-300 rounded-xl font-medium tracking-normal normal-case text-base-content focus:outline-none focus:border-violet-500 transition-colors'
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