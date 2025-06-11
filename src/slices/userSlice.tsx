import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  id: null,
  authenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email, id } = action.payload;
      state.name = name;
      state.email = email;
      state.id = id;
      state.authenticated = true;
    },
    updateUsername: (state, action) => {
      state.name = action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});
export const { setUser, updateUsername, logoutUser } = userSlice.actions;
export default userSlice.reducer;
