import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Bell,
  CheckCircle,
  FilePlus,
  Megaphone,
  Clock,
  Download,
  Bookmark,
  Calendar,
  UserCheck,
  Check,
  Trash2,
} from 'lucide-react';
import {
  markAsRead,
  markAllAsRead,
} from '../../store/slices/notificationSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';

export default function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  const [activeTab, setActiveTab] = useState('all');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'announcements') return n.type === 'announcement' || n.type === 'exam';
    if (activeTab === 'resources') return n.type === 'new_resource' || n.type === 'resource_approved';
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'resource_approved':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'new_resource':
        return <FilePlus className="w-5 h-5 text-blue-500" />;
      case 'announcement':
        return <Megaphone className="w-5 h-5 text-purple-500" />;
      case 'assignment':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'download':
        return <Download className="w-5 h-5 text-blue-500" />;
      case 'bookmark':
        return <Bookmark className="w-5 h-5 text-purple-500" />;
      case 'exam':
        return <Calendar className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-7 h-7 text-blue-600" />
            <span>Academic Notifications</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Stay updated on new course notes, deadlines, announcements, and resource approvals
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => dispatch(markAllAsRead())}
            icon={Check}
            className="text-xs w-fit"
          >
            Mark all as read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setActiveTab('unread')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'unread'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span>Unread</span>
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'resources'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          Resources
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'announcements'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          Announcements & Exams
        </button>
      </div>

      {/* Notification List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications found"
          description="You are completely caught up with all academic updates."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                dispatch(markAsRead(n.id));
                if (n.link) navigate(n.link);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 group ${
                !n.read
                  ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-sm'
                  : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex-shrink-0">
                {getNotificationIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-gray-400 flex-shrink-0">
                    {new Date(n.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  {n.message}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {!n.read && (
                    <Badge variant="primary" className="text-[10px]">
                      New
                    </Badge>
                  )}
                  {n.link && (
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      View details →
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
