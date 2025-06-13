import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice.tsx";
import userSlice from "./slices/userSlice.tsx";
import supplySlice from "./slices/supplySlice.tsx";

export const store = configureStore({
  reducer: {
    count: counterSlice,
    user: userSlice,
    supply: supplySlice,
  },
});
