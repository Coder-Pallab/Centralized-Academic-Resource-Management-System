import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  GraduationCap,
  FolderKanban,
  Download,
  CheckSquare,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Clock,
  ArrowRight,
  Building2,
  Megaphone,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { adminDashboardStats } from '../../data/mockStats';
import { formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Admin Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 text-purple-300" />
              <span>CARMS Institutional Administration</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Administrative Control Center
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
              System monitoring, faculty resource verification, academic hierarchy, and security moderation
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/admin/approvals')}
              icon={CheckSquare}
              className="bg-white text-purple-900 hover:bg-purple-50 border-transparent font-bold rounded-xl text-xs sm:text-sm shadow-md"
            >
              Pending Approvals ({adminDashboardStats.pendingApprovals})
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/admin/users')}
              icon={Users}
              className="bg-white/15 hover:bg-white/25 text-white border-transparent font-semibold rounded-xl text-xs sm:text-sm"
            >
              User Directory
            </Button>
          </div>
        </div>
      </div>

      {/* Pending Approvals Notice Banner */}
      {adminDashboardStats.pendingApprovals > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                {adminDashboardStats.pendingApprovals} Academic Materials Require Verification
              </p>
              <p className="text-amber-700 dark:text-amber-300 mt-0.5">
                Faculty members uploaded new question papers and lecture notes awaiting publication approval.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/admin/approvals')}
            className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex-shrink-0"
          >
            Review Submissions
          </Button>
        </div>
      )}

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Students"
          value={adminDashboardStats.totalStudents.toLocaleString()}
          subtitle="Registered accounts"
          icon={GraduationCap}
          iconColor="text-blue-600"
          iconBg="bg-blue-50 dark:bg-blue-900/30"
          change={6}
          changeType="up"
        />
        <StatCard
          title="Faculty Members"
          value={adminDashboardStats.totalFaculty}
          subtitle="Active instructors"
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-900/30"
        />
        <StatCard
          title="Total Resources"
          value={adminDashboardStats.totalResources}
          subtitle="Curated library files"
          icon={FolderKanban}
          iconColor="text-purple-600"
          iconBg="bg-purple-50 dark:bg-purple-900/30"
          change={14}
          changeType="up"
        />
        <StatCard
          title="Total Downloads"
          value={adminDashboardStats.totalDownloads.toLocaleString()}
          subtitle="Campus wide fetches"
          icon={Download}
          iconColor="text-cyan-600"
          iconBg="bg-cyan-50 dark:bg-cyan-900/30"
          change={21}
          changeType="up"
        />
        <StatCard
          title="Pending Queue"
          value={adminDashboardStats.pendingApprovals}
          subtitle="Requires attention"
          icon={CheckSquare}
          iconColor="text-amber-600"
          iconBg="bg-amber-50 dark:bg-amber-900/30"
        />
      </div>

      {/* Charts Grid: Monthly Downloads & Resources By Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Downloads Growth */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span>Monthly Material Consumption</span>
              </h3>
              <p className="text-xs text-gray-400">Total downloads recorded platform-wide</p>
            </div>
            <Badge variant="purple" className="text-[10px]">
              Platform Analytics
            </Badge>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adminDashboardStats.monthlyDownloads}>
                <defs>
                  <linearGradient id="adminDlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="downloads"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#adminDlGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Resources by Category Bar Chart */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Resources by Category</span>
              </h3>
              <p className="text-xs text-gray-400">Inventory breakdown across document types</p>
            </div>
            <span className="text-xs font-semibold text-gray-400">
              {adminDashboardStats.totalResources} Items
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminDashboardStats.resourcesByCategory} layout="vertical">
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} width={100} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Department Breakdown & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Stats */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>Department Cohorts</span>
            </h3>
            <button
              onClick={() => navigate('/admin/academic')}
              className="text-xs text-purple-600 hover:underline"
            >
              Structure
            </button>
          </div>

          <div className="space-y-3">
            {adminDashboardStats.departmentStats.map((dept) => (
              <div
                key={dept.department}
                className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {dept.department}
                  </h4>
                  <Badge variant="primary" className="text-[10px]">
                    {dept.resources} Files
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>Enrolled Cohort</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {dept.students} Students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity Stream (2 cols) */}
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Platform Audit & Moderation Activity</span>
            </h3>
            <span className="text-xs text-gray-400">Real-time log</span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {adminDashboardStats.recentActivities.map((act) => (
              <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{act.message}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Initiated by: {act.actor}</p>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0">
                  {new Date(act.time).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
