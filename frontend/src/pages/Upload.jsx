import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../store/AnalysisContext';
import { uploadResume, analyzeResume } from '../services/api';
import { useDropzone } from 'react-dropzone';
import { 
  ArrowUpTrayIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { DocumentIcon } from '@heroicons/react/24/solid';

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { dispatch } = useAnalysis();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      dispatch({ type: 'LOADING' });

      // Step 1: Upload & extract
      setProgress(40);
      const extractRes = await uploadResume(formData);
      
      // Step 2: Analyze
      setProgress(80);
      const analysisRes = await analyzeResume(extractRes.text);
      console.log('✅ AI analysis response:', analysisRes);
      console.log('Payload:', analysisRes.analysis);
      if (!analysisRes.analysis) throw new Error('Invalid analysis response');
      // Save to context
      dispatch({ type: 'ANALYSIS_SUCCESS', payload: analysisRes.analysis });

      
      setProgress(100);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      dispatch({ type: 'ERROR', payload: error.response?.data?.error || 'Analysis failed - check console' });
      setError(error.response?.data?.error || error.message || 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-700 dark:text-emerald-300 px-8 py-4 rounded-3xl backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 font-semibold mb-8 animate-pulse">
          <CheckCircleIcon className="w-7 h-7" />
          <span>Step 1 of 2: Upload Resume</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent mb-8 drop-shadow-2xl leading-tight">
          Drop Your
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Resume</span>
        </h1>
        <p className="text-2xl md:text-3xl font-light text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed opacity-90">
          AI will instantly score it, find skill gaps & build your career roadmap
        </p>
      </div>

      <div 
        {...getRootProps()} 
        className={`
          relative group backdrop-blur-xl bg-gradient-to-br from-white/60 to-slate-50/60 dark:from-slate-800/70 dark:to-slate-900/60 border-4 border-dashed rounded-[3rem] p-16 md:p-20 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/25
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-400/10 before:to-purple-400/10 before:rounded-[3rem] before:opacity-0 before:group-hover:opacity-100 before:transition-all before:duration-500 before:blur-xl
          ${isDragActive 
            ? 'border-emerald-400/80 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 shadow-[0_25px_50px_-12px_rgba(16,185,129,0.4)] scale-[1.02] ring-4 ring-emerald-200/50' 
            : uploading 
            ? 'border-slate-300/50 bg-slate-50/50 cursor-not-allowed opacity-75'
            : 'border-glass hover:border-indigo-400/70 cursor-pointer hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)]'
          }
        `}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto animate-spin-slow">
              <ArrowUpTrayIcon className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-slate-700">Analyzing your resume...</p>
              <div className="w-full bg-slate-200 rounded-full h-3 mx-auto max-w-md">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full shadow-lg transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-500">{progress}%</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
              <DocumentIcon className="w-12 h-12 text-slate-500" />
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-bold text-slate-900">
                {isDragActive ? 'Drop your PDF here' : 'Drop your resume here, or click to browse'}
              </p>
              <p className="text-slate-500">PDF files up to 5MB. We'll keep it private and secure.</p>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-900 mb-1">{error}</p>
              <button 
                onClick={() => setError(null)} 
                className="text-sm text-red-700 hover:text-red-900 underline"
              >
                Try another file
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-2">Ready to see your career insights?</h3>

        <p className="text-slate-600">Score, skill gaps, job matches, and learning roadmap in seconds.</p>
      </div>
    </div>
  );
}
