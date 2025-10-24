import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const getDiscount = createAsyncThunk(
  "discount/getDiscount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/discount-pills/`,{
        headers: {
          'Content-Type': 'application/json',
          Accept :'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discount: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDiscount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.discount = action.payload;
      })
      .addCase(getDiscount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default discountSlice.reducer;