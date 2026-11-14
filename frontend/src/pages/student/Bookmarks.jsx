import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Search,
  Download,
  Trash2,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { mockResources } from '../../data/mockResources';
import { formatFileSize, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import FileIcon from '../../components/common/FileIcon';
import EmptyState from '../../components/common/EmptyState';

export default function Bookmarks() {
  const navigate = useNavigate();

  // Initial bookmarked resources
  const [bookmarkedList, setBookmarkedList] = useState(
    mockResources.filter((r) => ['r2', 'r3', 'r4', 'r10', 'r13', 'r17'].includes(r.id))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleRemove = (e, id) => {
    e.stopPropagation();
    setBookmarkedList((prev) => prev.filter((item) => item.id !== id));
  };

  const filtered = bookmarkedList.filter((item) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (categoryFilter && item.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-7 h-7 text-purple-600" />
            <span>Saved Academic Resources</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Quickly access your pinned study notes, reference manuals, and previous year question papers
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/student/library')}
          icon={BookOpen}
          className="text-xs w-fit"
        >
          Explore More Materials
        </Button>
      </div>

      {/* Search & Category Filter Bar */}
      {bookmarkedList.length > 0 && (
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search within saved bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="study-notes">Study Notes</option>
              <option value="question-papers">Question Papers</option>
              <option value="practical-files">Practical Files</option>
              <option value="syllabus">Syllabus</option>
              <option value="reference-books">Reference Books</option>
            </select>
          </div>
        </Card>
      )}

      {/* Bookmarks Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title={bookmarkedList.length === 0 ? 'No bookmarks saved yet' : 'No matching bookmarks found'}
          description={
            bookmarkedList.length === 0
              ? 'Browse the academic resource library and tap the bookmark icon on any material to save it for offline review.'
              : 'Try clearing your search query or category filter.'
          }
          action={
            bookmarkedList.length === 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/student/library')}
                icon={BookOpen}
              >
                Go to Resource Library
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <Card
              key={item.id}
              hover
              onClick={() => navigate(`/student/library/${item.id}`)}
              className="flex flex-col justify-between group p-5 relative"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <FileIcon extension={item.fileType} size="md" />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleRemove(e, item.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Badge variant="purple" className="text-[10px] capitalize mb-2">
                  {item.category.replace('-', ' ')}
                </Badge>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2 text-[11px] text-gray-400">
                <div className="flex justify-between">
                  <span className="truncate">{item.subject}</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{item.semester}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span>{formatFileSize(item.fileSize)}</span>
                  <span className="text-blue-600 font-semibold">{item.downloads} downloads</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
