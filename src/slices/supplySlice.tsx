import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  count: 0,
  user_id: 0,
};

const supplySlice = createSlice({
  name: "supply",
  initialState,
  reducers: {
    setNewSupply: (state, action) => {
      const { id, name, count, user_id } = action.payload;
      state.name = name;
      state.count = count;
      state.id = id;
      state.user_id = user_id;
    },
    clearSupply: () => {
      return initialState;
    },
  },
});

export const { setNewSupply, clearSupply } = supplySlice.actions;
export default supplySlice.reducer;
