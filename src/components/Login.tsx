"use client";
import service from "@/appwrite/config";
import { useAppDispatch } from "@/state/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { login as authLogin } from "@/state/authSlice";
import { Button, Input, Logo } from ".";
import { LoginWithGoogle } from ".";

const Login = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const session = await service.login(formData);
            if (session) {
                const token = await service.getToken();
                const userData = await service.getCurrentUser();
                if (token && userData) dispatch(authLogin({ token, userData }));
                router.push("/profile");
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-lightenDark text-white rounded-xl p-10 border border-white/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[200px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-white/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        href="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={login} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            setValue={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                            label="Email : "
                            placeholder="Email Address"
                            type="email"
                            required
                        />
                        <Input
                            setValue={(value) => setFormData((prev) => ({ ...prev, password: value }))}
                            label="Password : "
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Button type="submit" value="Sign in" className="w-full" />
                        <LoginWithGoogle type="login" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
