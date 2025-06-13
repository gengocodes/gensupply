import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  count: 0,
  user_id: 0,
};

const supplySlice = createSlice({
  name: "supply",
  initialState,
  reducers: {
    setSupply: (state, action) => {
      const { name, count, user_id } = action.payload;
      state.name = name;
      state.count = count;
    },
  },
});

export const { setSupply } = supplySlice.actions;
export default supplySlice.reducer;
