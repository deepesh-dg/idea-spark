"use client";
import { useAppSelector } from "@/state/store";
import { useRouter } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const authStatus = useAppSelector((state) => state.auth.status);

    if (authStatus) {
        router.replace("/");
        return null;
    }

    return <>{children}</>;
};

export default AuthLayout;
