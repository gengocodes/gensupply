import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice.tsx";

export const store = configureStore({
  reducer: {
    count: counterSlice,
  },
});
