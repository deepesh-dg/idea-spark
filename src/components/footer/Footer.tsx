import React from "react";
import { Container, Logo } from "..";
import Link from "next/link";

function Footer() {
    const data = [
        {
            heading: "For Designers",
            childrens: [
                {
                    name: "Go Pro!",
                    href: "go-pro",
                },
                {
                    name: "Explore design work",
                    href: "explore",
                },
                {
                    name: "Design blog",
                    href: "blog",
                },
                {
                    name: "Overtime podcase",
                    href: "podcast",
                },
                {
                    name: "Playoffs",
                    href: "playoffs",
                },
                {
                    name: "Code of conduct",
                    href: "code-of-conduct",
                },
            ],
        },
        {
            heading: "Hire Designers",
            childrens: [
                {
                    name: "Post a job opening",
                    href: "go-pro",
                },
                {
                    name: "Post a freelance project",
                    href: "explore",
                },
                {
                    name: "Search for designers",
                    href: "blog",
                },
            ],
        },
        {
            heading: "Company",
            childrens: [
                {
                    name: "About",
                    href: "go-pro",
                },
                {
                    name: "Careers",
                    href: "explore",
                },
                {
                    name: "Support",
                    href: "blog",
                },
                {
                    name: "Media kit",
                    href: "media kit",
                },
                {
                    name: "Testimonials",
                    href: "media kit",
                },
                {
                    name: "API",
                    href: "media kit",
                },
                {
                    name: "Terms of service",
                    href: "media kit",
                },
            ],
        },
        {
            heading: "Directories",
            childrens: [
                {
                    name: "Design jobs",
                    href: "go-pro",
                },
                {
                    name: "Designers for hire",
                    href: "explore",
                },
                {
                    name: "Tags",
                    href: "blog",
                },
                {
                    name: "Places",
                    href: "media kit",
                },
            ],
        },
    ];
    return (
        <footer id="footer" className="bg-lightenDark py-12">
            <Container>
                <div className="flex flex-wrap gap-y-6 -mx-2">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2">
                        <div className="w-[160px] mb-3">
                            <Logo />
                        </div>
                        <p className="text-sm mb-3">
                            IdeaSpark is the world&apos;s leading community for creatives to share, grow, and get hired.
                        </p>
                    </div>
                    {data.map((parentItem) => (
                        <div key={parentItem.heading} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2">
                            <h2 className="w-[160px] mb-3 font-bold text-xl">{parentItem.heading}</h2>
                            <ul className="flex flex-wrap gap-y-1.5">
                                {parentItem.childrens.map((item) => (
                                    <li key={item.name} className="w-full">
                                        <Link
                                            className="inline=block w-full px-0.5 duration-150 hover:bg-primary"
                                            href={"/" + item.href}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="mt-12 border-t border-white/20 pt-4 text-center">
                    &copy;&nbsp;{new Date().getFullYear()} IdeaSpark. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;
