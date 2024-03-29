import { createSlice } from "@reduxjs/toolkit";

const summarySlice = createSlice({
  name: "summary",
  initialState: {
    summaryData: [
      {
        Date: "2024-03-27",
        DailySales: 155.75,
      },
    ],
  },
  reducers: {
    // Add reducer functions here to update the summaryData state
    addSummary: (state, action) => {
      state.summaryData.push(action.payload);
    },
    updateSummary: (state, action) => {
      const { Date, DailySales } = action.payload;
      const existingSummary = state.summaryData.find(
        (summary) => summary.Date === Date
      );
      if (existingSummary) {
        existingSummary.DailySales = DailySales;
      } else {
        state.summaryData.push({ Date, DailySales });
      }
    },
    removeSummary: (state, action) => {
      const { Date } = action.payload;
      state.summaryData = state.summaryData.filter(
        (summary) => summary.Date !== Date
      );
    },
  },
});

export const { addSummary, updateSummary, removeSummary } =
  summarySlice.actions;

export default summarySlice.reducer;
