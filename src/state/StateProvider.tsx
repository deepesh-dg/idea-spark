"use client";
import React from "react";
import { Provider as _Provider } from "react-redux";
import { store } from "./store";

function StateProvider({ children }: { children: React.ReactNode }) {
    return <_Provider store={store}>{children}</_Provider>;
}

export default StateProvider;
