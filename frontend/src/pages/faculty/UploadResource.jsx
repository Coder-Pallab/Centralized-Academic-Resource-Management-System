import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  File,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { departments, getSubjectsByCourseAndSemester } from '../../data/mockDepartments';
import { RESOURCE_CATEGORIES, SEMESTERS } from '../../utils/constants';
import { formatFileSize } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';

export default function UploadResource() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'Computer Applications',
    course: 'BCA',
    semester: '5th Semester',
    subject: 'Mobile Application Development',
    category: 'study-notes',
    visibility: 'public',
    tags: 'notes, lecture, exam-prep',
  });

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState('');

  // Course subjects dynamic options
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    const subs = getSubjectsByCourseAndSemester(formData.course, formData.semester);
    setSubjectsList(subs);
    if (subs.length > 0) {
      setFormData((prev) => ({ ...prev, subject: subs[0].name }));
    }
  }, [formData.course, formData.semester]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a descriptive resource title.');
      return;
    }
    if (!file) {
      setError('Please select or drag an academic document to upload.');
      return;
    }

    setIsUploading(true);
    setError('');

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadComplete(true);
        }, 400);
      }
    }, 200);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <Upload className="w-7 h-7 text-emerald-600" />
          <span>Upload Academic Resource</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Publish verified lecture notes, question papers, syllabus, or lab guides for college students
        </p>
      </div>

      {uploadComplete ? (
        <Card className="p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Resource Uploaded Successfully!
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            "{formData.title}" has been placed in the review queue. Once approved by administration, it will immediately appear in the student library.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setUploadComplete(false);
                setFile(null);
                setUploadProgress(0);
                setFormData({
                  ...formData,
                  title: '',
                  description: '',
                });
              }}
            >
              Upload Another File
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/faculty/resources')}
            >
              View My Resources
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Document Details Section */}
            <div className="space-y-4">
              <Input
                label="Resource Title"
                placeholder="e.g. Data Structures & Algorithms Unit 1-4 Complete Notes"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description & Learning Objectives <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide an overview of the document content, topics covered, and relevant examination units..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Academic Classification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <Select
                label="Department"
                options={departments.map((d) => ({ value: d.name, label: d.name }))}
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />

              <Select
                label="Course"
                options={[
                  { value: 'BCA', label: 'Bachelor of Computer Applications (BCA)' },
                  { value: 'MCA', label: 'Master of Computer Applications (MCA)' },
                  { value: 'BBA', label: 'Bachelor of Business Administration (BBA)' },
                  { value: 'BCom', label: 'Bachelor of Commerce (BCom)' },
                ]}
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />

              <Select
                label="Semester"
                options={SEMESTERS.map((s) => ({ value: s, label: s }))}
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                required
              />

              <Select
                label="Subject"
                options={subjectsList.map((s) => ({ value: s.name, label: `${s.name} (${s.code})` }))}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              <Select
                label="Resource Category"
                options={RESOURCE_CATEGORIES}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />

              <Select
                label="Visibility"
                options={[
                  { value: 'public', label: 'All Students (Campus Wide)' },
                  { value: 'course-only', label: 'Enrolled Course Cohort Only' },
                ]}
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              />
            </div>

            {/* Drag and drop file upload field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Academic Document File <span className="text-red-500">*</span>
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 bg-gray-50/50 dark:bg-gray-800/30'
                }`}
              >
                {file ? (
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl max-w-md mx-auto">
                    <div className="flex items-center gap-3 truncate">
                      <FileText className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                      <div className="text-left truncate">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="p-1 rounded-lg text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Drag and drop your academic document here
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Supports PDF, DOCX, PPTX, XLSX, and ZIP up to 25MB
                      </p>
                    </div>

                    <div>
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors">
                        <span>Browse from Computer</span>
                        <input
                          type="file"
                          onChange={handleFileSelect}
                          accept=".pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,.zip"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags Input */}
            <Input
              label="Keywords / Tags (Comma separated)"
              placeholder="e.g. data structures, algorithms, bca, semester 2, exam notes"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />

            {/* Upload progress */}
            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-emerald-600">Uploading and validating document...</span>
                  <span className="text-gray-500">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isUploading}
              icon={Upload}
              fullWidth
              className="py-3 rounded-xl font-bold shadow-md shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700"
            >
              Submit Resource for Academic Verification
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
