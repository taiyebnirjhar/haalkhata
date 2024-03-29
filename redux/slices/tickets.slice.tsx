// ticketSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.TicketID !== action.payload
      );
    },
    updateTicket: (state, action) => {
      state.tickets = state.tickets.map((ticket) =>
        ticket.TicketID === action.payload.TicketID ? action.payload : ticket
      );
    },
  },
});

export const { addTicket, deleteTicket, updateTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
