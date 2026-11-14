import React, { useState } from 'react';
import {
  Building2,
  GraduationCap,
  BookOpen,
  Plus,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { departments as initialDepartments } from '../../data/mockDepartments';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function AcademicManagement() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [selectedDeptId, setSelectedDeptId] = useState(initialDepartments[0]?.id || 'dept-1');
  const [expandedCourse, setExpandedCourse] = useState(initialDepartments[0]?.courses[0]?.id || null);

  // Modals
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form states
  const [newDept, setNewDept] = useState({ name: '', code: '' });
  const [newCourse, setNewCourse] = useState({ name: '', code: '', duration: '3 Years', semesters: 6 });
  const [newSubject, setNewSubject] = useState({ name: '', code: '', semester: '1st Semester' });

  const activeDept = departments.find((d) => d.id === selectedDeptId) || departments[0];

  const handleAddDept = (e) => {
    e.preventDefault();
    const created = {
      id: `dept-${Date.now()}`,
      name: newDept.name,
      code: newDept.code.toUpperCase(),
      courses: [],
    };
    setDepartments([...departments, created]);
    setSelectedDeptId(created.id);
    setIsAddDeptOpen(false);
    setNewDept({ name: '', code: '' });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const createdCourse = {
      id: `course-${Date.now()}`,
      name: newCourse.name,
      code: newCourse.code.toUpperCase(),
      duration: newCourse.duration,
      semesters: Number(newCourse.semesters),
      subjects: {
        '1st Semester': [],
        '2nd Semester': [],
        '3rd Semester': [],
        '4th Semester': [],
        '5th Semester': [],
        '6th Semester': [],
      },
    };

    setDepartments((prev) =>
      prev.map((d) =>
        d.id === selectedDeptId ? { ...d, courses: [...d.courses, createdCourse] } : d
      )
    );
    setExpandedCourse(createdCourse.id);
    setIsAddCourseOpen(false);
    setNewCourse({ name: '', code: '', duration: '3 Years', semesters: 6 });
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    const subObj = {
      id: `sub-${Date.now()}`,
      name: newSubject.name,
      code: newSubject.code.toUpperCase(),
    };

    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id !== selectedDeptId) return d;
        return {
          ...d,
          courses: d.courses.map((c) => {
            if (c.id !== expandedCourse) return c;
            const updatedSubs = { ...c.subjects };
            const existing = updatedSubs[newSubject.semester] || [];
            updatedSubs[newSubject.semester] = [...existing, subObj];
            return { ...c, subjects: updatedSubs };
          }),
        };
      })
    );

    setIsAddSubjectOpen(false);
    setNewSubject({ name: '', code: '', semester: '1st Semester' });
  };

  const handleDeleteItem = () => {
    if (deleteTarget.type === 'dept') {
      setDepartments((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      if (selectedDeptId === deleteTarget.id && departments.length > 1) {
        setSelectedDeptId(departments.find((d) => d.id !== deleteTarget.id).id);
      }
    } else if (deleteTarget.type === 'course') {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === selectedDeptId
            ? { ...d, courses: d.courses.filter((c) => c.id !== deleteTarget.id) }
            : d
        )
      );
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-7 h-7 text-purple-600" />
            <span>Academic Structure & Curriculum</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure institutional departments, degree courses, semesters, and subject syllabus trees
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAddDeptOpen(true)}
            icon={Plus}
            className="text-xs"
          >
            Add Department
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddCourseOpen(true)}
            icon={Plus}
            className="text-xs bg-purple-600 hover:bg-purple-700"
          >
            Add Degree Course
          </Button>
        </div>
      </div>

      {/* Department Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 scrollbar-thin">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => {
              setSelectedDeptId(dept.id);
              if (dept.courses.length > 0) setExpandedCourse(dept.courses[0].id);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedDeptId === dept.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{dept.name} ({dept.code})</span>
          </button>
        ))}
      </div>

      {/* Department Overview Banner */}
      {activeDept && (
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="purple" className="text-xs font-bold">
                  Code: {activeDept.code}
                </Badge>
                <span className="text-xs text-gray-400">
                  {activeDept.courses.length} Degree Programs Registered
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
                Department of {activeDept.name}
              </h2>
            </div>

            <Button
              variant="danger"
              size="xs"
              onClick={() => setDeleteTarget({ type: 'dept', id: activeDept.id, name: activeDept.name })}
              icon={Trash2}
              className="bg-transparent text-gray-400 hover:text-red-600 border-transparent hover:bg-red-50 dark:hover:bg-red-950/20 w-fit"
            >
              Delete Department
            </Button>
          </div>
        </Card>
      )}

      {/* Courses Accordion List */}
      <div className="space-y-4">
        {activeDept?.courses.length === 0 ? (
          <Card className="p-8 text-center text-gray-400 text-xs">
            No courses in this department yet. Click "Add Degree Course" above to create one.
          </Card>
        ) : (
          activeDept?.courses.map((course) => {
            const isExpanded = expandedCourse === course.id;

            return (
              <Card key={course.id} className="p-0 overflow-hidden space-y-0">
                {/* Course Header Bar */}
                <div
                  onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                          [{course.code}]
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                          {course.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Duration: {course.duration} • {course.semesters} Semesters Curriculum
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => {
                        setExpandedCourse(course.id);
                        setIsAddSubjectOpen(true);
                      }}
                      icon={Plus}
                      className="text-xs"
                    >
                      Add Subject
                    </Button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'course', id: course.id, name: course.name })}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Subjects Content */}
                {isExpanded && (
                  <div className="p-5 bg-gray-50/60 dark:bg-gray-950/40 border-t border-gray-100 dark:border-gray-800 space-y-5">
                    {Object.entries(course.subjects || {}).map(([semName, subjects]) => (
                      <div key={semName} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-purple-500" />
                            <span>{semName}</span>
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {subjects.length} Subjects
                          </span>
                        </div>

                        {subjects.length === 0 ? (
                          <p className="text-xs text-gray-400 italic pl-5">
                            No subjects registered for this semester.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {subjects.map((sub) => (
                              <div
                                key={sub.id}
                                className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 flex items-center justify-between text-xs"
                              >
                                <div className="truncate pr-2">
                                  <span className="font-mono text-[10px] font-bold text-blue-600 block">
                                    {sub.code}
                                  </span>
                                  <span className="font-semibold text-gray-800 dark:text-gray-200 truncate block">
                                    {sub.name}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Add Department Modal */}
      <Modal
        isOpen={isAddDeptOpen}
        onClose={() => setIsAddDeptOpen(false)}
        title="Add Academic Department"
      >
        <form onSubmit={handleAddDept} className="space-y-4">
          <Input
            label="Department Name"
            placeholder="e.g. Information Technology"
            value={newDept.name}
            onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
            required
          />
          <Input
            label="Department Code"
            placeholder="e.g. IT"
            value={newDept.code}
            onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsAddDeptOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700">
              Create Department
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Course Modal */}
      <Modal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        title={`Add Degree Course to ${activeDept?.name}`}
      >
        <form onSubmit={handleAddCourse} className="space-y-4">
          <Input
            label="Course Full Title"
            placeholder="e.g. Bachelor of Science in Information Technology"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Course Short Code"
              placeholder="e.g. BSc IT"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              required
            />
            <Input
              label="Program Duration"
              placeholder="e.g. 3 Years"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsAddCourseOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700">
              Create Course
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Subject Modal */}
      <Modal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        title="Add Subject to Curriculum"
      >
        <form onSubmit={handleAddSubject} className="space-y-4">
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
            value={newSubject.semester}
            onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
            required
          />
          <Input
            label="Subject Name"
            placeholder="e.g. Design & Analysis of Algorithms"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            required
          />
          <Input
            label="Subject Code"
            placeholder="e.g. BCA506"
            value={newSubject.code}
            onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsAddSubjectOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700">
              Save Subject
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteItem}
        title={`Delete ${deleteTarget?.type === 'dept' ? 'Department' : 'Course'}`}
        message={`Are you sure you want to delete "${deleteTarget?.name}"? All associated courses and materials will be affected.`}
      />
    </div>
  );
}
