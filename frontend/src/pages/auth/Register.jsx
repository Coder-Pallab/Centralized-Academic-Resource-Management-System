import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  GraduationCap,
  Briefcase,
  User,
  Mail,
  Lock,
  Phone,
  BookOpen,
  Calendar,
  IdCard,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { setUser, setRole } from '../../store/slices/authSlice';
import { departments } from '../../data/mockDepartments';
import { validateEmail, validatePassword, validateRequired, validatePhone } from '../../utils/validators';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setActiveRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: 'Computer Applications',
    course: 'Bachelor of Computer Applications',
    semester: '1st Semester',
    rollNumber: '',
    employeeId: '',
    designation: 'Assistant Professor',
    specialization: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const departmentOptions = departments.map((d) => ({ value: d.name, label: d.name }));
  const semesterOptions = [
    { value: '1st Semester', label: '1st Semester' },
    { value: '2nd Semester', label: '2nd Semester' },
    { value: '3rd Semester', label: '3rd Semester' },
    { value: '4th Semester', label: '4th Semester' },
    { value: '5th Semester', label: '5th Semester' },
    { value: '6th Semester', label: '6th Semester' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameErr = validateRequired(formData.name, 'Full Name');
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validatePassword(formData.password);
    if (passErr) newErrors.password = passErr;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone) {
      const phoneErr = validatePhone(formData.phone);
      if (phoneErr) newErrors.phone = phoneErr;
    }

    if (role === 'student') {
      const rollErr = validateRequired(formData.rollNumber, 'Roll Number');
      if (rollErr) newErrors.rollNumber = rollErr;
    } else {
      const empErr = validateRequired(formData.employeeId, 'Employee ID');
      if (empErr) newErrors.employeeId = empErr;
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the institutional academic policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: role,
        department: formData.department,
        course: formData.course,
        semester: role === 'student' ? formData.semester : undefined,
        rollNumber: role === 'student' ? formData.rollNumber : undefined,
        employeeId: role === 'faculty' ? formData.employeeId : undefined,
        designation: role === 'faculty' ? formData.designation : undefined,
        avatar: null,
      };

      dispatch(setUser(newUser));
      dispatch(setRole(role));
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        if (role === 'faculty') {
          navigate('/faculty/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }, 1200);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              CARMS
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create Academic Account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join the centralized academic materials repository for your college
          </p>
        </div>

        {success ? (
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Account Created Successfully!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome to CARMS, {formData.name}. Redirecting to your {role} dashboard...
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/40 dark:shadow-none">
            {/* Role Select Bar */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Registering As:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveRole('student')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                    role === 'student'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>College Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRole('faculty')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                    role === 'faculty'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Faculty Member</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="e.g. Rahul Sharma"
                  icon={User}
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <Input
                  label="College Email"
                  name="email"
                  type="email"
                  placeholder="e.g. rahul@college.edu"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Min 8 characters"
                  icon={Lock}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Mobile Number"
                  name="phone"
                  placeholder="10 digit number"
                  icon={Phone}
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <Select
                  label="Department"
                  name="department"
                  options={departmentOptions}
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role specific inputs */}
              {role === 'student' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <Select
                    label="Current Semester"
                    name="semester"
                    options={semesterOptions}
                    value={formData.semester}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Roll Number / Enrollment No"
                    name="rollNumber"
                    placeholder="e.g. BCA2024045"
                    icon={IdCard}
                    value={formData.rollNumber}
                    onChange={handleChange}
                    error={errors.rollNumber}
                    required
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <Input
                    label="Employee / Faculty ID"
                    name="employeeId"
                    placeholder="e.g. FAC202301"
                    icon={IdCard}
                    value={formData.employeeId}
                    onChange={handleChange}
                    error={errors.employeeId}
                    required
                  />
                  <Input
                    label="Designation"
                    name="designation"
                    placeholder="e.g. Assistant Professor"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Terms */}
              <div className="pt-2">
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-0.5 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className="ml-2 block text-xs text-gray-600 dark:text-gray-400">
                    I agree to adhere to the institutional academic honor code, copyright compliance, and campus resource sharing policies.
                  </label>
                </div>
                {errors.terms && <p className="text-xs text-red-600 mt-1">{errors.terms}</p>}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                fullWidth
                className="py-3 rounded-xl font-semibold shadow-md shadow-blue-500/20"
              >
                Complete Registration
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Already registered with CARMS?{' '}
                <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Sign In here
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
