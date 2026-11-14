import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Upload,
  FolderKanban,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  ArrowRight,
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  Plus,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { facultyDashboardStats } from '../../data/mockStats';
import { mockResources } from '../../data/mockResources';
import { formatFileSize, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import FileIcon from '../../components/common/FileIcon';

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Faculty resources
  const myResources = mockResources.filter((r) => r.uploadedBy === 'f1' || r.uploadedByName?.includes('Suresh') || r.uploadedByName?.includes('Ramesh')).slice(0, 5);

  const pieColors = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-800 to-cyan-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Faculty Portal • Active Contributor</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || 'Dr. Suresh Patel'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Associate Professor • Department of {user?.department || 'Computer Applications'} • CARMS Faculty ID: FAC001
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/faculty/upload')}
              icon={Plus}
              className="bg-white text-emerald-900 hover:bg-emerald-50 border-transparent font-bold rounded-xl text-xs sm:text-sm shadow-md"
            >
              Upload New Resource
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/faculty/assignments')}
              icon={FileText}
              className="bg-white/15 hover:bg-white/25 text-white border-transparent font-semibold rounded-xl text-xs sm:text-sm"
            >
              Assignments
            </Button>
          </div>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Uploads"
          value={facultyDashboardStats.totalUploads}
          subtitle="Curated academic materials"
          icon={FolderKanban}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-900/30"
          change={8}
          changeType="up"
        />
        <StatCard
          title="Student Downloads"
          value={facultyDashboardStats.totalDownloads}
          subtitle="Direct student study fetches"
          icon={Download}
          iconColor="text-blue-600"
          iconBg="bg-blue-50 dark:bg-blue-900/30"
          change={15}
          changeType="up"
        />
        <StatCard
          title="Total Views"
          value={facultyDashboardStats.totalViews}
          subtitle="Across enrolled cohorts"
          icon={Eye}
          iconColor="text-purple-600"
          iconBg="bg-purple-50 dark:bg-purple-900/30"
        />
        <StatCard
          title="Pending Review"
          value={facultyDashboardStats.pendingApprovals}
          subtitle="Awaiting admin approval"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50 dark:bg-amber-900/30"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Uploads per month (2 Cols) */}
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-600" />
                <span>Monthly Material Publishing Trends</span>
              </h3>
              <p className="text-xs text-gray-400">Total documents uploaded per month</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Semester 2024-25
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facultyDashboardStats.monthlyUploads}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="uploads" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown (1 Col) */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-blue-600" />
              <span>Resource Types</span>
            </h3>
            <Badge variant="primary" className="text-[10px]">
              Categories
            </Badge>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={facultyDashboardStats.categoryBreakdown}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                >
                  {facultyDashboardStats.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-1 text-xs">
            {facultyDashboardStats.categoryBreakdown.slice(0, 3).map((item, idx) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: pieColors[idx] }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">{item.category}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Uploaded Resources Table */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-emerald-600" />
              <span>Recently Uploaded Resources</span>
            </h3>
            <p className="text-xs text-gray-400">Track student engagement and moderation status</p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/faculty/resources')}
            className="text-xs"
          >
            Manage All ({facultyDashboardStats.totalUploads})
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Semester</th>
                <th className="py-3 px-4 font-semibold">Downloads</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {myResources.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white max-w-xs truncate">
                    <div className="flex items-center gap-2.5">
                      <FileIcon extension={res.fileType} size="sm" />
                      <span className="truncate">{res.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize text-gray-600 dark:text-gray-300">
                    {res.category.replace('-', ' ')}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{res.semester}</td>
                  <td className="py-3 px-4 font-bold text-blue-600">{res.downloads}</td>
                  <td className="py-3 px-4">
                    <Badge variant={res.approvalStatus === 'approved' ? 'success' : 'warning'} className="capitalize text-[10px]">
                      {res.approvalStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => navigate(`/student/library/${res.id}`)}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
