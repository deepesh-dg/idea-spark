import Link from "next/link";
import React from "react";

type Props = {
    className?: string;
    variant?: "primary" | "dark";
    type?: "submit" | "reset" | "button";
    value: string;
    href?: string;
    blank?: boolean;
    [key: string]: any;
};

function Button({ value, type, href, blank = false, className = "", variant = "primary", ...props }: Props) {
    const externalLink = href && href.startsWith("http") ? true : false;
    const btnProps = {
        type,
        href,
        target: blank ? "_blank" : undefined,
        className: `rounded-lg px-4 py-2 duration-150 disabled:cursor-not-allowed `,
        ...props,
    };

    switch (variant) {
        case "dark":
            btnProps.className += "bg-dark text-white disabled:bg-dark/80 hover:bg-dark/80";
            break;
        case "primary":
        default:
            btnProps.className += "bg-primary text-white hover:bg-primary/80 disabled:bg-primary/80";
            break;
    }

    btnProps.className += " " + className;

    return href ? (
        externalLink ? (
            <a {...btnProps}>{value}</a>
        ) : (
            <Link {...btnProps} href={btnProps.href as string}>
                {value}
            </Link>
        )
    ) : (
        <button {...btnProps}>{value}</button>
    );
}

export default Button;
