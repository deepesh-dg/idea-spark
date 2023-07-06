"use client";
import service from "@/appwrite/config";
import { logout } from "@/state/authSlice";
import { useAppDispatch } from "@/state/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        service.logout().then(() => {
            dispatch(logout());
            router.push("/");
        });
    }, []);

    return null;
};

export default Logout;
