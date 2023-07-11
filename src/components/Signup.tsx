"use client";
import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/state/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { login } from "@/state/authSlice";
import { Button, Input, LoginWithGoogle, Logo } from ".";

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const dispatch = useAppDispatch();

    const create = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userData = await authService.createAccount(formData);
            if (userData) {
                const token = await authService.getToken();
                const userData = await authService.getCurrentUser();
                if (token && userData) dispatch(login({ token, userData }));
                router.push("/profile");
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-lightenDark text-white rounded-xl p-10 border border-white/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[200px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-white/60">
                    Already have an account?&nbsp;
                    <Link
                        href="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={create} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            setValue={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                            label="Full Name : "
                            placeholder="Full Name"
                            required
                        />
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
                        <Button type="submit" value="Create Account" className="w-full" />
                        <LoginWithGoogle type="signup" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
