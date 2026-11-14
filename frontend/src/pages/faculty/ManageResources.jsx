import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  BarChart2,
  Filter,
} from 'lucide-react';
import { mockResources } from '../../data/mockResources';
import { formatFileSize, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import FileIcon from '../../components/common/FileIcon';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';

export default function ManageResources() {
  const navigate = useNavigate();

  const [resources, setResources] = useState(
    mockResources.filter((r) => r.uploadedBy === 'f1' || r.uploadedByName?.includes('Suresh') || r.uploadedByName?.includes('Ramesh'))
  );

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Edit Modal
  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Delete Confirm Dialog
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Stats Modal
  const [statsItem, setStatsItem] = useState(null);

  const handleOpenEdit = (res) => {
    setEditItem(res);
    setEditTitle(res.title);
    setEditDesc(res.description);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setResources((prev) =>
      prev.map((r) => (r.id === editItem.id ? { ...r, title: editTitle, description: editDesc } : r))
    );
    setEditItem(null);
  };

  const handleConfirmDelete = () => {
    setResources((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const filtered = resources.filter((res) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!res.title.toLowerCase().includes(q) && !res.subject.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (statusFilter !== 'all' && res.approvalStatus !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-emerald-600" />
            <span>Manage Uploaded Resources</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Edit resource metadata, review approval status, and monitor student download metrics
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/faculty/upload')}
          icon={Plus}
          className="text-xs bg-emerald-600 hover:bg-emerald-700"
        >
          Upload New Material
        </Button>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, subject, or filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              All ({resources.length})
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'approved'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </Card>

      {/* Resources Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No resources found"
          description="Try adjusting your search criteria or upload a new resource."
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-400 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Document Title</th>
                  <th className="py-3 px-4 font-semibold">Subject & Course</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Uploaded</th>
                  <th className="py-3 px-4 font-semibold">Downloads</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white max-w-xs truncate">
                      <div className="flex items-center gap-2.5">
                        <FileIcon extension={res.fileType} size="sm" />
                        <div className="truncate">
                          <span className="truncate block">{res.title}</span>
                          <span className="text-[10px] text-gray-400 font-normal">
                            {formatFileSize(res.fileSize)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                      <div>
                        <span className="font-semibold">{res.subject}</span>
                        <span className="text-gray-400 block text-[10px]">
                          {res.course} ({res.semester})
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="primary" className="text-[10px] capitalize">
                        {res.category.replace('-', ' ')}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      {formatDate(res.uploadedAt)}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-blue-600">
                      <button
                        onClick={() => setStatsItem(res)}
                        className="hover:underline flex items-center gap-1"
                        title="View analytics"
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>{res.downloads}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={res.approvalStatus === 'approved' ? 'success' : 'warning'}
                        className="capitalize text-[10px]"
                      >
                        {res.approvalStatus}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/student/library/${res.id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                          title="Preview in Student Library"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(res)}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                          title="Edit Information"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(res)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                          title="Delete Resource"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Edit Resource Modal */}
      <Modal
        isOpen={Boolean(editItem)}
        onClose={() => setEditItem(null)}
        title="Edit Resource Information"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <Input
            label="Resource Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Stats Modal */}
      <Modal
        isOpen={Boolean(statsItem)}
        onClose={() => setStatsItem(null)}
        title="Resource Engagement Analytics"
        size="md"
      >
        {statsItem && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">{statsItem.title}</h4>
              <p className="text-xs text-gray-400">{statsItem.subject} • {statsItem.course}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <Card className="p-3">
                <span className="text-xs text-gray-400">Total Downloads</span>
                <p className="text-xl font-bold text-blue-600 mt-1">{statsItem.downloads}</p>
              </Card>
              <Card className="p-3">
                <span className="text-xs text-gray-400">Total Views</span>
                <p className="text-xl font-bold text-emerald-600 mt-1">{statsItem.views || 890}</p>
              </Card>
              <Card className="p-3">
                <span className="text-xs text-gray-400">Student Rating</span>
                <p className="text-xl font-bold text-amber-500 mt-1">4.8 / 5.0</p>
              </Card>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Student downloads peaked during mid-term preparation week. This document has been saved by over 35 students in their personal bookmarks.
            </p>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Academic Resource"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This file will no longer be accessible by students.`}
        confirmLabel="Yes, Delete"
        variant="danger"
      />
    </div>
  );
}
