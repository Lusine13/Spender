import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; 
import { FIRESTORE_PATH_NAMES } from '../../../core/utils/constants';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const addWalletEvent = createAsyncThunk(
  'walletEvents/addWalletEvent',
  async ({ uid, category, amount, date }, { rejectWithValue }) => {
    try {
      const userWalletEventsRef = collection(doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid), FIRESTORE_PATH_NAMES.WALLET_EVENTS);
      
      const eventData = {
        category,
        amount,
        date: date || new Date().toISOString(), 
      };   
      const docRef = await addDoc(userWalletEventsRef, eventData);     
      return { ...eventData, id: docRef.id };
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);
export const fetchWalletEvents = createAsyncThunk(
  'walletEvents/fetchWalletEvents',
  async (uid, { rejectWithValue }) => {
    try {
      const userWalletEventsRef = collection(doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid), FIRESTORE_PATH_NAMES.WALLET_EVENTS);
      const querySnapshot = await getDocs(userWalletEventsRef); 
      const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return events;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const walletEvents = createSlice({
  name: 'walletEvents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWalletEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWalletEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addWalletEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchWalletEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWalletEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchWalletEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default walletEvents.reducer;
