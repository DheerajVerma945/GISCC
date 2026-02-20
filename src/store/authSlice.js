import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../axios';

const TOKEN_KEY = 'admin_token';

export const loginAdmin = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/login', credentials);
    const token = res.data.token;
    localStorage.setItem(TOKEN_KEY, token);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const verifyAdmin = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/auth/verify');
    return res.data;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return rejectWithValue('Session expired');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem(TOKEN_KEY) || null,
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.admin = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending,   (state)          => { state.loading = true;  state.error = null; })
      .addCase(loginAdmin.fulfilled, (state, action)  => { state.loading = false; state.token = action.payload.token; state.admin = action.payload.admin || null; })
      .addCase(loginAdmin.rejected,  (state, action)  => { state.loading = false; state.error = action.payload; })
      .addCase(verifyAdmin.pending,   (state)          => { state.loading = true; })
      .addCase(verifyAdmin.fulfilled, (state, action)  => { state.loading = false; state.admin = action.payload; })
      .addCase(verifyAdmin.rejected,  (state)          => { state.loading = false; state.token = null; state.admin = null; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
