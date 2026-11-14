import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Check,
  X,
  Eye,
  FileText,
  Clock,
  User,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { mockResources } from '../../data/mockResources';
import { formatFileSize, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import FileIcon from '../../components/common/FileIcon';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';

export default function ResourceApproval() {
  const navigate = useNavigate();

  // Load resources with pending status, plus create some demo items for approval review
  const [items, setItems] = useState([
    {
      id: 'p-1',
      title: 'Operating Systems - Process Scheduling & Memory Management Notes',
      description: 'Comprehensive lecture notes prepared for BCA 2nd Semester students covering Round Robin, SJF, paging, and virtual memory with numerical problems.',
      category: 'study-notes',
      subject: 'Operating Systems',
      course: 'BCA',
      semester: '2nd Semester',
      department: 'Computer Applications',
      fileType: 'pdf',
      fileSize: 3145728,
      fileName: 'OS_Scheduling_Notes.pdf',
      uploadedByName: 'Prof. Anjali Singh',
      uploadedAt: '2024-11-12T09:30:00',
      status: 'pending',
    },
    {
      id: 'p-2',
      title: 'Previous Year Question Papers Collection 2023-2024 (Solved)',
      description: 'Official university solved papers for Artificial Intelligence BCA 5th semester with detailed answer keys.',
      category: 'question-papers',
      subject: 'Artificial Intelligence',
      course: 'BCA',
      semester: '5th Semester',
      department: 'Computer Applications',
      fileType: 'pdf',
      fileSize: 5242880,
      fileName: 'AI_PYQ_Solved_2023_24.pdf',
      uploadedByName: 'Dr. Suresh Patel',
      uploadedAt: '2024-11-13T14:15:00',
      status: 'pending',
    },
    {
      id: 'p-3',
      title: 'Corporate Financial Accounting - Balance Sheet Analysis Practical Guide',
      description: 'Practical exercise file for BCom 2nd Semester covering financial ratio analysis and cash flow statements.',
      category: 'practical-files',
      subject: 'Financial Accounting',
      course: 'BCom',
      semester: '2nd Semester',
      department: 'Commerce',
      fileType: 'xlsx',
      fileSize: 1843200,
      fileName: 'Balance_Sheet_Analysis.xlsx',
      uploadedByName: 'Prof. Kavita Sharma',
      uploadedAt: '2024-11-13T16:00:00',
      status: 'pending',
    },
    ...mockResources.filter((r) => r.approvalStatus === 'pending'),
  ]);

  const [filter, setFilter] = useState('pending');
  const [inspectItem, setInspectItem] = useState(null);
  const [rejectItem, setRejectItem] = useState(null);
  const [rejectReason, setRejectReason] = useState('The document requires clearer page scans or syllabus unit annotations.');
  const [actionNotice, setActionNotice] = useState(null);

  const handleApprove = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
    setActionNotice('Resource approved and published to the Student Library.');
    setTimeout(() => setActionNotice(null), 3000);
    setInspectItem(null);
  };

  const handleReject = () => {
    setItems((prev) =>
      prev.map((item) => (item.id === rejectItem.id ? { ...item, status: 'rejected' } : item))
    );
    setActionNotice('Resource rejected and returned to faculty member with feedback.');
    setTimeout(() => setActionNotice(null), 3000);
    setRejectItem(null);
    setInspectItem(null);
  };

  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const filteredList = items.filter((i) => (filter === 'all' ? true : i.status === filter));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-7 h-7 text-purple-600" />
            <span>Academic Resource Verification Queue</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review and authorize uploaded lecture notes, question papers, and syllabus documents before publication
          </p>
        </div>

        {pendingCount > 0 && (
          <Badge variant="warning" className="text-xs font-bold px-3 py-1.5 w-fit">
            {pendingCount} Awaiting Review
          </Badge>
        )}
      </div>

      {actionNotice && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
            filter === 'pending'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Verification ({pendingCount})</span>
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
            filter === 'approved'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Approved</span>
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
            filter === 'rejected'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <X className="w-4 h-4" />
          <span>Rejected</span>
        </button>
      </div>

      {/* Queue List */}
      {filteredList.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title={filter === 'pending' ? 'Verification Queue is Clear!' : 'No resources in this list'}
          description={
            filter === 'pending'
              ? 'All faculty submissions have been reviewed and approved. Great job!'
              : 'No items match the selected filter.'
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredList.map((item) => (
            <Card key={item.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <FileIcon extension={item.fileType} size="lg" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary" className="text-[10px] capitalize">
                        {item.category.replace('-', ' ')}
                      </Badge>
                      <Badge
                        variant={
                          item.status === 'approved'
                            ? 'success'
                            : item.status === 'rejected'
                            ? 'danger'
                            : 'warning'
                        }
                        className="text-[10px] capitalize"
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        Uploaded by {item.uploadedByName} on {formatDate(item.uploadedAt)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Status or Quick Action Buttons */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-mono font-semibold text-gray-500">
                    {formatFileSize(item.fileSize)}
                  </span>

                  {item.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => setInspectItem(item)}
                        icon={Eye}
                        className="text-xs"
                      >
                        Review
                      </Button>
                      <Button
                        variant="success"
                        size="xs"
                        onClick={() => handleApprove(item.id)}
                        icon={Check}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="xs"
                        onClick={() => setRejectItem(item)}
                        icon={X}
                        className="text-xs"
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Badge variant={item.status === 'approved' ? 'success' : 'danger'} className="text-xs capitalize">
                      {item.status}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Classification Footer */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <span>Subject: <strong className="text-gray-700 dark:text-gray-300">{item.subject}</strong></span>
                  <span>Course: <strong className="text-gray-700 dark:text-gray-300">{item.course} ({item.semester})</strong></span>
                  <span>Dept: <strong className="text-gray-700 dark:text-gray-300">{item.department}</strong></span>
                </div>
                <span className="font-mono text-[11px] text-gray-400">{item.fileName}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Review & Inspection Modal */}
      <Modal
        isOpen={Boolean(inspectItem)}
        onClose={() => setInspectItem(null)}
        title="Inspect Academic Resource Submission"
        size="lg"
      >
        {inspectItem && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                {inspectItem.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{inspectItem.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-400 block">Contributor</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{inspectItem.uploadedByName}</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-400 block">Subject / Syllabus Code</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{inspectItem.subject}</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-400 block">File Size & Format</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {formatFileSize(inspectItem.fileSize)} ({inspectItem.fileType.toUpperCase()})
                </span>
              </div>
            </div>

            {/* Simulated verification checklist */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-2">
              <p className="font-bold text-gray-900 dark:text-white">Institutional Quality Verification:</p>
              <div className="space-y-1 text-gray-600 dark:text-gray-300">
                <p>✓ Complies with university syllabus curriculum 2024-25</p>
                <p>✓ Legible scan quality and proper text formatting</p>
                <p>✓ No proprietary third-party commercial copyright violations</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setInspectItem(null)}
              >
                Close
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setRejectItem(inspectItem);
                  setInspectItem(null);
                }}
              >
                Reject with Feedback
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={() => handleApprove(inspectItem.id)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Approve & Publish to Library
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Reason Modal */}
      <Modal
        isOpen={Boolean(rejectItem)}
        onClose={() => setRejectItem(null)}
        title="Reject Resource Submission"
      >
        <div className="space-y-4">
          <p className="text-xs text-gray-500">
            Please provide corrective feedback to {rejectItem?.uploadedByName}. They will be notified to revise and re-upload.
          </p>

          <textarea
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setRejectItem(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleReject}>
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
