import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Landing from '../pages/auth/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

import StudentLayout from '../components/layout/StudentLayout';
import FacultyLayout from '../components/layout/FacultyLayout';
import AdminLayout from '../components/layout/AdminLayout';

import StudentDashboard from '../pages/student/StudentDashboard';
import ResourceLibrary from '../pages/student/ResourceLibrary';
import ResourceDetail from '../pages/student/ResourceDetail';
import Bookmarks from '../pages/student/Bookmarks';
import DownloadHistory from '../pages/student/DownloadHistory';
import StudentProfile from '../pages/student/StudentProfile';
import Notifications from '../pages/student/Notifications';
import GlobalSearch from '../pages/student/GlobalSearch';
import Settings from '../pages/student/Settings';
import Help from '../pages/student/Help';

import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import UploadResource from '../pages/faculty/UploadResource';
import ManageResources from '../pages/faculty/ManageResources';
import ManageAssignments from '../pages/faculty/ManageAssignments';
import Announcements from '../pages/faculty/Announcements';
import FacultyProfile from '../pages/faculty/FacultyProfile';

import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import AcademicManagement from '../pages/admin/AcademicManagement';
import ResourceApproval from '../pages/admin/ResourceApproval';
import AnnouncementManagement from '../pages/admin/AnnouncementManagement';
import Reports from '../pages/admin/Reports';

import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'library', element: <ResourceLibrary /> },
      { path: 'library/:id', element: <ResourceDetail /> },
      { path: 'bookmarks', element: <Bookmarks /> },
      { path: 'downloads', element: <DownloadHistory /> },
      { path: 'profile', element: <StudentProfile /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'search', element: <GlobalSearch /> },
      { path: 'settings', element: <Settings /> },
      { path: 'help', element: <Help /> },
    ],
  },
  {
    path: '/faculty',
    element: <FacultyLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <FacultyDashboard /> },
      { path: 'upload', element: <UploadResource /> },
      { path: 'resources', element: <ManageResources /> },
      { path: 'assignments', element: <ManageAssignments /> },
      { path: 'announcements', element: <Announcements /> },
      { path: 'profile', element: <FacultyProfile /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'academic', element: <AcademicManagement /> },
      { path: 'approvals', element: <ResourceApproval /> },
      { path: 'announcements', element: <AnnouncementManagement /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

