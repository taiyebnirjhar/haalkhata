import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CustomerDataProps {
  customer_info: CustomerProps;
  transaction_list: CustomerTransactionProps[];
}
export interface CustomerProps {
  id: string;
  name: string;
  phone?: string;
  due_balance?: number;
  current_balance?: number;
}

export interface CustomerTransactionProps {
  id: string;
  sale_or_return_amount?: number;
  payment_amount?: number;
  description?: string;
  date: Date;
}

interface CustomerState {
  customerList: CustomerDataProps[];
}

const initialState: CustomerState = {
  customerList: [],
};

const updateBalances = (
  customer: CustomerDataProps,
  transaction: CustomerTransactionProps
) => {
  const { sale_or_return_amount, payment_amount } = transaction;
  if (sale_or_return_amount) {
    customer.customer_info.current_balance -= sale_or_return_amount;
  }
  if (payment_amount) {
    customer.customer_info.current_balance += payment_amount;
  }
  customer.customer_info.due_balance = customer.customer_info.current_balance;
};

export const calculateTransactionTotals = (
  transactions: CustomerTransactionProps[]
) => {
  let totalSaleReturn = 0;
  let totalPayment = 0;

  transactions.forEach((transaction) => {
    if (transaction.sale_or_return_amount) {
      totalSaleReturn += transaction.sale_or_return_amount;
    }
    if (transaction.payment_amount) {
      totalPayment += transaction.payment_amount;
    }
  });

  return { totalSaleReturn, totalPayment };
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<CustomerProps>) => {
      const newCustomer: CustomerDataProps = {
        customer_info: action.payload,
        transaction_list: [],
      };
      state.customerList.push(newCustomer);
    },
    updateCustomerInfo: (
      state,
      action: PayloadAction<{
        id: string;
        updatedCustomer: Partial<CustomerProps>;
      }>
    ) => {
      const { id, updatedCustomer } = action.payload;
      const customerIndex = state.customerList.findIndex(
        (customer) => customer.customer_info.id === id
      );
      if (customerIndex !== -1) {
        state.customerList[customerIndex].customer_info = {
          ...state.customerList[customerIndex].customer_info,
          ...updatedCustomer,
        };
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.customerList.findIndex(
        (customer) => customer.customer_info.id === id
      );
      if (index !== -1) {
        state.customerList.splice(index, 1);
      }
    },
    addCustomerTransaction: (
      state,
      action: PayloadAction<{
        customerId: string;
        newTransaction: CustomerTransactionProps;
      }>
    ) => {
      const { customerId, newTransaction } = action.payload;
      const customerIndex = state.customerList.findIndex(
        (customer) => customer.customer_info.id === customerId
      );
      if (customerIndex !== -1) {
        state.customerList[customerIndex].transaction_list.push(newTransaction);
        updateBalances(state.customerList[customerIndex], newTransaction);
      }
    },
    updateCustomerTransactions: (
      state,
      action: PayloadAction<{
        id: string;
        updatedTransactions: CustomerTransactionProps[];
      }>
    ) => {
      const { id, updatedTransactions } = action.payload;
      const customerIndex = state.customerList.findIndex(
        (customer) => customer.customer_info.id === id
      );
      if (customerIndex !== -1) {
        state.customerList[customerIndex].transaction_list =
          updatedTransactions;

        updatedTransactions.forEach((transaction) => {
          updateBalances(state.customerList[customerIndex], transaction);
        });
      }
    },
    deleteCustomerTransaction: (
      state,
      action: PayloadAction<{ customerId: string; transactionId: string }>
    ) => {
      const { customerId, transactionId } = action.payload;
      const customerIndex = state.customerList.findIndex(
        (customer) => customer.customer_info.id === customerId
      );
      if (customerIndex !== -1) {
        const transactionIndex = state.customerList[
          customerIndex
        ].transaction_list.findIndex(
          (transaction) => transaction.id === transactionId
        );
        if (transactionIndex !== -1) {
          const deletedTransaction =
            state.customerList[customerIndex].transaction_list[
              transactionIndex
            ];
          state.customerList[customerIndex].transaction_list.splice(
            transactionIndex,
            1
          );
          updateBalances(state.customerList[customerIndex], deletedTransaction);
        }
      }
    },
  },
});

export const {
  addCustomer,
  updateCustomerInfo,
  deleteCustomer,
  addCustomerTransaction,
  updateCustomerTransactions,
  deleteCustomerTransaction,
} = customerSlice.actions;

export default customerSlice.reducer;
