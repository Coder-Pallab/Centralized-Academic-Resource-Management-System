import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  User,
  Briefcase,
  Mail,
  Phone,
  Building2,
  Award,
  BookOpen,
  Edit,
  CheckCircle2,
  FolderKanban,
  Download,
} from 'lucide-react';
import { setUser } from '../../store/slices/authSlice';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

export default function FacultyProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Dr. Suresh Patel',
    phone: '+91 9876500001',
    office: 'Academic Block B, Room 304',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science & Engineering (IIT Bombay)',
    experience: '12 Years Academic & Industry Research',
    bio: 'Researcher and educator specializing in Mobile Architectures, Advanced Data Structures, and Cloud Distributed Systems.',
  });

  const [savedAlert, setSavedAlert] = useState(false);

  const taughtSubjects = [
    { code: 'BCA201', name: 'Data Structures & Algorithms', course: 'BCA (2nd Sem)', students: 60 },
    { code: 'BCA501', name: 'Mobile Application Development', course: 'BCA (5th Sem)', students: 58 },
    { code: 'MCA103', name: 'Advanced Data Structures', course: 'MCA (1st Sem)', students: 45 },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(setUser({ ...user, name: formData.name }));
    setIsEditOpen(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Avatar name={user?.name || 'Dr. Suresh Patel'} size="2xl" className="ring-4 ring-white/20 shadow-lg" />

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black">{user?.name || 'Dr. Suresh Patel'}</h1>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  {formData.designation} • Dept. of {user?.department || 'Computer Applications'}
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditOpen(true)}
                icon={Edit}
                className="bg-white/10 hover:bg-white/20 text-white border-transparent text-xs backdrop-blur-sm self-center sm:self-start"
              >
                Edit Profile
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl pt-1">
              {formData.bio}
            </p>
          </div>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Faculty credentials updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic Credentials */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Academic Credentials</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-400 block">Faculty Employee ID</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">FAC001</span>
              </div>
              <div className="py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-400 block">Highest Qualification</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formData.qualification}</span>
              </div>
              <div className="py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-400 block">Teaching Experience</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formData.experience}</span>
              </div>
              <div className="py-1">
                <span className="text-gray-400 block">Department Status</span>
                <Badge variant="success" className="text-[10px] mt-1">Tenured Faculty</Badge>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Campus Contact</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 truncate">{user?.email || 'suresh.patel@college.edu'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{formData.office}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Taught Courses & Materials Impact */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Courses Currently Instructed</span>
            </h3>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {taughtSubjects.map((sub) => (
                <div key={sub.code} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-600">{sub.code}</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{sub.name}</span>
                    </div>
                    <span className="text-gray-400 mt-0.5 block">{sub.course}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-semibold text-gray-600 dark:text-gray-300">
                    {sub.students} Enrolled
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <FolderKanban className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">45</p>
              <p className="text-xs text-gray-400">Total Uploads Published</p>
            </Card>
            <Card className="p-4 text-center">
              <Download className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">1,240</p>
              <p className="text-xs text-gray-400">Student Downloads</p>
            </Card>
            <Card className="p-4 text-center">
              <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">4.9 / 5.0</p>
              <p className="text-xs text-gray-400">Faculty Resource Rating</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Faculty Profile"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Designation"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            required
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Campus Office Location"
            value={formData.office}
            onChange={(e) => setFormData({ ...formData, office: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Academic Bio & Research
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
