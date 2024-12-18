
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';




// Define the rating interface
interface Rating {
    rate: number;
    count: number;
  }
  
  // Define the main product interface
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  

export interface CardState {
  value: number
  loading: boolean,
  error: string | boolean;
  productList: Product[],
}


const initialState: CardState = {
    value: 0,
    loading: true,
    error: false,
    productList: [],
}

// Create async thunk
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', // Action name
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data; // Return the data on success
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );


const CardReducer = createSlice({
  name: 'cardData',
  initialState,
  reducers: {
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
})


// Action creators are generated for each case reducer function
export const {  } = CardReducer.actions

export default CardReducer.reducer