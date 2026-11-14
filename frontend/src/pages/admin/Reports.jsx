import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Clock,
  ShieldAlert,
  FileText,
  User,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';

export default function Reports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([
    {
      id: 'rep-1',
      resourceId: 'r13',
      resourceTitle: 'BBA 3rd Semester Exam Preparation Guide',
      reportedBy: 'Kavya Nair (Student)',
      reportedAt: '2024-11-05T09:00:00',
      reason: 'Contains outdated 2018 syllabus units that do not match the current 2024 university curriculum.',
      status: 'pending',
    },
    {
      id: 'rep-2',
      resourceId: 'r18',
      resourceTitle: 'Information Security - Unit 1 to 4 Notes',
      reportedBy: 'Prof. Anjali Singh (Faculty)',
      reportedAt: '2024-11-04T14:30:00',
      reason: 'Page 14 to 18 scans are blurry and mathematical formulas are unreadable.',
      status: 'pending',
    },
    {
      id: 'rep-3',
      resourceId: 'r7',
      resourceTitle: 'Financial Management Study Notes - MBA',
      reportedBy: 'Arjun Verma (Student)',
      reportedAt: '2024-10-28T11:00:00',
      reason: 'Duplicate upload of Unit 2 file already uploaded last semester.',
      status: 'dismissed',
    },
  ]);

  const [actionNotice, setActionNotice] = useState(null);
  const [takeDownTarget, setTakeDownTarget] = useState(null);

  const handleDismiss = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'dismissed' } : r))
    );
    setActionNotice('Report dismissed. Resource retained in academic library.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleTakeDown = () => {
    setReports((prev) =>
      prev.map((r) => (r.id === takeDownTarget.id ? { ...r, status: 'resolved' } : r))
    );
    setActionNotice(`Resource "${takeDownTarget.resourceTitle}" removed from student library.`);
    setTimeout(() => setActionNotice(null), 3000);
    setTakeDownTarget(null);
  };

  const pendingCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-red-500" />
            <span>Content Moderation & Flagged Materials</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Investigate student and faculty flags regarding document errors, copyright concerns, or scan defects
          </p>
        </div>

        {pendingCount > 0 && (
          <Badge variant="danger" className="text-xs font-bold px-3 py-1.5 w-fit">
            {pendingCount} Active Reports
          </Badge>
        )}
      </div>

      {actionNotice && (
        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 text-xs flex items-center gap-2 animate-fade-in font-semibold">
          <CheckCircle2 className="w-4 h-4 text-blue-500" />
          <span>{actionNotice}</span>
        </div>
      )}

      {reports.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="All Reports Resolved"
          description="There are currently zero flagged resources awaiting moderation."
        />
      ) : (
        <div className="space-y-4">
          {reports.map((rep) => (
            <Card key={rep.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        rep.status === 'pending'
                          ? 'danger'
                          : rep.status === 'resolved'
                          ? 'success'
                          : 'default'
                      }
                      className="text-[10px] capitalize font-bold"
                    >
                      {rep.status}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      Reported by {rep.reportedBy} on {formatDate(rep.reportedAt)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {rep.resourceTitle}
                  </h3>

                  <div className="p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-xs text-red-700 dark:text-red-300">
                    <strong className="block mb-0.5">Reported Concern:</strong>
                    {rep.reason}
                  </div>
                </div>

                {/* Moderation Actions */}
                {rep.status === 'pending' && (
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => navigate(`/student/library/${rep.resourceId}`)}
                      icon={Eye}
                      className="text-xs"
                    >
                      Inspect File
                    </Button>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => handleDismiss(rep.id)}
                      className="text-xs text-gray-600 hover:text-emerald-600"
                    >
                      Dismiss Flag
                    </Button>
                    <Button
                      variant="danger"
                      size="xs"
                      onClick={() => setTakeDownTarget(rep)}
                      className="text-xs"
                    >
                      Take Down Resource
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Take Down Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(takeDownTarget)}
        onClose={() => setTakeDownTarget(null)}
        onConfirm={handleTakeDown}
        title="Take Down Flagged Academic Resource"
        message={`Are you sure you want to unpublish "${takeDownTarget?.resourceTitle}" from the student library? The author will be notified to upload an updated version.`}
        confirmLabel="Confirm Take Down"
        variant="danger"
      />
    </div>
  );
}
