import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Mail,
  Phone,
  Clock,
  BookOpen,
  CheckCircle2,
  FileQuestion,
} from 'lucide-react';
import { departments } from '../../data/mockDepartments';
import { SEMESTERS } from '../../utils/constants';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function Help() {
  const [openFaq, setOpenFaq] = useState(0);

  // Request Resource state
  const [requestData, setRequestData] = useState({
    subject: '',
    department: 'Computer Applications',
    semester: '5th Semester',
    category: 'Question Papers',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How are uploaded academic resources verified for quality and accuracy?',
      a: 'All lecture notes, syllabus guides, question papers, and lab files are authored or reviewed by certified college faculty members and approved by academic administrators before becoming visible in the student resource library.',
    },
    {
      q: 'Can I download files and view them offline?',
      a: 'Yes, all resources available in PDF, Word, PowerPoint, or ZIP formats can be downloaded directly to your device for offline study. You can also view full multi-page PDF documents right inside your browser without third-party software.',
    },
    {
      q: 'How do I request study material that is currently missing from the library?',
      a: 'You can use the "Request Academic Material" form below on this page. Your request is automatically routed to the respective faculty department head for review and upload.',
    },
    {
      q: 'How do I bookmark resources for quick access during exam week?',
      a: 'Click the Bookmark ribbon icon on any resource card or detail view. All saved resources are instantly stored in your "My Bookmarks" tab for 1-click retrieval.',
    },
    {
      q: 'Who should I contact if a document contains outdated syllabus topics or errors?',
      a: 'Each resource page features a "Report" button in the upper toolbar. Simply click Report and specify the issue. The academic committee will inspect the file and update it.',
    },
  ];

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestData.subject.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRequestData({
        subject: '',
        department: 'Computer Applications',
        semester: '5th Semester',
        category: 'Question Papers',
        details: '',
      });
    }, 3500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-blue-600" />
          <span>Help & Academic Support</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Find answers to common questions, request new study materials, or contact campus technical support
        </p>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              className="p-4 cursor-pointer hover:border-blue-500/30 transition-colors"
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {faq.q}
                </span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </div>

              {openFaq === idx && (
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Request Study Material Form */}
      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-blue-600" />
            <span>Request Missing Academic Material</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Can't find question papers or lecture notes for a specific topic? Submit a formal request to your department.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold">Request Submitted to Faculty!</p>
              <p className="text-[11px] mt-0.5">
                Your request for "{requestData.subject}" has been queued. You will receive an alert once materials are uploaded.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRequestSubmit} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Subject Name / Course Topic"
                placeholder="e.g. Distributed Operating Systems"
                value={requestData.subject}
                onChange={(e) => setRequestData({ ...requestData, subject: e.target.value })}
                required
              />

              <Select
                label="Department"
                options={departments.map((d) => ({ value: d.name, label: d.name }))}
                value={requestData.department}
                onChange={(e) => setRequestData({ ...requestData, department: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Semester"
                options={SEMESTERS.map((s) => ({ value: s, label: s }))}
                value={requestData.semester}
                onChange={(e) => setRequestData({ ...requestData, semester: e.target.value })}
                required
              />

              <Select
                label="Resource Category Needed"
                options={[
                  { value: 'Question Papers', label: 'Previous Year Question Papers' },
                  { value: 'Study Notes', label: 'Comprehensive Study Notes' },
                  { value: 'Practical Files', label: 'Lab Practical Manual' },
                  { value: 'Reference Books', label: 'Reference Text' },
                  { value: 'Lecture Materials', label: 'Lecture Slides' },
                ]}
                value={requestData.category}
                onChange={(e) => setRequestData({ ...requestData, category: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Specify specific units, topics, or previous examination years needed..."
                value={requestData.details}
                onChange={(e) => setRequestData({ ...requestData, details: e.target.value })}
                className="w-full p-2.5 text-xs sm:text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Send}
              className="text-xs sm:text-sm rounded-xl font-semibold"
            >
              Submit Resource Request
            </Button>
          </form>
        )}
      </Card>

      {/* Campus IT & Academic Office Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <Card className="p-4 space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
            <Mail className="w-4 h-4" />
            <span>Academic Helpdesk</span>
          </div>
          <p className="text-gray-400">helpdesk@college.edu</p>
          <p className="text-gray-500 text-[11px]">Response within 24 business hours</p>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
            <Phone className="w-4 h-4" />
            <span>Campus IT Helpline</span>
          </div>
          <p className="text-gray-400">+91 022 2845 0000</p>
          <p className="text-gray-500 text-[11px]">Mon - Sat: 9:00 AM - 5:00 PM</p>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex items-center gap-2 text-purple-600 font-bold mb-1">
            <Clock className="w-4 h-4" />
            <span>Central Library</span>
          </div>
          <p className="text-gray-400">Main Academic Block, Floor 2</p>
          <p className="text-gray-500 text-[11px]">Open 8:00 AM - 8:00 PM daily</p>
        </Card>
      </div>
    </div>
  );
}
