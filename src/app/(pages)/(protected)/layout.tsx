"use client";
import { useAppSelector } from "@/state/store";
import { useRouter } from "next/navigation";
import React from "react";

const ProtectedRouteLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const authStatus = useAppSelector((state) => state.auth.status);

    if (!authStatus) {
        router.push("/login");
        return <></>;
    }

    return <>{children}</>;
};

export default ProtectedRouteLayout;
