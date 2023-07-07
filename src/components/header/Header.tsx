import React from "react";
import { Container, Logo, ProjectFormSlide } from "../";
import Link from "next/link";

function Header() {
    return (
        <>
            <header id="header" className="sticky top-0 inset-x-0 py-2 z-40 border-b border-white/10">
                <Container>
                    <nav className="relative flex justify-center">
                        <div className="md:absolute relative md:left-0 md:top-1/2 md:-translate-y-1/2">
                            <div className="w-36">
                                <Link href={"/"}>
                                    <Logo />
                                </Link>
                            </div>
                        </div>
                        <ul className="flex">
                            <li>
                                <Link href="/" className="py-3 inline-block hover:text-primary">
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Container>
            </header>
            <ProjectFormSlide />
        </>
    );
}

export default Header;
