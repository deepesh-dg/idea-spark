import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import projectsSlice from "./projectsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        projects: projectsSlice,
    },
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
