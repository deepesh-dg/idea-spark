"use client";
import React, { useEffect, useState } from "react";
import { Container, Logo, ProjectFormSlide } from "../";
import Link from "next/link";
import { useAppSelector } from "@/state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faNavicon } from "@fortawesome/free-solid-svg-icons";

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
            <header id="header" className="sticky top-0 inset-x-0 z-40 border-b border-white/10 bg-lightenDark">
                <Container>
                    <nav className="relative flex justify-between items-center">
                        <div className="w-36">
                            <Link href={"/"}>
                                <Logo />
                            </Link>
                        </div>
                        <button className="md:hidden my-4" onClick={() => setOpen(true)}>
                            <FontAwesomeIcon icon={faNavicon} />
                        </button>
                        <ul
                            className={`md:flex md:gap-x-2 md:gap-y-4 md:flex-wrap fixed md:relative inset-0 md:inset-[unset] duration-300 bg-lightenDark z-[55] md:z-[auto] h-screen overflow-y-auto md:h-auto px-4 pb-4 pt-12 md:p-0 ${
                                open ? "translate-y-0" : "-translate-y-full md:translate-y-0"
                            }`}
                        >
                            <span
                                className="fixed top-4 right-4 rounded-full w-8 h-8 border border-white/10 hover:border-white/20 duration-150 flex justify-center items-center cursor-pointer md:hidden"
                                onClick={() => setOpen(false)}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            {navItems.map((item) => (
                                <li key={item.name} className="my-4">
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
                                    <li className="my-4">
                                        <Link
                                            href={"/profile"}
                                            className="py-1 px-3 rounded-md inline-block hover:text-primary hover:bg-white/10 duration-150 w-full border border-primary md:border-transparent"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="my-4">
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
                                    <li className="my-4">
                                        <Link
                                            href={"/login"}
                                            className="py-1 px-3 rounded-md inline-block hover:text-primary hover:bg-white/10 duration-150 w-full"
                                        >
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="my-4">
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
