import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

const initialState = {};

const AuthSlice = createSlice({
     initialState,
     name: "auth",
     reducers: {},
});

export const useAuthSlice = () =>
     useAppSelector((state) => {
          return state.auth;
     });
export const AuthReducer = AuthSlice.reducer;
