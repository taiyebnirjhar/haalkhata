import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionProps {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  time: string;
}

interface TransactionsState {
  transactionList: TransactionProps[];
}

const initialState: TransactionsState = {
  transactionList: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionProps>) => {
      state.transactionList.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<TransactionProps>) => {
      const updatedTransaction = action.payload;
      const index = state.transactionList.findIndex(
        (transaction) => transaction.id === updatedTransaction.id
      );
      if (index !== -1) {
        state.transactionList[index] = updatedTransaction;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.transactionList.findIndex(
        (transaction) => transaction.id === id
      );
      if (index !== -1) {
        state.transactionList.splice(index, 1);
      }
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
