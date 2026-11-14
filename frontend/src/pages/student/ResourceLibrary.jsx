import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Download,
  Bookmark,
  BookOpen,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Check,
  Share2,
} from 'lucide-react';
import { mockResources } from '../../data/mockResources';
import { departments } from '../../data/mockDepartments';
import { RESOURCE_CATEGORIES, SEMESTERS, SORT_OPTIONS } from '../../utils/constants';
import { formatFileSize, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import FileIcon from '../../components/common/FileIcon';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';

export default function ResourceLibrary() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedDept, setSelectedDept] = useState(searchParams.get('dept') || '');
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get('course') || '');
  const [selectedSemester, setSelectedSemester] = useState(searchParams.get('semester') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Bookmarked IDs local state
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(['r2', 'r3', 'r12']));
  const [copiedId, setCopiedId] = useState(null);

  // Sync category param if changed outside
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShare = (e, id) => {
    e.stopPropagation();
    const url = `${window.location.origin}/student/library/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedDept('');
    setSelectedCourse('');
    setSelectedSemester('');
    setSelectedCategory('');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredResources = useMemo(() => {
    return mockResources.filter((res) => {
      if (res.approvalStatus !== 'approved') return false;

      // Search match
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(query);
        const matchesDesc = res.description.toLowerCase().includes(query);
        const matchesSubject = res.subject.toLowerCase().includes(query);
        const matchesUploader = res.uploadedByName?.toLowerCase().includes(query);
        const matchesTag = res.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesUploader && !matchesTag) {
          return false;
        }
      }

      // Department filter
      if (selectedDept && res.department !== selectedDept) return false;

      // Course filter
      if (selectedCourse && res.course !== selectedCourse) return false;

      // Semester filter
      if (selectedSemester && res.semester !== selectedSemester) return false;

      // Category filter
      if (selectedCategory && res.category !== selectedCategory) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
      if (sortBy === 'downloads') return (b.downloads || 0) - (a.downloads || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [search, selectedDept, selectedCourse, selectedSemester, selectedCategory, sortBy]);

  // Paginated slices
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage]);

  const activeFiltersCount = [selectedDept, selectedCourse, selectedSemester, selectedCategory, search].filter(Boolean).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Academic Resource Library
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse, filter, and access syllabus materials, question papers, notes, and lab files
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetFilters}
              icon={RotateCcw}
              className="text-xs"
            >
              Reset Filters ({activeFiltersCount})
            </Button>
          )}

          <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg p-0.5 bg-gray-50 dark:bg-gray-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls Card */}
      <Card className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by resource title, subject, instructor, or topic keywords (e.g. data structures, ML, SQL)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
          {/* Department */}
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
            ))}
          </select>

          {/* Semester */}
          <select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Semesters</option>
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {RESOURCE_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Results count indicator */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-center justify-end text-xs font-semibold text-gray-500">
            {filteredResources.length} items found
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
          <button
            onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Resources
          </button>
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setSelectedCategory(cat.value); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Resource Listing */}
      {paginatedResources.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No resources match your filters"
          description="Try broadening your search term or clearing one of the selected academic filters."
          action={
            <Button variant="secondary" size="sm" onClick={handleResetFilters} icon={RotateCcw}>
              Reset Filters
            </Button>
          }
        />
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {paginatedResources.map((res) => {
            const isBookmarked = bookmarkedIds.has(res.id);
            return (
              <Card
                key={res.id}
                hover
                onClick={() => navigate(`/student/library/${res.id}`)}
                className="flex flex-col justify-between group p-5 relative"
              >
                <div>
                  {/* Card Header: Icon, Category Badge & Action Buttons */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <FileIcon extension={res.fileType} size="md" />
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleShare(e, res.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Copy resource link"
                      >
                        {copiedId === res.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => toggleBookmark(e, res.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/30'
                            : 'text-gray-400 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this resource'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-2">
                    <Badge variant="primary" className="text-[10px] capitalize">
                      {res.category.replace('-', ' ')}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2 text-[11px] text-gray-500 dark:text-gray-400">
                  <div className="flex items-center justify-between">
                    <span className="truncate font-medium">{res.subject}</span>
                    <span className="font-semibold">{res.semester}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-gray-400">
                    <span>{formatFileSize(res.fileSize)}</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {res.downloads} downloads
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {paginatedResources.map((res) => {
            const isBookmarked = bookmarkedIds.has(res.id);
            return (
              <div
                key={res.id}
                onClick={() => navigate(`/student/library/${res.id}`)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <FileIcon extension={res.fileType} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="primary" className="text-[10px] capitalize">
                        {res.category.replace('-', ' ')}
                      </Badge>
                      <span className="text-[10px] text-gray-400">
                        {formatDate(res.uploadedAt)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {res.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      {res.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                      <span>{res.subject}</span>
                      <span>•</span>
                      <span>{res.semester}</span>
                      <span>•</span>
                      <span>By {res.uploadedByName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                  <div className="text-right text-xs">
                    <p className="font-bold text-gray-900 dark:text-gray-100">{res.downloads} DLs</p>
                    <p className="text-gray-400 text-[10px]">{formatFileSize(res.fileSize)}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => toggleBookmark(e, res.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isBookmarked
                          ? 'border-purple-200 bg-purple-50 dark:bg-purple-900/30 text-purple-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:text-purple-600'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                    >
                      <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/student/library/${res.id}`);
                      }}
                      icon={Download}
                    >
                      View & DL
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
