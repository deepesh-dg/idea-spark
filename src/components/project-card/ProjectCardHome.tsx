"use client";
import { ProjectDocument } from "@/types";
import { useParams } from "next/navigation";
import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { Container } from "..";
import Link from "next/link";

type Props = PropsWithChildren<{
    link?: boolean;
    project: ProjectDocument;
}>;

function ProjectCardHome({ project, children, link }: Props) {
    const { id } = useParams();
    const isActive = id === project.$id;

    const card = useRef<HTMLDivElement>(null);
    const cardContainer = useRef<HTMLDivElement>(null);

    const setPositions = useCallback(() => {
        if (card.current && cardContainer.current) {
            const containerRect = cardContainer.current.getBoundingClientRect();

            if (isActive && card.current) {
                card.current.style.top =
                    card.current.style.left =
                    card.current.style.right =
                    card.current.style.bottom =
                        `0px`;
                card.current.style.width = `100%`;
                card.current.style.height = `100%`;
            } else {
                card.current.style.top = `${containerRect.top}px`;
                card.current.style.left = `${containerRect.left}px`;
                card.current.style.width = `${containerRect.width}px`;
                card.current.style.height = `${containerRect.height}px`;
                card.current.style.right = card.current.style.bottom = `unset`;
            }
        }
    }, [isActive]);

    useEffect(setPositions, [setPositions]);

    useEffect(() => {
        const handleScroll = () => {
            if (card.current) card.current.style.transition = "0ms";
            setPositions();
            if (card.current) card.current.style.transition = "300ms";
        };

        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, [setPositions]);

    return (
        <>
            <div className="w-full" ref={cardContainer}>
                <div className="opacity-0">
                    <ProjectCard project={project} link={false} />
                </div>
            </div>
            <div className={`duration-500 fixed ${isActive ? "z-40" : ""}`} ref={card}>
                <div className={`w-full duration-300 ${isActive ? "hidden" : ""}`}>
                    <ProjectCard project={project} link={link} />
                </div>
                {isActive && (
                    <div className="border border-white/20 w-full h-screen">
                        <div className="overflow-auto w-full h-full bg-lightenDark py-12">
                            <Container>
                                <div className="max-w-2xl mx-auto">
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
        </>
    );
}

export default ProjectCardHome;
