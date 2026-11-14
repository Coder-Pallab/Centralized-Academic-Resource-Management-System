import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Bookmark,
  Share2,
  Calendar,
  User,
  BookOpen,
  Layers,
  FileText,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { mockResources } from '../../data/mockResources';
import { formatFileSize, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import FileIcon from '../../components/common/FileIcon';
import Modal from '../../components/common/Modal';

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const resource = mockResources.find((r) => r.id === id) || mockResources[0];

  // Document previewer state
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Related resources
  const relatedResources = mockResources
    .filter((r) => r.id !== resource.id && (r.subject === resource.subject || r.category === resource.category))
    .slice(0, 3);

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Simulate real file download trigger
    const link = document.createElement('a');
    link.href = '#';
    link.download = resource.fileName;
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (reportReason.trim()) {
      setReportSuccess(true);
      setTimeout(() => {
        setReportSuccess(false);
        setShowReportModal(false);
        setReportReason('');
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/student/library')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resource Library</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyLink}
            icon={copiedLink ? CheckCircle2 : Share2}
            className="text-xs"
          >
            {copiedLink ? 'Link Copied' : 'Share Resource'}
          </Button>

          <Button
            variant={isBookmarked ? 'secondary' : 'secondary'}
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            icon={Bookmark}
            className={`text-xs ${isBookmarked ? 'text-purple-600 border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/30' : ''}`}
          >
            {isBookmarked ? 'Bookmarked' : 'Save'}
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowReportModal(true)}
            icon={AlertTriangle}
            className="text-xs bg-transparent text-gray-500 hover:text-red-600 border-transparent hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            Report
          </Button>
        </div>
      </div>

      {/* Main Resource Header Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <FileIcon extension={resource.fileType} size="xl" />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" className="capitalize text-xs font-semibold">
                  {resource.category.replace('-', ' ')}
                </Badge>
                <Badge variant="success" className="text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Material</span>
                </Badge>
                <span className="text-xs text-gray-400 font-medium">
                  {resource.course} • {resource.semester}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {resource.title}
              </h1>

              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>

          {/* Quick Download Action Box */}
          <div className="flex lg:flex-col items-center justify-between lg:justify-center p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-800 flex-shrink-0 min-w-[220px]">
            <div className="text-left lg:text-center mb-0 lg:mb-3">
              <span className="text-xs text-gray-400 block">File Size</span>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {formatFileSize(resource.fileSize)} ({resource.fileType.toUpperCase()})
              </span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleDownload}
              icon={Download}
              className="px-6 rounded-xl font-semibold shadow-md shadow-blue-500/20"
            >
              Download File
            </Button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Download initialized for "{resource.fileName}". Check your browser downloads folder.</span>
          </div>
        )}

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
          <div>
            <span className="text-gray-400 block font-medium">Subject</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{resource.subject}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Faculty Contributor</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{resource.uploadedByName}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Upload Date</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{formatDate(resource.uploadedAt)}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Total Downloads</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{resource.downloads} downloads</span>
          </div>
        </div>
      </Card>

      {/* PDF Document Preview Interface */}
      <Card className="p-0 overflow-hidden space-y-0">
        {/* Viewer Toolbar */}
        <div className="p-3 bg-gray-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="font-semibold truncate max-w-xs">{resource.fileName}</span>
            <span className="text-gray-400 text-[11px] hidden sm:inline">({formatFileSize(resource.fileSize)})</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Page navigation */}
            <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-lg">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Next page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-lg">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="p-1 hover:text-blue-400"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1 hover:text-blue-400"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Viewer Content Canvas */}
        <div className="bg-gray-200 dark:bg-gray-950 p-6 sm:p-10 flex justify-center min-h-[500px] max-h-[680px] overflow-auto scrollbar-thin">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-white text-gray-900 rounded-lg shadow-2xl p-8 sm:p-12 space-y-6 transition-transform duration-150 select-none"
          >
            {/* Watermark / Academic header */}
            <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-center text-xs text-gray-500">
              <div>
                <span className="font-bold text-blue-900 uppercase tracking-wider block">
                  DEPARTMENT OF {resource.department.toUpperCase()}
                </span>
                <span>CARMS Central Repository • Verified Document</span>
              </div>
              <div className="text-right">
                <span className="font-semibold block">{resource.subject}</span>
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>

            {/* Mock Document Render */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {resource.title}
              </h2>
              <div className="inline-block px-2.5 py-1 bg-blue-50 text-blue-800 rounded font-mono text-xs font-semibold">
                Unit {currentPage}: {resource.subject} Comprehensive Module
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                This academic reference material provides unit-wise breakdown, key theoretical frameworks, solved problems, algorithms, and practical applications aligned with the current university examination syllabus.
              </p>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs text-gray-800 space-y-1">
                <p className="font-bold text-blue-900">// Course Curriculum Reference Specification</p>
                <p>Course: {resource.course} ({resource.semester})</p>
                <p>Instructor: {resource.uploadedByName}</p>
                <p>Standard Reference Code: {resource.id.toUpperCase()}-REV24</p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-sm text-gray-900">Key Study Objectives for this Module:</h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
                  <li>Understand foundational terminology, architectural paradigms, and design patterns.</li>
                  <li>Review previous university examination questions and step-by-step marking schemes.</li>
                  <li>Execute lab exercises and practical problem sets outlined in the syllabus.</li>
                  <li>Verify compliance with prescribed reference textbooks and academic standard guidelines.</li>
                </ul>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-8 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-400">
              <span>CARMS Institutional Education Management Portal</span>
              <span>Authorized Student Copy</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Related Academic Materials */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Related Academic Materials in {resource.subject}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedResources.map((rel) => (
            <Card
              key={rel.id}
              hover
              onClick={() => {
                navigate(`/student/library/${rel.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col justify-between p-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <FileIcon extension={rel.fileType} size="sm" />
                  <Badge variant="primary" className="text-[9px] capitalize">
                    {rel.category.replace('-', ' ')}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600">
                  {rel.title}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between text-[10px] text-gray-400">
                <span>{rel.semester}</span>
                <span>{rel.downloads} DLs</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Report Resource"
        size="md"
      >
        {reportSuccess ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-gray-900 dark:text-white">Report Submitted</h3>
            <p className="text-xs text-gray-500">
              Thank you. The academic moderation committee will inspect this resource shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Please specify the issue with "{resource.title}" (e.g. incorrect syllabus, copyright issue, corrupted file, or inappropriate content).
            </p>

            <textarea
              rows={4}
              placeholder="Describe the issue in detail..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              required
              className="w-full p-3 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                type="submit"
              >
                Submit Report
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
