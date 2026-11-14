import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { mockAnnouncements } from '../../data/mockAnnouncements';
import { formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function FacultyAnnouncements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    type: 'general',
    priority: 'normal',
    targetAudience: 'all',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const created = {
      id: `ann-${Date.now()}`,
      ...form,
      author: { id: 'f1', name: 'Dr. Suresh Patel', designation: 'Associate Professor' },
      publishedAt: new Date().toISOString().split('T')[0],
      isPublished: true,
      views: 0,
    };
    setAnnouncements([created, ...announcements]);
    setIsCreateOpen(false);
    setForm({
      title: '',
      content: '',
      type: 'general',
      priority: 'normal',
      targetAudience: 'all',
    });
  };

  const handleDelete = () => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-emerald-600" />
            <span>Course & Department Announcements</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Broadcast class timetables, syllabus changes, exam reminders, and guest lecture notices
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateOpen(true)}
          icon={Plus}
          className="text-xs bg-emerald-600 hover:bg-emerald-700"
        >
          Publish Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={ann.priority === 'high' ? 'danger' : 'purple'} className="text-[10px] uppercase font-bold">
                    {ann.type}
                  </Badge>
                  {ann.priority === 'high' && (
                    <Badge variant="warning" className="text-[10px]">
                      High Priority
                    </Badge>
                  )}
                  <span className="text-xs text-gray-400">
                    Posted on {formatDate(ann.publishedAt)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white pt-1">
                  {ann.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDeleteTarget(ann)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Delete announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {ann.content}
            </p>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
              <span>Author: {ann.author?.name} ({ann.author?.designation || 'Faculty'})</span>
              <span className="flex items-center gap-1 font-semibold text-gray-600 dark:text-gray-300">
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                {ann.views} student views
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Publish Course Announcement"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Announcement Headline"
            placeholder="e.g. Schedule Change for AI Lab Session"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category / Type"
              options={[
                { value: 'general', label: 'General Announcement' },
                { value: 'exam', label: 'Examination' },
                { value: 'resource', label: 'New Resource Uploaded' },
                { value: 'assignment', label: 'Assignment Notice' },
              ]}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />

            <Select
              label="Urgency / Priority"
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High Priority (Urgent)' },
              ]}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message Content
            </label>
            <textarea
              rows={4}
              placeholder="Write the full announcement message for students..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Publish Notice
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Announcement"
        message={`Are you sure you want to remove the announcement "${deleteTarget?.title}"?`}
      />
    </div>
  );
}
