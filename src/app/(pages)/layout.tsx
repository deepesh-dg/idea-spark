"use client";
import React, { useEffect, useState } from "react";
import { login, logout } from "@/state/authSlice";
import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/state/store";

function PageLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await authService.isLoggedIn();

            if (authStatus) {
                const token = await authService.getToken();
                const userData = await authService.getCurrentUser();

                if (token && userData) {
                    dispatch(login({ token, userData }));
                }
            } else dispatch(logout());

            setLoading(false);
        };

        checkAuth();
    }, [dispatch]);

    return loading ? <></> : <>{children}</>;
}

export default PageLayout;
