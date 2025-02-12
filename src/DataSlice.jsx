import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: [],
    totalRecords: 0,
    loading: false,
    error: null,
};

// Универсальный асинхронный action для загрузки данных
export const fetchData = createAsyncThunk(
    'data/fetchData',
    async ({endpoint, page, perPage, sortField, sortOrder}, {rejectWithValue}) => {
        try {
            const response = await axios.get(endpoint, {
                params: {
                    page,
                    per_page: perPage,
                    order_by: sortField,
                    order: sortOrder === 1 ? 'ASC' : 'DESC',
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Универсальный асинхронный action для удаления данных
export const deleteData = createAsyncThunk(
    'data/deleteData',
    async ({endpoint, id}, {rejectWithValue}) => {
        try {
            await axios.delete(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Универсальный асинхронный action для обновления данных
export const updateData = createAsyncThunk(
    'data/updateData',
    async ({endpoint, id, updatedData}, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${endpoint}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка fetchData
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.totalRecords = action.payload.meta.total_records;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Обработка deleteData
            .addCase(deleteData.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item.id !== action.payload);
            })

            // Обработка updateData
            .addCase(updateData.fulfilled, (state, action) => {
                const index = state.data.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            });
    },
});

export default dataSlice.reducer;