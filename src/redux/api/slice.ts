import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Question, Status, ApiSliceState } from './types';

const API_ENDPOINT = 'https://opentdb.com/api.php?amount=10&category=9';

export const fetchQuestions = createAsyncThunk('api/fetchQuestions', async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data.results.map((question: any) => ({
    question: question.question,
    correct_answer: question.correct_answer,
    incorrect_answers: question.incorrect_answers,
    type: question.type,
    difficulty: question.difficulty,
  }));
});

const initialState: ApiSliceState = {
  items: [],
  status: Status.LOADING,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Question[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = apiSlice.actions;
export const selectApiSlice = (state: RootState) => state.apiSlice;

export default apiSlice.reducer;
