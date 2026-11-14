import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Users,
  Megaphone,
  Building2,
  FileText,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { mockResources } from '../../data/mockResources';
import { mockFaculty } from '../../data/mockUsers';
import { mockAnnouncements } from '../../data/mockAnnouncements';
import { departments } from '../../data/mockDepartments';
import { formatFileSize } from '../../utils/formatters';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import FileIcon from '../../components/common/FileIcon';
import EmptyState from '../../components/common/EmptyState';

export default function GlobalSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState('all');

  const results = useMemo(() => {
    if (!query.trim()) return { resources: [], faculty: [], announcements: [], departments: [] };
    const q = query.toLowerCase();

    const matchedResources = mockResources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.tags?.some((t) => t.toLowerCase().includes(q))
    );

    const matchedFaculty = mockFaculty.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.department.toLowerCase().includes(q) ||
        f.specialization?.toLowerCase().includes(q)
    );

    const matchedAnnouncements = mockAnnouncements.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q)
    );

    const matchedDepts = departments.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.courses.some((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
    );

    return {
      resources: matchedResources,
      faculty: matchedFaculty,
      announcements: matchedAnnouncements,
      departments: matchedDepts,
    };
  }, [query]);

  const totalResults =
    results.resources.length +
    results.faculty.length +
    results.announcements.length +
    results.departments.length;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <Search className="w-7 h-7 text-blue-600" />
          <span>Global Campus Search</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Search across all study notes, faculty members, campus notices, and academic departments
        </p>
      </div>

      {/* Search Input Card */}
      <Card className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Type anything (e.g. Data Structures, Suresh Patel, Mid-Term Exam, BCA, Python)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchParams(e.target.value ? { q: e.target.value } : {});
            }}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Chips */}
        {query.trim() && (
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold pt-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              All Matches ({totalResults})
            </button>
            <button
              onClick={() => setActiveFilter('resources')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeFilter === 'resources'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              Resources ({results.resources.length})
            </button>
            <button
              onClick={() => setActiveFilter('faculty')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeFilter === 'faculty'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              Faculty ({results.faculty.length})
            </button>
            <button
              onClick={() => setActiveFilter('announcements')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeFilter === 'announcements'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              Announcements ({results.announcements.length})
            </button>
          </div>
        )}
      </Card>

      {!query.trim() ? (
        <Card className="p-8 text-center space-y-4">
          <Search className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Start typing to search CARMS
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            You can search by course code, professor name, resource subject, or keyword.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs">
            {['Data Structures', 'Python Programming', 'Syllabus', 'Dr. Suresh Patel', 'Exams'].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    setSearchParams({ q: term });
                  }}
                  className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  "{term}"
                </button>
              )
            )}
          </div>
        </Card>
      ) : totalResults === 0 ? (
        <EmptyState
          icon={Search}
          title="No results found"
          description={`We couldn't find anything matching "${query}". Try checking your spelling or using more general terms.`}
        />
      ) : (
        <div className="space-y-6">
          {/* Resources Section */}
          {(activeFilter === 'all' || activeFilter === 'resources') &&
            results.resources.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Academic Resources ({results.resources.length})</span>
                </h3>

                <div className="space-y-2.5">
                  {results.resources.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => navigate(`/student/library/${res.id}`)}
                      className="p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileIcon extension={res.fileType} size="sm" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 truncate">
                            {res.title}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {res.subject} • {res.course} ({res.semester}) • By {res.uploadedByName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="primary" className="text-[10px] capitalize">
                          {res.category.replace('-', ' ')}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Faculty Members Section */}
          {(activeFilter === 'all' || activeFilter === 'faculty') &&
            results.faculty.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Faculty Directory ({results.faculty.length})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.faculty.map((f) => (
                    <Card key={f.id} className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                        {f.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {f.name}
                        </h4>
                        <p className="text-xs text-gray-400 truncate">
                          {f.designation} • Dept. of {f.department}
                        </p>
                        <p className="text-[11px] text-emerald-600 mt-0.5 truncate">
                          {f.specialization}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

          {/* Campus Announcements Section */}
          {(activeFilter === 'all' || activeFilter === 'announcements') &&
            results.announcements.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-purple-600" />
                  <span>Campus Notices ({results.announcements.length})</span>
                </h3>

                <div className="space-y-2.5">
                  {results.announcements.map((ann) => (
                    <Card key={ann.id} className="p-4 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-purple-600 uppercase">{ann.type}</span>
                        <span className="text-gray-400">{ann.publishedAt}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{ann.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{ann.content}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
