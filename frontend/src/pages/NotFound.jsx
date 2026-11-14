import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GraduationCap, ArrowLeft, Home, BookOpen, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'faculty') return '/faculty/dashboard';
    return '/student/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-6 text-center transition-colors">
      <div className="w-20 h-20 rounded-3xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10">
        <GraduationCap className="w-10 h-10" />
      </div>

      <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
        404 Error
      </span>

      <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mt-2 mb-4 tracking-tight">
        Academic Document or Page Not Found
      </h1>

      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
        The syllabus resource, department link, or dashboard page you requested does not exist or may have been relocated.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate(getDashboardPath())}
          icon={Home}
          className="rounded-xl px-6 font-semibold"
        >
          Return to Dashboard
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/student/library')}
          icon={BookOpen}
          className="rounded-xl px-6 font-semibold"
        >
          Browse Resource Library
        </Button>
      </div>

      <div className="mt-12 text-xs text-gray-400">
        CARMS — Centralized Academic Resources Management System
      </div>
    </div>
  );
}
