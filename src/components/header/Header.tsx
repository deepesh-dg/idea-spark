"use client";
import React, { useEffect, useState } from "react";
import { Container, Logo, ProjectFormSlide } from "../";
import Link from "next/link";
import { useAppSelector } from "@/state/store";

function Header() {
    const [open, setOpen] = useState(false);

    const { status: authStatus } = useAppSelector((state) => state.auth);

    const navItems = [
        {
            name: "Home",
            href: "/",
        },
    ];

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden hidden";
        else document.body.style.overflow = "hidden auto";
    }, [open]);

    return (
        <>
            <header id="header" className="sticky top-0 inset-x-0 py-2 z-40 border-b border-white/10 bg-lightenDark">
                <Container>
                    <nav className="relative flex justify-between items-center">
                        <div className="w-36">
                            <Link href={"/"}>
                                <Logo />
                            </Link>
                        </div>
                        <button className="md:hidden" onClick={() => setOpen(true)}>
                            open
                        </button>
                        <ul
                            className={`flex gap-x-2 gap-y-4 flex-wrap fixed md:relative inset-0 md:inset-[unset] duration-300 bg-lightenDark z-[55] md:z-[auto] h-screen overflow-y-auto md:h-auto p-4 md:p-0 ${
                                open ? "translate-y-0" : "-translate-y-full md:translate-y-0"
                            }`}
                        >
                            {navItems.map((item) => (
                                <li key={item.name} className="w-full md:w-auto">
                                    <Link
                                        href={item.href}
                                        className="py-1 px-3 rounded-md inline-block hover:text-primary hover:bg-white/10 duration-150 w-full border border-primary md:border-transparent"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            {authStatus ? (
                                <>
                                    <li className="w-full md:w-auto">
                                        <Link
                                            href={"/profile"}
                                            className="py-1 px-3 rounded-md inline-block hover:text-primary hover:bg-white/10 duration-150 w-full border border-primary md:border-transparent"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="w-full md:w-auto">
                                        <Link
                                            href={"/logout"}
                                            className="py-1 px-3 rounded-md bg-primary text-white inline-block duration-150 w-full"
                                        >
                                            Log out
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="w-full md:w-auto">
                                        <Link
                                            href={"/login"}
                                            className="py-1 px-3 rounded-md inline-block hover:text-primary hover:bg-white/10 duration-150 w-full"
                                        >
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="w-full md:w-auto">
                                        <Link
                                            href={"/signup"}
                                            className="py-1 px-3 rounded-md bg-primary text-white inline-block duration-150 w-full"
                                        >
                                            Sign up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </Container>
            </header>
            <ProjectFormSlide />
        </>
    );
}

export default Header;
