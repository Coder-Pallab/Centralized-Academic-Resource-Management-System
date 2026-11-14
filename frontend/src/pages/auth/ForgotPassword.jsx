import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { validateEmail } from '../../utils/validators';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
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
          Reset Your Password
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          We will send password recovery instructions to your college email
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-900 py-8 px-6 sm:px-8 shadow-xl shadow-gray-200/50 dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-800">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Check Your Inbox</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                If an account exists with <span className="font-semibold text-gray-900 dark:text-white">{email}</span>, you will receive a password reset link shortly.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <Button
                  variant="primary"
                  onClick={() => navigate('/reset-password')}
                  fullWidth
                  className="rounded-xl"
                >
                  Proceed to Reset Password Page
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSubmitted(false)}
                  fullWidth
                  className="rounded-xl"
                >
                  Resend Link / Try Another Email
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered College Email"
                type="email"
                placeholder="e.g. rahul.sharma@college.edu"
                icon={Mail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                icon={Send}
                fullWidth
                className="py-2.5 rounded-xl font-semibold shadow-md shadow-blue-500/20"
              >
                Send Reset Link
              </Button>

              <div className="pt-2 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
