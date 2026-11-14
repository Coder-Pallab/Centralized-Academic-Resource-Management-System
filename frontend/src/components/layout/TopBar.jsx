import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  CheckCircle,
  ExternalLink,
  User,
  Settings,
  LogOut,
  Shield,
  Briefcase,
  GraduationCap,
  Sparkles,
  X,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { setRole, logout } from '../../store/slices/authSlice';
import { markAsRead, markAllAsRead } from '../../store/slices/notificationSlice';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

export default function TopBar({ onMenuClick }) {
  const { isDark, toggle } = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setShowRoleMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole));
    setShowRoleMenu(false);
    if (newRole === 'admin') navigate('/admin/dashboard');
    else if (newRole === 'faculty') navigate('/faculty/dashboard');
    else navigate('/student/dashboard');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 max-w-7xl mx-auto">
        {/* Left: Mobile hamburger & Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-xl">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Title brand if space allows */}
          <div className="md:hidden flex items-center gap-1.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-white">
              CARMS
            </span>
          </div>

          {/* Desktop Search form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search study notes, question papers, syllabus, assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </form>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          {/* Mobile Search Toggle Icon */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="sm:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Role Switcher (Desktop & Tablet) */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              title="Switch user role for testing"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Role:</span>
              <span className="capitalize text-blue-600 dark:text-blue-400 font-bold">
                {user?.role || 'student'}
              </span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-1 z-50 text-xs animate-fade-in">
                <div className="px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                  Switch Active Role
                </div>
                <button
                  onClick={() => handleRoleChange('student')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    user?.role === 'student' ? 'text-blue-600 font-bold bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <span>Student Portal</span>
                </button>
                <button
                  onClick={() => handleRoleChange('faculty')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    user?.role === 'faculty' ? 'text-blue-600 font-bold bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                  <span>Faculty Portal</span>
                </button>
                <button
                  onClick={() => handleRoleChange('admin')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    user?.role === 'admin' ? 'text-blue-600 font-bold bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span>Admin Panel</span>
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggle}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 overflow-hidden animate-fade-in">
                <div className="p-3.5 sm:p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Notifications</h3>
                    <p className="text-xs text-gray-400">{unreadCount} unread messages</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => dispatch(markAllAsRead())}
                      className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 scrollbar-thin">
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        dispatch(markAsRead(n.id));
                        if (n.link) navigate(n.link);
                        setShowNotifications(false);
                      }}
                      className={`p-3 sm:p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors ${
                        !n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" style={{ opacity: n.read ? 0 : 1 }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-gray-400 mt-1 block">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 text-center">
                  <button
                    onClick={() => {
                      navigate('/student/notifications');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View all notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Avatar name={user?.name || 'User'} size="sm" />
              <div className="hidden md:block text-left pr-1">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                  {user?.name || 'Rahul Sharma'}
                </p>
                <p className="text-[10px] text-gray-400 capitalize">
                  {user?.role || 'Student'}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 py-1.5 z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {user?.name || 'Academic User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user?.email || 'user@college.edu'}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Badge variant="primary" className="capitalize text-[10px]">
                      {user?.role || 'student'}
                    </Badge>
                    <span className="text-[10px] text-gray-400 truncate">
                      {user?.course || user?.department || 'Campus'}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate(user?.role === 'faculty' ? '/faculty/profile' : '/student/profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/student/settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>Account Settings</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-left transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay Bar */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-3 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search notes, PYQs, subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
