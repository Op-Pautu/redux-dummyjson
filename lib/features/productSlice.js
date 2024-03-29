import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: {
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
    productUpdated(state, action) {
      const { id, title, description } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.title = title;
        existingProduct.description = description;
      }
    },
    productDeleted: (state, action) => {
      const idToDelete = action.payload;

      state.products = state.products.filter(
        (product) => product.id !== idToDelete
      );
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
      });
  },
});
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axiosInstance.get("/products");
    return response.data.products;
  }
);

// export const addNewProduct = createAsyncThunk(
//   "products/addNewPost",
//   // The payload creator receives the partial `{title, content, user}` object
//   async (productData) => {
//     // We send the initial data to the fake API server
//     const response = await axios.post(
//       "https://dummyjson.com/products/add",
//       productData
//     );
//     // The response includes the complete post object, including unique ID
//     return response.data;
//   }
// );

export const { productAdded, productUpdated, productDeleted } =
  productSlice.actions;

export default productSlice.reducer;
