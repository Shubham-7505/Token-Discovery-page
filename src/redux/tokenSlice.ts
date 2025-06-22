import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortKey = 'pair' | 'price' | 'marketCap' | 'liquidity' | 'volume' | 'txns';

interface TokenState {
  sortBy: SortKey;
  sortOrder: 'asc' | 'desc';
}

const initialState: TokenState = {
  sortBy: 'marketCap',
  sortOrder: 'desc',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortKey>) {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortOrder = 'desc';
      }
    },
  },
});

export const { setSort } = tokenSlice.actions;
export default tokenSlice.reducer;
