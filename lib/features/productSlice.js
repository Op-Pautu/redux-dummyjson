import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.products.push(action.payload);
      },
      prepare(title, description) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.products.push(action.payload);
      });
  },
});
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewPost",
  // The payload creator receives the partial `{title, content, user}` object
  async (productData) => {
    // We send the initial data to the fake API server
    const response = await axios.post(
      "https://dummyjson.com/products/add",
      productData
    );
    // The response includes the complete post object, including unique ID
    return response.data;
  }
);

export const { addProduct, setProducts } = productSlice.actions;

export default productSlice.reducer;
