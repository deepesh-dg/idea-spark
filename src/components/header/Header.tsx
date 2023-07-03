import React from "react";
import { Container, Logo } from "../";
import Link from "next/link";

function Header() {
    return (
        <header id="header" className="sticky top-0 inset-x-0 py-2">
            <Container>
                <nav className="relative flex justify-center">
                    <div className="md:absolute relative md:left-0 md:top-1/2 md:-translate-y-1/2">
                        <Logo />
                    </div>
                    <ul className="flex">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
