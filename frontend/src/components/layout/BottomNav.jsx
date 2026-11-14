import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  BookOpen,
  Bookmark,
  Bell,
  User,
  Upload,
  FolderKanban,
  Users,
  CheckSquare,
} from 'lucide-react';

export default function BottomNav() {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  const studentTabs = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/student/library', icon: BookOpen, label: 'Library' },
    { to: '/student/bookmarks', icon: Bookmark, label: 'Saved' },
    { to: '/student/notifications', icon: Bell, label: 'Alerts', badge: unreadCount },
    { to: '/student/profile', icon: User, label: 'Profile' },
  ];

  const facultyTabs = [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/faculty/upload', icon: Upload, label: 'Upload' },
    { to: '/faculty/resources', icon: FolderKanban, label: 'Materials' },
    { to: '/student/notifications', icon: Bell, label: 'Alerts', badge: unreadCount },
    { to: '/faculty/profile', icon: User, label: 'Profile' },
  ];

  const adminTabs = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/admin/approvals', icon: CheckSquare, label: 'Approvals' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/student/notifications', icon: Bell, label: 'Alerts', badge: unreadCount },
    { to: '/student/profile', icon: User, label: 'Profile' },
  ];

  const tabs =
    user?.role === 'admin'
      ? adminTabs
      : user?.role === 'faculty'
      ? facultyTabs
      : studentTabs;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1 px-2 min-w-[56px] text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                    {tab.badge > 0 && (
                      <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-1 ring-white dark:ring-gray-900">
                        {tab.badge > 9 ? '9+' : tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 truncate">{tab.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
