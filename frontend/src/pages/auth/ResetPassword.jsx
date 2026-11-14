import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { validatePassword } from '../../utils/validators';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const passErr = validatePassword(password);
    if (passErr) newErrors.password = passErr;

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            CARMS
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Set New Password
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Create a secure password for your CARMS academic portal account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-900 py-8 px-6 sm:px-8 shadow-xl shadow-gray-200/50 dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-800">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Password Successfully Updated
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                You can now log in with your updated credentials.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/login')}
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                className="mt-4 rounded-xl"
              >
                Go to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                placeholder="At least 8 chars, 1 uppercase, 1 number"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Re-type new password"
                icon={Lock}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                fullWidth
                className="py-2.5 rounded-xl font-semibold shadow-md shadow-blue-500/20"
              >
                Save New Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
