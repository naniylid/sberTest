import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface TestState {
  step: number;
  correct: number;
  questions: any[];
  selectedAnswers: string[];
}

const initialState: TestState = {
  step: 0,
  correct: 0,
  questions: [],
  selectedAnswers: [],
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setCorrect: (state, action: PayloadAction<number>) => {
      state.correct = action.payload;
    },
    setQuestions: (state, action: PayloadAction<any[]>) => {
      state.questions = action.payload;
    },
    setSelectedAnswers(state, action: PayloadAction<string[]>) {
      state.selectedAnswers = action.payload;
    },
  },
});

export const { setStep, setCorrect, setQuestions, setSelectedAnswers } = testSlice.actions;

export const selectTestSlice = (state: RootState) => state.testSlice;

export default testSlice.reducer;
