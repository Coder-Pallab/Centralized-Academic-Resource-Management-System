import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Download,
  Search,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileCheck2,
  Users,
  CheckCircle2,
  Layers,
  FileText,
  Clock,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Button from '../../components/common/Button';

export default function Landing() {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  const features = [
    {
      icon: BookOpen,
      title: 'Centralized Resource Library',
      description: 'One unified repository for syllabus, lecture materials, assignments, practical files, and notes across all departments.',
      badge: 'Core Engine',
    },
    {
      icon: FileCheck2,
      title: 'Verified PYQ Archive',
      description: 'Previous year question papers with verified solutions and answer keys to give students an edge in university exams.',
      badge: 'Exam Prep',
    },
    {
      icon: Search,
      title: 'Deep Search & Filters',
      description: 'Find any document in seconds with faceted filtering by course, department, semester, subject, and resource category.',
      badge: 'Instant Access',
    },
    {
      icon: ShieldCheck,
      title: 'Faculty Verification Pipeline',
      description: 'Academic resources are authored, curated, and approved through a rigorous quality assurance review system.',
      badge: 'Curated Quality',
    },
    {
      icon: Download,
      title: 'Offline Study & Sync',
      description: 'High-speed downloads with organized file metadata, bookmarking for quick recall, and personal study history.',
      badge: 'Productivity',
    },
    {
      icon: Users,
      title: 'Role-Based Collaboration',
      description: 'Dedicated custom workflows designed specifically for Students, Faculty Members, and Academic Administrators.',
      badge: 'Enterprise RBAC',
    },
  ];

  const stats = [
    { value: '15,000+', label: 'Academic Resources' },
    { value: '1,200+', label: 'Active Students' },
    { value: '50+', label: 'Distinguished Faculty' },
    { value: '99.9%', label: 'Platform Availability' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Select Your Department',
      desc: 'Sign up with your academic credentials and select your course, current semester, and department.',
    },
    {
      step: '02',
      title: 'Explore & Search',
      desc: 'Browse lecture notes, previous year question papers, practical files, and presentations tailored to your syllabus.',
    },
    {
      step: '03',
      title: 'Download & Excel',
      desc: 'Read previews in-browser, bookmark essential references, and download high-quality study materials directly.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 w-full">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0" onClick={() => navigate('/')}>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 flex-shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="truncate">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white block leading-tight">
                CARMS
              </span>
              <span className="hidden sm:block text-[10px] sm:text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Academic Portal
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How it Works</a>
            <a href="#stats" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Impact</a>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <button
              onClick={toggle}
              className="p-2 sm:p-2.5 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
            </button>

            <button
              onClick={() => navigate('/login')}
              className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 sm:px-3 py-1.5 transition-colors"
            >
              Sign In
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/register')}
              icon={ArrowRight}
              iconPosition="right"
              className="text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl shadow-md shadow-blue-500/20"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none" />
          <div className="w-[200px] sm:w-[450px] h-[200px] sm:h-[450px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none -translate-x-20" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 animate-fade-in max-w-full truncate">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Next-Gen Academic Resource Management</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Centralized Academic Resources for Modern Higher Education
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Access study notes, previous year question papers, lab files, lecture slides, and syllabus updates in one verified, organized hub.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/register')}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/25"
            >
              Enter Student Portal
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl"
            >
              Faculty & Admin Login
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-xs font-medium text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>100% Verified Faculty Uploads</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Instant PDF Document Previews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Full Semester Coverage (BCA, BBA, BCom, MCA)</span>
            </div>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="mt-12 sm:mt-16 relative max-w-5xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden text-left">
            <div className="h-10 bg-gray-50 dark:bg-gray-800/80 px-3 sm:px-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
              <div className="ml-2 sm:ml-4 px-2.5 py-0.5 rounded bg-white dark:bg-gray-900 text-[10px] sm:text-[11px] text-gray-400 border border-gray-200 dark:border-gray-800 truncate">
                carms.college.edu/student/dashboard
              </div>
            </div>
            <div className="p-4 sm:p-8 bg-gray-50/50 dark:bg-gray-950/40">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">Welcome back, Rahul Sharma</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Bachelor of Computer Applications • 5th Semester • Roll No: BCA2022001</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Active Term 2024-25
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium">Total Downloads</span>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">48 Files</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium">Saved Bookmarks</span>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">12 Resources</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium">Recent Announcements</span>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">3 New</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
              Engineered for Seamless Academic Excellence
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-xs sm:text-base">
              Say goodbye to scattered WhatsApp groups, lost Google Drive links, and outdated photocopies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Simple Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
              How CARMS Accelerates Your Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {steps.map((st, i) => (
              <div key={i} className="relative p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40">
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-600/20 dark:text-blue-400/20 mb-2 sm:mb-3 block">
                  {st.step}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-12 sm:py-16 bg-blue-600 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-2xl sm:text-4xl font-extrabold tracking-tight">{s.value}</p>
                <p className="text-[11px] sm:text-sm font-medium text-blue-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready Callout */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Ready to streamline your academic journey?
          </h2>
          <p className="mt-3 text-xs sm:text-base text-gray-600 dark:text-gray-400">
            Join hundreds of students and faculty members who manage their courses through CARMS.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/register')}
              icon={ArrowRight}
              iconPosition="right"
              className="rounded-xl px-6 sm:px-8 py-3 text-xs sm:text-sm"
            >
              Create Free Student Account
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/login')}
              className="rounded-xl px-6 sm:px-8 py-3 text-xs sm:text-sm"
            >
              Sign In to Existing Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-100 dark:border-gray-900 py-8 sm:py-12 bg-white dark:bg-gray-950 text-xs text-gray-500 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 dark:text-white">CARMS</span>
            <span className="hidden sm:inline">— Centralized Academic Resources Management System</span>
          </div>
          <p>© {new Date().getFullYear()} CARMS Higher Education Management.</p>
        </div>
      </footer>
    </div>
  );
}
