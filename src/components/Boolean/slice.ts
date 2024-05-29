import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface BooleanState {
  selectedOption: string | null;
}

const initialState: BooleanState = {
  selectedOption: null,
};

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<string | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { setSelectedOption } = booleanSlice.actions;

export const selectBooleanSlice = (state: RootState) => state.booleanSlice;

export default booleanSlice.reducer;
