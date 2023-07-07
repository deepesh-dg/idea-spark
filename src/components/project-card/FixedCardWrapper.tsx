"use client";
import React, { PropsWithChildren, useRef } from "react";
import { Container, ProjectCard } from "..";
import { ProjectDocument } from "@/types";
import Link from "next/link";

type Props = PropsWithChildren<{
    open: boolean;
    top: string;
    bottom: string;
    left: string;
    right: string;
    width: string;
    height: string;
    project: ProjectDocument;
}>;

function FixedCardWrapper({ project, children, top, bottom, left, right, width, height, open }: Props) {
    const card = useRef<HTMLDivElement>(null);

    return (
        <div
            className={`duration-500 fixed z-40 ${!open ? "invisible" : ""}`}
            ref={card}
            style={{ top, bottom, left, right, width, height }}
        >
            <div className={`w-full duration-300 ${open ? "hidden" : ""}`}>
                <ProjectCard project={project} />
            </div>
            {open && (
                <div className="border border-white/20 w-full h-screen">
                    <div className="overflow-auto w-full h-full bg-lightenDark py-12">
                        <Container>
                            <div className="max-w-4xl mx-auto">
                                <div className="flex mb-4">
                                    <Link href={"/"}>
                                        <span className="inline-flex w-8 h-8 rounded-full border border-white/20 text-white/70 hover:text-white/90 hover:bg-white/10 justify-center items-center">
                                            <span className="relative -top-[1px]">&lt;</span>
                                        </span>
                                    </Link>
                                </div>
                                {children}
                            </div>
                        </Container>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FixedCardWrapper;
