export const studentDashboardStats = {
  totalDownloads: 48,
  totalBookmarks: 12,
  totalViews: 134,
  recentDownloads: [
    { id: 'dl-1', resourceId: 'r2', resourceTitle: 'Computer Networks Lab Manual', downloadedAt: '2024-11-06T16:45:00', fileType: 'pdf' },
    { id: 'dl-2', resourceId: 'r3', resourceTitle: 'BCA 5th Semester PYQs', downloadedAt: '2024-11-05T11:20:00', fileType: 'pdf' },
    { id: 'dl-3', resourceId: 'r5', resourceTitle: 'BCA 2nd Semester Complete Syllabus', downloadedAt: '2024-11-03T10:15:00', fileType: 'pdf' },
    { id: 'dl-4', resourceId: 'r4', resourceTitle: 'Machine Learning Presentation', downloadedAt: '2024-11-01T14:30:00', fileType: 'pptx' },
    { id: 'dl-5', resourceId: 'r10', resourceTitle: 'Cloud Computing Reference Book', downloadedAt: '2024-10-28T09:00:00', fileType: 'pdf' },
  ],
  downloadHistory: [
    { month: 'Jun', downloads: 4 },
    { month: 'Jul', downloads: 8 },
    { month: 'Aug', downloads: 14 },
    { month: 'Sep', downloads: 11 },
    { month: 'Oct', downloads: 18 },
    { month: 'Nov', downloads: 15 },
  ],
  categoryBreakdown: [
    { category: 'Study Notes', count: 18 },
    { category: 'Question Papers', count: 12 },
    { category: 'Practical Files', count: 8 },
    { category: 'Presentations', count: 6 },
    { category: 'Assignments', count: 4 },
  ],
};

export const facultyDashboardStats = {
  totalUploads: 45,
  totalDownloads: 1240,
  totalViews: 3450,
  pendingApprovals: 2,
  monthlyUploads: [
    { month: 'Jun', uploads: 4 },
    { month: 'Jul', uploads: 6 },
    { month: 'Aug', uploads: 9 },
    { month: 'Sep', uploads: 12 },
    { month: 'Oct', uploads: 8 },
    { month: 'Nov', uploads: 6 },
  ],
  categoryBreakdown: [
    { category: 'Study Notes', count: 15, downloads: 420 },
    { category: 'Practical Files', count: 12, downloads: 380 },
    { category: 'Lecture Materials', count: 8, downloads: 210 },
    { category: 'Question Papers', count: 6, downloads: 150 },
    { category: 'Presentations', count: 4, downloads: 80 },
  ],
};

export const adminDashboardStats = {
  totalStudents: 1248,
  totalFaculty: 42,
  totalResources: 234,
  totalDownloads: 15678,
  pendingApprovals: 8,
  activeUsers: 892,
  newUsersThisMonth: 34,
  recentActivities: [
    { id: 'act-1', type: 'resource_uploaded', message: 'Dr. Suresh Patel uploaded "AI Lab Practical File"', time: '2024-11-13T14:15:00', actor: 'Dr. Suresh Patel' },
    { id: 'act-2', type: 'user_registered', message: 'New student Vikram Mehta registered', time: '2024-11-13T10:30:00', actor: 'Vikram Mehta' },
    { id: 'act-3', type: 'resource_approved', message: 'Admin approved "DBMS Practical File"', time: '2024-11-12T09:00:00', actor: 'Academic Admin' },
    { id: 'act-4', type: 'resource_uploaded', message: 'Prof. Anjali Singh uploaded "Python Assignment"', time: '2024-11-11T11:20:00', actor: 'Prof. Anjali Singh' },
    { id: 'act-5', type: 'report_filed', message: 'Resource "BBA Exam Guide" reported for syllabus review', time: '2024-11-10T09:00:00', actor: 'Student Flag' },
  ],
  resourcesByCategory: [
    { category: 'Study Notes', count: 78 },
    { category: 'Question Papers', count: 45 },
    { category: 'Practical Files', count: 42 },
    { category: 'Lecture Materials', count: 28 },
    { category: 'Reference Books', count: 18 },
    { category: 'Presentations', count: 12 },
    { category: 'Assignments', count: 8 },
    { category: 'Syllabus', count: 3 },
  ],
  monthlyDownloads: [
    { month: 'May', downloads: 1200 },
    { month: 'Jun', downloads: 1450 },
    { month: 'Jul', downloads: 980 },
    { month: 'Aug', downloads: 2100 },
    { month: 'Sep', downloads: 2450 },
    { month: 'Oct', downloads: 3200 },
    { month: 'Nov', downloads: 2298 },
  ],
  departmentStats: [
    { department: 'Computer Applications', students: 580, resources: 142 },
    { department: 'Business Administration', students: 420, resources: 62 },
    { department: 'Commerce', students: 248, resources: 30 },
  ],
};

// Aliases for backwards compatibility
export const studentStats = studentDashboardStats;
export const facultyStats = facultyDashboardStats;
export const adminStats = adminDashboardStats;
