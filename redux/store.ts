import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter.slice";
import customersSlice from "./slices/customers.slice";
import summarySlice from "./slices/summary.slice";
import ticketsSlice from "./slices/tickets.slice";
import transactionsSlice from "./slices/transactions.slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    customers: customersSlice,
    summary: summarySlice,
    tickets: ticketsSlice,
    transactions: transactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
