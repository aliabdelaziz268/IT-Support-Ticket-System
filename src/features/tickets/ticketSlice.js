import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';

export const createTicket = createAsyncThunk('tickets/createTicket', async (ticketData) => {
    const docRef = await addDoc(collection(db, 'tickets'), {
        ...ticketData,
        status: 'Open',
        createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...ticketData, status: 'Open', createdAt: new Date().toISOString() };
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
    const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const tickets = [];
    querySnapshot.forEach((doc) => {
        tickets.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate().toISOString() });
    });
    return tickets;
});

export const updateTicketStatus = createAsyncThunk('tickets/updateTicketStatus', async ({ id, status }) => {
    const ticketRef = doc(db, 'tickets', id);
    await updateDoc(ticketRef, { status });
    return { id, status };
});

const ticketSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Ticket
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets.unshift(action.payload);
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Tickets
            .addCase(fetchTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update Status
            .addCase(updateTicketStatus.fulfilled, (state, action) => {
                const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
                if (index !== -1) {
                    state.tickets[index].status = action.payload.status;
                }
            });
    },
});

export default ticketSlice.reducer;
