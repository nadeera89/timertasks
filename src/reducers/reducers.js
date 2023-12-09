import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addingTask: (state, action) => {
      state.push(action.payload);
      return state;
    },
  },
});

export const { addingTask } = tasksSlice.actions;
export default tasksSlice.reducer;
