export const departments = [
  {
    id: 'dept-1',
    name: 'Computer Applications',
    code: 'CA',
    courses: [
      {
        id: 'course-1',
        name: 'Bachelor of Computer Applications',
        code: 'BCA',
        duration: '3 Years',
        semesters: 6,
        subjects: {
          '1st Semester': [
            { id: 'sub-1', name: 'Fundamentals of IT', code: 'BCA101' },
            { id: 'sub-2', name: 'Mathematics I', code: 'BCA102' },
            { id: 'sub-3', name: 'Digital Electronics', code: 'BCA103' },
            { id: 'sub-4', name: 'Communication Skills', code: 'BCA104' },
            { id: 'sub-5', name: 'Introduction to Programming in C', code: 'BCA105' },
          ],
          '2nd Semester': [
            { id: 'sub-6', name: 'Data Structures', code: 'BCA201' },
            { id: 'sub-7', name: 'Mathematics II', code: 'BCA202' },
            { id: 'sub-8', name: 'Operating Systems', code: 'BCA203' },
            { id: 'sub-9', name: 'OOP with C++', code: 'BCA204' },
            { id: 'sub-10', name: 'Database Management', code: 'BCA205' },
          ],
          '3rd Semester': [
            { id: 'sub-11', name: 'Computer Networks', code: 'BCA301' },
            { id: 'sub-12', name: 'Web Technologies', code: 'BCA302' },
            { id: 'sub-13', name: 'Java Programming', code: 'BCA303' },
            { id: 'sub-14', name: 'Software Engineering', code: 'BCA304' },
            { id: 'sub-15', name: 'Accounting & Finance', code: 'BCA305' },
          ],
          '4th Semester': [
            { id: 'sub-16', name: 'Advanced Java', code: 'BCA401' },
            { id: 'sub-17', name: 'Python Programming', code: 'BCA402' },
            { id: 'sub-18', name: 'Computer Graphics', code: 'BCA403' },
            { id: 'sub-19', name: 'System Analysis & Design', code: 'BCA404' },
          ],
          '5th Semester': [
            { id: 'sub-20', name: 'Mobile Application Development', code: 'BCA501' },
            { id: 'sub-21', name: 'Artificial Intelligence', code: 'BCA502' },
            { id: 'sub-22', name: 'Cloud Computing', code: 'BCA503' },
            { id: 'sub-23', name: 'Information Security', code: 'BCA504' },
          ],
          '6th Semester': [
            { id: 'sub-24', name: 'Machine Learning', code: 'BCA601' },
            { id: 'sub-25', name: 'Big Data Analytics', code: 'BCA602' },
            { id: 'sub-26', name: 'IoT Systems', code: 'BCA603' },
          ],
        },
      },
      {
        id: 'course-2',
        name: 'Master of Computer Applications',
        code: 'MCA',
        duration: '2 Years',
        semesters: 4,
        subjects: {
          '1st Semester': [
            { id: 'sub-m1', name: 'Advanced Mathematics', code: 'MCA101' },
            { id: 'sub-m2', name: 'Advanced Data Structures', code: 'MCA102' },
            { id: 'sub-m3', name: 'Computer Architecture', code: 'MCA103' },
          ],
          '2nd Semester': [
            { id: 'sub-m4', name: 'Advanced DBMS', code: 'MCA201' },
            { id: 'sub-m5', name: 'Software Testing', code: 'MCA202' },
            { id: 'sub-m6', name: 'Full Stack Development', code: 'MCA203' },
          ],
          '3rd Semester': [
            { id: 'sub-m7', name: 'Deep Learning', code: 'MCA301' },
            { id: 'sub-m8', name: 'Cloud Architecture', code: 'MCA302' },
          ],
          '4th Semester': [
            { id: 'sub-m9', name: 'Major Project', code: 'MCA401' },
          ],
        },
      },
    ],
  },
  {
    id: 'dept-2',
    name: 'Business Administration',
    code: 'BA',
    courses: [
      {
        id: 'course-3',
        name: 'Bachelor of Business Administration',
        code: 'BBA',
        duration: '3 Years',
        semesters: 6,
        subjects: {
          '1st Semester': [
            { id: 'sub-b1', name: 'Principles of Management', code: 'BBA101' },
            { id: 'sub-b2', name: 'Business Communication', code: 'BBA102' },
            { id: 'sub-b3', name: 'Financial Accounting', code: 'BBA103' },
          ],
          '2nd Semester': [
            { id: 'sub-b4', name: 'Marketing Management', code: 'BBA201' },
            { id: 'sub-b5', name: 'Organizational Behavior', code: 'BBA202' },
          ],
          '3rd Semester': [
            { id: 'sub-b6', name: 'Financial Management', code: 'BBA301' },
            { id: 'sub-b7', name: 'Human Resource Management', code: 'BBA302' },
          ],
          '4th Semester': [
            { id: 'sub-b8', name: 'Strategic Management', code: 'BBA401' },
          ],
          '5th Semester': [
            { id: 'sub-b9', name: 'Digital Marketing', code: 'BBA501' },
          ],
          '6th Semester': [
            { id: 'sub-b10', name: 'Business Ethics & CSR', code: 'BBA601' },
          ],
        },
      },
    ],
  },
  {
    id: 'dept-3',
    name: 'Commerce',
    code: 'COM',
    courses: [
      {
        id: 'course-4',
        name: 'Bachelor of Commerce',
        code: 'BCom',
        duration: '3 Years',
        semesters: 6,
        subjects: {
          '1st Semester': [
            { id: 'sub-c1', name: 'Financial Accounting', code: 'BCom101' },
            { id: 'sub-c2', name: 'Business Economics', code: 'BCom102' },
          ],
          '2nd Semester': [
            { id: 'sub-c3', name: 'Corporate Accounting', code: 'BCom201' },
            { id: 'sub-c4', name: 'Business Law', code: 'BCom202' },
          ],
          '3rd Semester': [
            { id: 'sub-c5', name: 'Cost Accounting', code: 'BCom301' },
            { id: 'sub-c6', name: 'Income Tax Law & Practice', code: 'BCom302' },
          ],
          '4th Semester': [
            { id: 'sub-c7', name: 'GST & Indirect Tax', code: 'BCom401' },
          ],
          '5th Semester': [
            { id: 'sub-c8', name: 'Advanced Auditing', code: 'BCom501' },
          ],
          '6th Semester': [
            { id: 'sub-c9', name: 'International Trade', code: 'BCom601' },
          ],
        },
      },
    ],
  },
];

export const getAllCourses = () =>
  departments.flatMap((d) => d.courses.map((c) => ({ ...c, department: d.name, departmentId: d.id })));

export const getSubjectsByCourseAndSemester = (courseCode, semester) => {
  for (const dept of departments) {
    for (const course of dept.courses) {
      if (course.code === courseCode && course.subjects && course.subjects[semester]) {
        return course.subjects[semester];
      }
    }
  }
  return [
    { id: 'gen-1', name: 'General Core Paper 1', code: 'GEN101' },
    { id: 'gen-2', name: 'General Core Paper 2', code: 'GEN102' },
  ];
};
