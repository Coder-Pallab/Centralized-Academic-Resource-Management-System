import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  AlertCircle,
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

export default function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
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
      author: { id: 'admin-1', name: 'Academic Office Admin', designation: 'Administration' },
      publishedAt: new Date().toISOString().split('T')[0],
      isPublished: true,
      views: 0,
    };
    setAnnouncements([created, ...announcements]);
    setIsAddOpen(false);
    setForm({ title: '', content: '', type: 'general', priority: 'normal', targetAudience: 'all' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === editItem.id ? { ...a, title: editItem.title, content: editItem.content } : a))
    );
    setEditItem(null);
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
            <Megaphone className="w-7 h-7 text-purple-600" />
            <span>Platform Announcements & Notices</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Broadcast official notices, mid-term examination circulars, holidays, and campus placement bulletins
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddOpen(true)}
          icon={Plus}
          className="text-xs bg-purple-600 hover:bg-purple-700"
        >
          Post Campus Announcement
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
                      High Urgency
                    </Badge>
                  )}
                  <span className="text-xs text-gray-400">
                    Published {formatDate(ann.publishedAt)} • Target: {ann.targetAudience}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white pt-1">
                  {ann.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditItem(ann)}
                  className="p-1.5 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Edit notice"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(ann)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Delete notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {ann.content}
            </p>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
              <span>Author: {ann.author?.name} ({ann.author?.designation})</span>
              <span className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
                <Eye className="w-3.5 h-3.5 text-purple-500" />
                {ann.views} views recorded
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Publish Platform Announcement"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Announcement Headline"
            placeholder="e.g. Mid-Term Examination Dates Announced"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Type / Classification"
              options={[
                { value: 'exam', label: 'Examinations' },
                { value: 'general', label: 'General Circular' },
                { value: 'placement', label: 'Campus Placements' },
                { value: 'holiday', label: 'Holiday & Vacation' },
                { value: 'event', label: 'Campus Event' },
              ]}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />

            <Select
              label="Priority"
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High Priority (Highlighted)' },
              ]}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notice Body
            </label>
            <textarea
              rows={4}
              placeholder="Enter full announcement details for students and faculty..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700">
              Publish Announcement
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={Boolean(editItem)}
        onClose={() => setEditItem(null)}
        title="Edit Announcement"
      >
        {editItem && (
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <Input
              label="Announcement Title"
              value={editItem.title}
              onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notice Content
              </label>
              <textarea
                rows={4}
                value={editItem.content}
                onChange={(e) => setEditItem({ ...editItem, content: e.target.value })}
                className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setEditItem(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Announcement"
        message={`Are you sure you want to permanently remove "${deleteTarget?.title}"?`}
      />
    </div>
  );
}
