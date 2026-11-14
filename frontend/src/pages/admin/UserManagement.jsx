import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Shield,
  UserCheck,
  UserX,
  Trash2,
  Eye,
  Edit,
  Mail,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { mockStudents, mockFaculty } from '../../data/mockUsers';
import { departments } from '../../data/mockDepartments';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState(mockStudents);
  const [faculty, setFaculty] = useState(mockFaculty);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [viewUser, setViewUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    department: 'Computer Applications',
    course: 'Bachelor of Computer Applications',
    semester: '1st Semester',
    rollNumber: '',
    employeeId: '',
    designation: 'Assistant Professor',
  });

  const handleToggleStatus = (user) => {
    if (activeTab === 'students') {
      setStudents((prev) =>
        prev.map((s) => (s.id === user.id ? { ...s, isActive: !s.isActive } : s))
      );
    } else {
      setFaculty((prev) =>
        prev.map((f) => (f.id === user.id ? { ...f, isActive: !f.isActive } : f))
      );
    }
  };

  const handleConfirmDelete = () => {
    if (activeTab === 'students') {
      setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    } else {
      setFaculty((prev) => prev.filter((f) => f.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newUser.role === 'student') {
      const studentObj = {
        id: `student-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: 'student',
        department: newUser.department,
        course: newUser.course,
        semester: newUser.semester,
        rollNumber: newUser.rollNumber || `BCA2024${Math.floor(Math.random() * 900 + 100)}`,
        isActive: true,
        joinedAt: new Date().toISOString().split('T')[0],
        totalDownloads: 0,
        totalBookmarks: 0,
      };
      setStudents([studentObj, ...students]);
    } else {
      const facultyObj = {
        id: `faculty-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: 'faculty',
        department: newUser.department,
        designation: newUser.designation,
        employeeId: newUser.employeeId || `FAC${Math.floor(Math.random() * 900 + 100)}`,
        isActive: true,
        joinedAt: new Date().toISOString().split('T')[0],
        totalUploads: 0,
        totalDownloads: 0,
      };
      setFaculty([facultyObj, ...faculty]);
    }
    setIsAddOpen(false);
  };

  const currentList = activeTab === 'students' ? students : faculty;
  const filteredList = currentList.filter((u) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = u.name?.toLowerCase().includes(q);
      const matchEmail = u.email?.toLowerCase().includes(q);
      const matchId = (u.rollNumber || u.employeeId)?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchId) return false;
    }
    if (statusFilter === 'active' && !u.isActive) return false;
    if (statusFilter === 'inactive' && u.isActive) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-purple-600" />
            <span>Campus User Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Provision accounts, inspect student records, monitor faculty rosters, and enforce RBAC policies
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddOpen(true)}
          icon={Plus}
          className="text-xs bg-purple-600 hover:bg-purple-700"
        >
          Add New User
        </Button>
      </div>

      {/* Tabs & Search Filter Card */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tab Switcher */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('students'); setSearch(''); }}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'students'
                  ? 'bg-white dark:bg-gray-900 text-purple-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Students ({students.length})</span>
            </button>
            <button
              onClick={() => { setActiveTab('faculty'); setSearch(''); }}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'faculty'
                  ? 'bg-white dark:bg-gray-900 text-purple-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Faculty ({faculty.length})</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab} by name, email, or ${activeTab === 'students' ? 'roll no' : 'emp ID'}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </Card>

      {/* User Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3 px-4 font-semibold">User Profile</th>
                <th className="py-3 px-4 font-semibold">Department & Cohort</th>
                <th className="py-3 px-4 font-semibold">Identifier</th>
                <th className="py-3 px-4 font-semibold">Engagement</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredList.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                        <p className="text-[11px] text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                    <p className="font-semibold">{u.department}</p>
                    <p className="text-[10px] text-gray-400">
                      {u.course ? `${u.course} (${u.semester})` : u.designation}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-gray-700 dark:text-gray-300">
                    {u.rollNumber || u.employeeId}
                  </td>

                  <td className="py-3.5 px-4 text-gray-500">
                    {activeTab === 'students'
                      ? `${u.totalDownloads || 0} Downloads`
                      : `${u.totalUploads || 0} Uploads`}
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className="cursor-pointer"
                      title="Click to toggle account activation"
                    >
                      <Badge
                        variant={u.isActive ? 'success' : 'danger'}
                        className="text-[10px]"
                      >
                        {u.isActive ? 'Active' : 'Deactivated'}
                      </Badge>
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setViewUser(u)}
                        className="p-1.5 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          u.isActive
                            ? 'text-gray-400 hover:text-amber-600'
                            : 'text-gray-400 hover:text-emerald-600'
                        }`}
                        title={u.isActive ? 'Deactivate account' : 'Activate account'}
                      >
                        {u.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(u)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Provision New Campus Account"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Account Role"
              options={[
                { value: 'student', label: 'College Student' },
                { value: 'faculty', label: 'Faculty Member' },
              ]}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              required
            />
            <Select
              label="Department"
              options={departments.map((d) => ({ value: d.name, label: d.name }))}
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              required
            />
          </div>

          <Input
            label="Full Name"
            placeholder="e.g. Ananya Sen"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />

          <Input
            label="College Email"
            type="email"
            placeholder="e.g. ananya@college.edu"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />

          {newUser.role === 'student' ? (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Roll Number"
                placeholder="e.g. BCA2024099"
                value={newUser.rollNumber}
                onChange={(e) => setNewUser({ ...newUser, rollNumber: e.target.value })}
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
                value={newUser.semester}
                onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Employee ID"
                placeholder="e.g. FAC012"
                value={newUser.employeeId}
                onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                required
              />
              <Input
                label="Designation"
                placeholder="e.g. Assistant Professor"
                value={newUser.designation}
                onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700">
              Create Account
            </Button>
          </div>
        </form>
      </Modal>

      {/* View User Profile Modal */}
      <Modal
        isOpen={Boolean(viewUser)}
        onClose={() => setViewUser(null)}
        title="User Account Record"
      >
        {viewUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Avatar name={viewUser.name} size="lg" />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{viewUser.name}</h3>
                <p className="text-xs text-gray-400">{viewUser.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="primary" className="text-[10px] capitalize">
                    {viewUser.role}
                  </Badge>
                  <Badge variant={viewUser.isActive ? 'success' : 'danger'} className="text-[10px]">
                    {viewUser.isActive ? 'Active' : 'Deactivated'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-400 block">Department</span>
                <span className="font-semibold">{viewUser.department}</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-400 block">{viewUser.rollNumber ? 'Roll Number' : 'Employee ID'}</span>
                <span className="font-semibold font-mono">{viewUser.rollNumber || viewUser.employeeId}</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-400 block">Contact Phone</span>
                <span className="font-semibold">{viewUser.phone || '+91 98765 43210'}</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-400 block">Account Created</span>
                <span className="font-semibold">{viewUser.joinedAt || '2023-07-14'}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete User Confirm */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Revoke & Delete User Account"
        message={`Are you sure you want to permanently delete the account for "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
