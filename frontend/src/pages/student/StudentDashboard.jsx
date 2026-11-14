import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  GraduationCap,
  Download,
  Bookmark,
  Eye,
  BookOpen,
  FileText,
  Search,
  Sparkles,
  TrendingUp,
  Clock,
  Megaphone,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  FileCheck,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockResources } from '../../data/mockResources';
import { mockAnnouncements } from '../../data/mockAnnouncements';
import { studentDashboardStats } from '../../data/mockStats';
import { formatFileSize, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import FileIcon from '../../components/common/FileIcon';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const approvedResources = mockResources.filter((r) => r.approvalStatus === 'approved');
  const recentUploads = approvedResources.slice(0, 4);
  const popularResources = [...approvedResources].sort((a, b) => b.downloads - a.downloads).slice(0, 4);
  const announcements = mockAnnouncements.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full min-w-0">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-5 sm:p-8 shadow-xl shadow-blue-500/10">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 sm:w-56 h-48 sm:h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-blue-100">
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Academic Year 2024-25 • Active Term</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Rahul Sharma'}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              {user?.course || 'Bachelor of Computer Applications'} • {user?.semester || '5th Semester'} • Roll No: {user?.rollNumber || 'BCA2022001'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <Button
              variant="secondary"
              onClick={() => navigate('/student/library')}
              icon={Search}
              className="bg-white text-blue-900 hover:bg-blue-50 border-transparent font-semibold rounded-xl text-xs sm:text-sm shadow-sm py-2"
            >
              Browse Library
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/student/bookmarks')}
              icon={Bookmark}
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl text-xs sm:text-sm border-transparent py-2"
            >
              Saved Items ({studentDashboardStats.totalBookmarks})
            </Button>
          </div>
        </div>
      </div>

      {/* Top Academic Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          title="Total Downloads"
          value={studentDashboardStats.totalDownloads}
          subtitle="Study notes & materials"
          icon={Download}
          iconColor="text-blue-600"
          iconBg="bg-blue-50 dark:bg-blue-900/30"
          change={12}
          changeType="up"
        />
        <StatCard
          title="Bookmarked"
          value={studentDashboardStats.totalBookmarks}
          subtitle="Quick access resources"
          icon={Bookmark}
          iconColor="text-purple-600"
          iconBg="bg-purple-50 dark:bg-purple-900/30"
          change={5}
          changeType="up"
        />
        <StatCard
          title="Resources Viewed"
          value={studentDashboardStats.totalViews}
          subtitle="Current semester"
          icon={Eye}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-900/30"
        />
        <StatCard
          title="Current Term PYQs"
          value="24 Available"
          subtitle="Verified answer keys"
          icon={FileCheck}
          iconColor="text-amber-600"
          iconBg="bg-amber-50 dark:bg-amber-900/30"
        />
      </div>

      {/* Main Grid: Left (Resources & Activity) + Right (Announcements & Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 min-w-0">
        {/* Left Column (2 Cols on LG) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
          {/* Recently Uploaded Materials */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Recently Uploaded Resources</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                  Fresh materials curated and verified by college faculty
                </p>
              </div>

              <button
                onClick={() => navigate('/student/library')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 flex-shrink-0"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {recentUploads.map((resource) => (
                <Card
                  key={resource.id}
                  hover
                  onClick={() => navigate(`/student/library/${resource.id}`)}
                  className="flex flex-col justify-between group p-4 sm:p-5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <FileIcon extension={resource.fileType} size="md" />
                      <Badge variant="primary" className="text-[10px] capitalize">
                        {resource.category.replace('-', ' ')}
                      </Badge>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
                    <span className="truncate pr-2">{resource.subject}</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0">
                      {resource.downloads} DLs
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Download Trend Chart */}
          <Card className="p-4 sm:p-6 space-y-4 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>My Monthly Resource Access</span>
                </h3>
                <p className="text-[11px] text-gray-400">
                  Study material downloads per semester month
                </p>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex-shrink-0">
                Semester 5
              </span>
            </div>

            <div className="h-48 sm:h-56 w-full pt-2 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studentDashboardStats.downloadHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="downloadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="downloads"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#downloadGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Most Downloaded / Popular Resources */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <span>Popular Across Your Department</span>
            </h2>

            <div className="space-y-2.5">
              {popularResources.map((res, index) => (
                <div
                  key={res.id}
                  onClick={() => navigate(`/student/library/${res.id}`)}
                  className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-sm cursor-pointer transition-all group gap-2"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="w-4 sm:w-6 text-xs sm:text-sm font-bold text-gray-400 group-hover:text-blue-600 text-center flex-shrink-0">
                      #{index + 1}
                    </span>
                    <FileIcon extension={res.fileType} size="sm" />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {res.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                        {res.subject} • {res.semester}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 text-xs flex-shrink-0">
                    <span className="hidden md:inline-block font-medium text-gray-500">
                      {formatFileSize(res.fileSize)}
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                      {res.downloads} DLs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Notice board, shortcuts, downloads */}
        <div className="space-y-6 sm:space-y-8 min-w-0">
          {/* Latest Campus Announcements */}
          <Card className="p-4 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Notice Board</span>
              </h3>
              <Badge variant="purple" className="text-[10px]">
                Official
              </Badge>
            </div>

            <div className="space-y-2.5">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      {ann.type}
                    </span>
                    <span className="text-gray-400">
                      {formatDate(ann.publishedAt)}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                    {ann.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Shortcuts */}
          <Card className="p-4 sm:p-6 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
              Quick Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => navigate('/student/library?category=question-papers')}
                className="p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium text-left border border-gray-100 dark:border-gray-800 transition-colors truncate"
              >
                📝 PYQs
              </button>
              <button
                onClick={() => navigate('/student/library?category=practical-files')}
                className="p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium text-left border border-gray-100 dark:border-gray-800 transition-colors truncate"
              >
                💻 Lab Files
              </button>
              <button
                onClick={() => navigate('/student/library?category=syllabus')}
                className="p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium text-left border border-gray-100 dark:border-gray-800 transition-colors truncate"
              >
                📋 Syllabus
              </button>
              <button
                onClick={() => navigate('/student/help')}
                className="p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium text-left border border-gray-100 dark:border-gray-800 transition-colors truncate"
              >
                🙋 Request
              </button>
            </div>
          </Card>

          {/* Recent Downloads List */}
          <Card className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Recent Downloads</span>
              </h3>
              <button
                onClick={() => navigate('/student/downloads')}
                className="text-xs text-blue-600 hover:underline"
              >
                History
              </button>
            </div>

            <div className="space-y-2">
              {studentDashboardStats.recentDownloads.map((dl) => (
                <div
                  key={dl.id}
                  onClick={() => navigate(`/student/library/${dl.resourceId}`)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileIcon extension={dl.fileType} size="sm" />
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                      {dl.resourceTitle}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">
                    {formatDate(dl.downloadedAt)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
