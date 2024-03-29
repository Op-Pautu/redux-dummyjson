import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
    },
  });
};
