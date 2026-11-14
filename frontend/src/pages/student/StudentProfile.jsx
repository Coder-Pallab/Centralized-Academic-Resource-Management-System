import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  IdCard,
  Edit,
  ShieldCheck,
  CheckCircle2,
  Download,
  Bookmark,
  Award,
} from 'lucide-react';
import { setUser } from '../../store/slices/authSlice';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

export default function StudentProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Rahul Sharma',
    phone: user?.phone || '+91 9876543210',
    address: 'Mumbai, Maharashtra',
    bio: 'Computer Applications student passionate about modern web technologies, algorithms, and distributed systems.',
  });

  const [savedAlert, setSavedAlert] = useState(false);

  const enrolledSubjects = [
    { code: 'BCA501', name: 'Mobile Application Development', credits: 4, faculty: 'Dr. Suresh Patel' },
    { code: 'BCA502', name: 'Artificial Intelligence', credits: 4, faculty: 'Prof. Anjali Singh' },
    { code: 'BCA503', name: 'Cloud Computing', credits: 3, faculty: 'Dr. Mohan Verma' },
    { code: 'BCA504', name: 'Information Security', credits: 3, faculty: 'Dr. Ramesh Kumar' },
    { code: 'BCA505', name: 'Project Work - Phase 1', credits: 4, faculty: 'Prof. Anjali Singh' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(
      setUser({
        ...user,
        name: formData.name,
        phone: formData.phone,
      })
    );
    setIsEditOpen(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header Profile Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Avatar name={user?.name || 'Rahul Sharma'} size="2xl" className="ring-4 ring-white/20 shadow-lg" />

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black">{user?.name || 'Rahul Sharma'}</h1>
                <p className="text-xs sm:text-sm text-blue-100 font-medium">
                  {user?.course || 'Bachelor of Computer Applications'} • {user?.semester || '5th Semester'}
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

            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl pt-1">
              {formData.bio}
            </p>
          </div>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Grid: Left Details & Right Enrolled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic Credentials & Contact */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <IdCard className="w-4 h-4 text-blue-600" />
              <span>Academic Credentials</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-400">Roll Number</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{user?.rollNumber || 'BCA2022001'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-400">Enrollment Year</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">2022</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-400">Department</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{user?.department || 'Computer Applications'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-400">Current CGPA</span>
                <span className="font-bold text-emerald-600">8.84 / 10.0</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-400">Account Status</span>
                <Badge variant="success" className="text-[10px]">Verified Student</Badge>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Contact Information</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 truncate">{user?.email || 'rahul.sharma@college.edu'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{formData.address}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Enrolled Courses & Study Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Enrolled Subjects ({user?.semester || '5th Semester'})</span>
                </h3>
                <p className="text-xs text-gray-400">Current syllabus courses in progress</p>
              </div>
              <Badge variant="primary" className="text-xs">18 Total Credits</Badge>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {enrolledSubjects.map((sub) => (
                <div key={sub.code} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{sub.code}</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{sub.name}</span>
                    </div>
                    <span className="text-gray-400 mt-0.5 block">Instructor: {sub.faculty}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-semibold text-gray-600 dark:text-gray-300">
                    {sub.credits} Credits
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Academic Resource Engagement Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <Download className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">48</p>
              <p className="text-xs text-gray-400">Total Materials Downloaded</p>
            </Card>
            <Card className="p-4 text-center">
              <Bookmark className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-xs text-gray-400">Bookmarked Documents</p>
            </Card>
            <Card className="p-4 text-center">
              <Award className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">99%</p>
              <p className="text-xs text-gray-400">Curriculum Coverage</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Personal Information"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Current Campus Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Short Academic Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
