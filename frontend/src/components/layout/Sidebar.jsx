import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Bookmark,
  Download,
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  Upload,
  FolderKanban,
  FileText,
  Megaphone,
  Users,
  Building2,
  CheckSquare,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { logout, setRole } from '../../store/slices/authSlice';
import Avatar from '../common/Avatar';

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/library', icon: BookOpen, label: 'Resource Library' },
    { to: '/student/search', icon: Search, label: 'Search' },
    { to: '/student/bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { to: '/student/downloads', icon: Download, label: 'Downloads' },
    { to: '/student/notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { to: '/student/profile', icon: User, label: 'My Profile' },
    { to: '/student/settings', icon: Settings, label: 'Settings' },
    { to: '/student/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const facultyLinks = [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/faculty/upload', icon: Upload, label: 'Upload Resource' },
    { to: '/faculty/resources', icon: FolderKanban, label: 'My Resources' },
    { to: '/faculty/assignments', icon: FileText, label: 'Assignments' },
    { to: '/faculty/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/faculty/profile', icon: User, label: 'Faculty Profile' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/academic', icon: Building2, label: 'Academic Structure' },
    { to: '/admin/approvals', icon: CheckSquare, label: 'Resource Approvals' },
    { to: '/admin/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/admin/reports', icon: AlertTriangle, label: 'Reports & Flagged' },
  ];

  const links =
    user?.role === 'admin'
      ? adminLinks
      : user?.role === 'faculty'
      ? facultyLinks
      : studentLinks;

  const roleBadgeColor = {
    student: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    faculty: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  }[user?.role || 'student'];

  return (
    <aside
      className={`hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-30 fixed top-0 bottom-0 left-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
        <div
          onClick={() => navigate(user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard')}
          className="flex items-center gap-3 cursor-pointer overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
                CARMS
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                Academic Hub
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Pill */}
      {!collapsed && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Portal</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${roleBadgeColor}`}>
              {user?.role || 'Student'}
            </span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                } ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && item.badge > 0 && (
                    <span
                      className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-blue-600'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer Profile & Logout */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <Avatar name={user?.name || 'User'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {user?.name || 'Academic User'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                {user?.department || user?.course || 'Campus'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Avatar name={user?.name || 'User'} size="sm" />
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
