import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resources: [],
  filteredResources: [],
  selectedResource: null,
  filters: { department: '', course: '', semester: '', subject: '', category: '', sortBy: 'newest', view: 'grid', search: '' },
  loading: false,
  error: null,
};

const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setResources: (state, action) => { state.resources = action.payload; state.filteredResources = action.payload; },
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
    setSelectedResource: (state, action) => { state.selectedResource = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setResources, setFilters, setSelectedResource, setLoading, setError } = resourceSlice.actions;
export default resourceSlice.reducer;

