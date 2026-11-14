import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Trash2,
  Download,
  AlertCircle,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function ManageAssignments() {
  const [assignments, setAssignments] = useState([
    {
      id: 'asg-1',
      title: 'Python Programming - Unit 1 & 2 Practical Assignment',
      course: 'BCA',
      semester: '4th Semester',
      subject: 'Python Programming',
      deadline: '2024-11-30',
      totalMarks: 25,
      submissions: 42,
      totalStudents: 60,
      status: 'active',
      instructions: 'Solve all 10 programming problems. Submit soft copy with output screenshots.',
    },
    {
      id: 'asg-2',
      title: 'Mobile Application Development - Android Activity Lifecycle',
      course: 'BCA',
      semester: '5th Semester',
      subject: 'Mobile Application Development',
      deadline: '2024-12-05',
      totalMarks: 30,
      submissions: 18,
      totalStudents: 58,
      status: 'active',
      instructions: 'Build a two-screen Android activity with Intent parameter passing.',
    },
    {
      id: 'asg-3',
      title: 'Data Structures - Balanced Binary Search Trees Implementation',
      course: 'BCA',
      semester: '2nd Semester',
      subject: 'Data Structures',
      deadline: '2024-10-25',
      totalMarks: 20,
      submissions: 56,
      totalStudents: 58,
      status: 'closed',
      instructions: 'Write C++ code for AVL tree rotations and node deletions.',
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [newAsg, setNewAsg] = useState({
    title: '',
    course: 'BCA',
    semester: '5th Semester',
    subject: 'Artificial Intelligence',
    deadline: '',
    totalMarks: 25,
    instructions: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const created = {
      id: `asg-${Date.now()}`,
      ...newAsg,
      submissions: 0,
      totalStudents: 58,
      status: 'active',
    };
    setAssignments([created, ...assignments]);
    setIsCreateOpen(false);
    setNewAsg({
      title: '',
      course: 'BCA',
      semester: '5th Semester',
      subject: 'Artificial Intelligence',
      deadline: '',
      totalMarks: 25,
      instructions: '',
    });
  };

  const handleToggleStatus = (id) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'closed' : 'active' } : a))
    );
  };

  const handleDelete = () => {
    setAssignments((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-emerald-600" />
            <span>Manage Academic Assignments</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create coursework assignments, set deadlines, and track student submissions
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateOpen(true)}
          icon={Plus}
          className="text-xs bg-emerald-600 hover:bg-emerald-700"
        >
          Create New Assignment
        </Button>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignments.map((asg) => {
          const submissionPercentage = Math.round((asg.submissions / asg.totalStudents) * 100);
          const isClosed = asg.status === 'closed';

          return (
            <Card key={asg.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge variant={isClosed ? 'default' : 'success'} className="text-[10px] capitalize">
                    {asg.status}
                  </Badge>
                  <span className="text-xs font-semibold text-gray-400">
                    Max Marks: {asg.totalMarks}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">
                  {asg.title}
                </h3>

                <p className="text-xs text-gray-400">
                  {asg.course} ({asg.semester}) • {asg.subject}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {asg.instructions}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 text-xs">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
                    <span>Submissions</span>
                    <span>{asg.submissions} of {asg.totalStudents} ({submissionPercentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${submissionPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1 text-red-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    Due: {formatDate(asg.deadline)}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(asg.id)}
                    className="hover:underline font-semibold text-blue-600"
                  >
                    {isClosed ? 'Reopen' : 'Close Submissions'}
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => alert(`Downloading submissions zip bundle for ${asg.title}...`)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Download all submissions"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(asg)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Delete assignment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Coursework Assignment"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Assignment Title"
            placeholder="e.g. Unit 3 Programming Exercises"
            value={newAsg.title}
            onChange={(e) => setNewAsg({ ...newAsg, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Course"
              options={[
                { value: 'BCA', label: 'BCA' },
                { value: 'MCA', label: 'MCA' },
                { value: 'BBA', label: 'BBA' },
                { value: 'BCom', label: 'BCom' },
              ]}
              value={newAsg.course}
              onChange={(e) => setNewAsg({ ...newAsg, course: e.target.value })}
              required
            />
            <Select
              label="Semester"
              options={[
                { value: '1st Semester', label: '1st Semester' },
                { value: '2nd Semester', label: '2nd Semester' },
                { value: '3rd Semester', label: '3rd Semester' },
                { value: '4th Semester', label: '4th Semester' },
                { value: '5th Semester', label: '5th Semester' },
                { value: '6th Semester', label: '6th Semester' },
              ]}
              value={newAsg.semester}
              onChange={(e) => setNewAsg({ ...newAsg, semester: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Submission Deadline"
              type="date"
              value={newAsg.deadline}
              onChange={(e) => setNewAsg({ ...newAsg, deadline: e.target.value })}
              required
            />
            <Input
              label="Total Marks"
              type="number"
              value={newAsg.totalMarks}
              onChange={(e) => setNewAsg({ ...newAsg, totalMarks: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Instructions
            </label>
            <textarea
              rows={3}
              placeholder="Specify formatting, problem statements, and submission requirements..."
              value={newAsg.instructions}
              onChange={(e) => setNewAsg({ ...newAsg, instructions: e.target.value })}
              className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Publish Assignment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Assignment"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
      />
    </div>
  );
}
