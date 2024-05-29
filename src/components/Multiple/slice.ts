import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface MultipleState {
  selectedOptions: string[];
}

const initialState: MultipleState = {
  selectedOptions: [],
};

const multipleSlice = createSlice({
  name: 'multiple',
  initialState,
  reducers: {
    setSelectedOptions: (state, action: PayloadAction<string[]>) => {
      state.selectedOptions = action.payload;
    },
  },
});

export const { setSelectedOptions } = multipleSlice.actions;

export const selectMultipleSlice = (state: RootState) => state.multipleSlice;

export default multipleSlice.reducer;
