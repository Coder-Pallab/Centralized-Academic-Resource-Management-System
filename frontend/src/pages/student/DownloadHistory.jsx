import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  Search,
  Trash2,
  Calendar,
  FileText,
  RotateCw,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { formatFileSize, formatDate } from '../../utils/formatters';
import { mockResources } from '../../data/mockResources';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import FileIcon from '../../components/common/FileIcon';
import EmptyState from '../../components/common/EmptyState';

export default function DownloadHistory() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([
    {
      id: 'dl-1',
      resourceId: 'r2',
      title: 'Computer Networks Lab Manual',
      category: 'practical-files',
      fileType: 'pdf',
      fileSize: 1843200,
      downloadedAt: '2024-11-06T16:45:00',
      subject: 'Computer Networks',
    },
    {
      id: 'dl-2',
      resourceId: 'r3',
      title: 'BCA 5th Semester Previous Year Question Papers 2022-2023',
      category: 'question-papers',
      fileType: 'pdf',
      fileSize: 892000,
      downloadedAt: '2024-11-05T11:20:00',
      subject: 'Artificial Intelligence',
    },
    {
      id: 'dl-3',
      resourceId: 'r5',
      title: 'BCA 2nd Semester Complete Syllabus 2024-25',
      category: 'syllabus',
      fileType: 'pdf',
      fileSize: 524288,
      downloadedAt: '2024-11-03T10:15:00',
      subject: 'All Subjects',
    },
    {
      id: 'dl-4',
      resourceId: 'r4',
      title: 'Machine Learning Fundamentals Presentation',
      category: 'presentations',
      fileType: 'pptx',
      fileSize: 5242880,
      downloadedAt: '2024-11-01T14:30:00',
      subject: 'Artificial Intelligence',
    },
    {
      id: 'dl-5',
      resourceId: 'r10',
      title: 'Cloud Computing Reference Book',
      category: 'reference-books',
      fileType: 'pdf',
      fileSize: 8388608,
      downloadedAt: '2024-10-28T09:00:00',
      subject: 'Cloud Computing',
    },
  ]);

  const [search, setSearch] = useState('');
  const [downloadAlert, setDownloadAlert] = useState(null);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your download logs?')) {
      setHistory([]);
    }
  };

  const handleRemoveItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRedownload = (item) => {
    setDownloadAlert(`Re-downloading ${item.title}...`);
    setTimeout(() => setDownloadAlert(null), 2500);
  };

  const filteredHistory = history.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.subject.toLowerCase().includes(search.toLowerCase())
  );

  const totalBytes = history.reduce((acc, curr) => acc + curr.fileSize, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Download className="w-7 h-7 text-blue-600" />
            <span>Download History</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track and re-download your previously fetched study materials and resources
          </p>
        </div>

        {history.length > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClearHistory}
            icon={Trash2}
            className="text-xs text-red-600 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            Clear History
          </Button>
        )}
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Files Downloaded</span>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{history.length} Files</p>
        </Card>
        <Card className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/40">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Estimated Bandwidth Consumed</span>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{formatFileSize(totalBytes)}</p>
        </Card>
        <Card className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Storage Health</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">Verified Clean</p>
        </Card>
      </div>

      {downloadAlert && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadAlert}</span>
        </div>
      )}

      {history.length > 0 && (
        <Card className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search downloaded files by title or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Card>
      )}

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <EmptyState
          icon={Download}
          title={history.length === 0 ? 'No downloads on record' : 'No matching files found'}
          description={
            history.length === 0
              ? 'When you download study notes or syllabus files from the academic library, they will appear here.'
              : 'Try clearing your search query.'
          }
          action={
            history.length === 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/student/library')}
                icon={BookOpen}
              >
                Browse Resource Library
              </Button>
            )
          }
        />
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-all"
            >
              <div
                className="flex items-start gap-3 min-w-0 cursor-pointer"
                onClick={() => navigate(`/student/library/${item.resourceId}`)}
              >
                <FileIcon extension={item.fileType} size="md" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="primary" className="text-[10px] capitalize">
                      {item.category.replace('-', ' ')}
                    </Badge>
                    <span className="text-[10px] text-gray-400">
                      {new Date(item.downloadedAt).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.subject} • {formatFileSize(item.fileSize)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleRedownload(item)}
                  icon={RotateCw}
                  className="text-xs"
                >
                  Download Again
                </Button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Remove from history log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
