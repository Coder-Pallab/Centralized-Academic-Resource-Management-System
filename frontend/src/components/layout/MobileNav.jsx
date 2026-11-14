import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  X,
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
  LogOut,
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import Avatar from '../common/Avatar';

export default function MobileNav({ isOpen, onClose }) {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/login');
  };

  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/library', icon: BookOpen, label: 'Resource Library' },
    { to: '/student/search', icon: Search, label: 'Search Materials' },
    { to: '/student/bookmarks', icon: Bookmark, label: 'My Bookmarks' },
    { to: '/student/downloads', icon: Download, label: 'Download History' },
    { to: '/student/notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { to: '/student/profile', icon: User, label: 'Student Profile' },
    { to: '/student/settings', icon: Settings, label: 'Settings' },
    { to: '/student/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const facultyLinks = [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/faculty/upload', icon: Upload, label: 'Upload Resource' },
    { to: '/faculty/resources', icon: FolderKanban, label: 'Manage Resources' },
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

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-72 max-w-[80vw] bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl z-10 border-r border-gray-200 dark:border-gray-800">
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-gray-900 dark:text-gray-100">CARMS</span>
              <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Academic Portal</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name || 'User'} size="md" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                {user?.name || 'Academic User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role || 'student'} • {user?.department || user?.course || 'Campus'}
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
