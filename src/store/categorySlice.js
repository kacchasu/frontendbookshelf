import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await categoryService.getAllCategories();
    return response;
});

export const fetchBooksByCategoryId = createAsyncThunk('categories/fetchBooksByCategoryId', async (categoryId) => {
    const response = await categoryService.getBooksByCategoryId(categoryId);
    return response;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        booksByCategory: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchBooksByCategoryId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBooksByCategoryId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booksByCategory = action.payload;
            })
            .addCase(fetchBooksByCategoryId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
