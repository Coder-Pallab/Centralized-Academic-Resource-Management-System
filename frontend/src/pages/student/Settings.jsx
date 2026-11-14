import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Lock,
  Shield,
  CheckCircle2,
  Sliders,
  Laptop,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';

export default function Settings() {
  const { isDark, toggle, setMode } = useTheme();

  const [notifications, setNotifications] = useState({
    newResources: true,
    assignmentDeadlines: true,
    examSchedules: true,
    browserPush: false,
  });

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const [savedMessage, setSavedMessage] = useState(null);

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    setSavedMessage('Notification preferences updated successfully!');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }
    setSavedMessage('Password changed successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSavedMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-blue-600" />
          <span>Account & Platform Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Customize your display theme, notification alerts, and password security
        </p>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Theme & Display Mode */}
      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Laptop className="w-4 h-4 text-blue-600" />
          <span>Theme & Interface Mode</span>
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Choose how the CARMS portal appears on your current browser
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 max-w-md pt-2">
          <button
            type="button"
            onClick={() => setMode('light')}
            className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
              !isDark
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-700 ring-2 ring-blue-500/20'
                : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm font-bold">Light Mode</p>
              <p className="text-[11px] text-gray-500">Clean white canvas</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMode('dark')}
            className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
              isDark
                ? 'border-blue-600 bg-blue-950/40 text-blue-400 ring-2 ring-blue-500/20'
                : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Moon className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-bold">Dark Mode</p>
              <p className="text-[11px] text-gray-500">High contrast night mode</p>
            </div>
          </button>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Notification Alerts</span>
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Select which academic events trigger email alerts
        </p>

        <form onSubmit={handleSaveNotifications} className="space-y-3 pt-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                New Resource Uploads
              </p>
              <p className="text-[11px] text-gray-400">
                Receive notifications when faculty uploads notes for your enrolled courses
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.newResources}
              onChange={(e) =>
                setNotifications({ ...notifications, newResources: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                Assignment Deadlines
              </p>
              <p className="text-[11px] text-gray-400">
                Get reminder notices 48 hours before assignment submission deadlines
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.assignmentDeadlines}
              onChange={(e) =>
                setNotifications({ ...notifications, assignmentDeadlines: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                Mid-Term & Final Examination Schedules
              </p>
              <p className="text-[11px] text-gray-400">
                Receive immediate announcements regarding exam timetables and room allocations
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.examSchedules}
              onChange={(e) =>
                setNotifications({ ...notifications, examSchedules: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <Button variant="primary" size="sm" type="submit" className="text-xs">
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>

      {/* Security & Password */}
      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>Security & Password</span>
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Update your institutional account password
        </p>

        <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md pt-2">
          <Input
            label="Current Password"
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={passwords.newPass}
            onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            required
          />

          <Button variant="primary" size="sm" type="submit" className="text-xs mt-2">
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
}
