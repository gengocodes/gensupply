import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice.tsx";
import userSlice from "./slices/userSlice.tsx";

export const store = configureStore({
  reducer: {
    count: counterSlice,
    user: userSlice,
  },
});
