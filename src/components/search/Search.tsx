"use client";
import React, { useEffect, useState } from "react";
import { Input } from "..";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Search() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState(search || "");

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("search", searchQuery);

        router.push(`${pathname}?${params}`);
    }, [searchQuery, searchParams, pathname, router]);

    return <Input setValue={(value) => setSearchQuery(value)} placeholder="Search Projects..." value={searchQuery} />;
}

export default Search;
