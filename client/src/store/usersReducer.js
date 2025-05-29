import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  usersDate: null,
  isRefresh: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchDataPending: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state) => {
      state.loading = false;
    },
    setUsersDate: (state, action) => {
      state.usersDate = action.payload;
    },
    refresh: (state) => {
      state.isRefresh = !state.isRefresh;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchDataPending, fetchDataSuccess, setUsersDate,refresh } =
  userSlice.actions;

export default userSlice.reducer;
