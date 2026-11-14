import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { setUser, setRole } from '../../store/slices/authSlice';
import { validateEmail, validateRequired } from '../../utils/validators';
import { mockStudents, mockFaculty, mockAdmin } from '../../data/mockUsers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setActiveRole] = useState('student');
  const [email, setEmail] = useState('rahul.sharma@college.edu');
  const [password, setPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleQuickFill = (targetRole) => {
    setActiveRole(targetRole);
    if (targetRole === 'student') {
      setEmail('rahul.sharma@college.edu');
      setPassword('Password123');
    } else if (targetRole === 'faculty') {
      setEmail('suresh.patel@college.edu');
      setPassword('Faculty123');
    } else {
      setEmail('admin@college.edu');
      setPassword('Admin123');
    }
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validateRequired(password, 'Password');
    if (passErr) newErrors.password = passErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    setTimeout(() => {
      let loggedUser;
      if (role === 'admin') {
        loggedUser = { ...mockAdmin, role: 'admin' };
      } else if (role === 'faculty') {
        loggedUser = { ...mockFaculty[0], role: 'faculty' };
      } else {
        loggedUser = { ...mockStudents[0], role: 'student' };
      }

      dispatch(setUser(loggedUser));
      dispatch(setRole(role));
      setLoading(false);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            CARMS
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to Academic Portal
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Enter your credentials to access your courses, resources & announcements
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-900 py-8 px-6 sm:px-8 shadow-xl shadow-gray-200/50 dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-800">
          {/* Role Tabs */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => handleQuickFill('student')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === 'student'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('faculty')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === 'faculty'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === 'admin'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Quick Demo Credentials Notice */}
          <div className="mb-5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 dark:text-blue-200">
              <span className="font-semibold capitalize">{role} demo account loaded:</span>
              <p className="font-mono text-[11px] text-blue-700 dark:text-blue-300 mt-0.5">
                {email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="College Email Address"
              type="email"
              placeholder="e.g. yourname@college.edu"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 pl-9 pr-10 bg-white dark:bg-gray-800 border rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none"
              >
                Keep me signed in on this device
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              fullWidth
              className="mt-2 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-500/20"
            >
              Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Register as Student or Faculty
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Protected by CARMS Institutional Role-Based Access Control
        </p>
      </div>
    </div>
  );
}
