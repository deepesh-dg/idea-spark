"use client";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
    maxPage?: number;
};

function Pagination({ maxPage }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page"));

    return (
        <div className="inline-flex mx-auto gap-x-4">
            <Link
                href={{
                    pathname: `${pathname}`,
                    query: {
                        page: page <= 1 ? 1 : page - 1,
                    },
                }}
                className="rounded-full inline-flex bg-white/10 w-7 h-7 items-center justify-center hover:bg-white/20 duration-150"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            {page <= 1 ? 1 : page}
            <Link
                href={{
                    pathname: `${pathname}`,
                    query: {
                        page: page <= 0 ? 2 : maxPage && page >= maxPage ? maxPage : page + 1,
                    },
                }}
                className="rounded-full inline-flex bg-white/10 w-7 h-7 items-center justify-center hover:bg-white/20 duration-150"
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    );
}

export default Pagination;
