import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CoveragesState {
  activeCoverages: string[];
}

const initialState: CoveragesState = {
  activeCoverages: [],
};

const coveragesSlice = createSlice({
  name: "coverages",
  initialState,
  reducers: {
    toggleCoverage: (state, action: PayloadAction<{ coverage: string }>) => {
      const { coverage } = action.payload;
      if (!state.activeCoverages.includes(coverage)) {
        state.activeCoverages.push(coverage);
      } else {
        state.activeCoverages = state.activeCoverages.filter(
          (activeCoverage) => activeCoverage !== coverage
        );
      }
    },
    toggleMultipleCoverages: (state, action: PayloadAction<string[]>) => {
      state.activeCoverages = action.payload;
    },
    resetCoverages: () => initialState,
  },
});

export const { toggleCoverage, toggleMultipleCoverages, resetCoverages } = coveragesSlice.actions;

export default coveragesSlice.reducer;
