import { createSlice } from '@reduxjs/toolkit';

const mockStudentUser = {
  id: 'u1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@college.edu',
  role: 'student',
  avatar: null,
  department: 'BCA',
  course: 'Bachelor of Computer Applications',
  semester: '5th Semester',
  rollNumber: 'BCA2022001',
  enrollmentYear: 2022,
  phone: '+91 9876543210',
};

const initialState = {
  user: mockStudentUser,
  token: 'mock-token',
  isAuthenticated: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => { state.user = action.payload; state.isAuthenticated = true; },
    setRole: (state, action) => { if (state.user) state.user.role = action.payload; },
    logout: (state) => { state.user = null; state.token = null; state.isAuthenticated = false; },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setUser, setRole, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;

