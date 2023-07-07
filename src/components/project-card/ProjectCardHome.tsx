"use client";
import { ProjectDocument } from "@/types";
import { useParams } from "next/navigation";
import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import FixedCardWrapper from "./FixedCardWrapper";

type Props = PropsWithChildren<{
    project: ProjectDocument;
}>;

function ProjectCardHome({ project, children }: Props) {
    const { id } = useParams();
    const [position, setPosition] = useState({
        top: "",
        bottom: "",
        left: "",
        right: "",
        width: "",
        height: "",
    });

    const isActive = id === project.$id;

    const cardContainer = useRef<HTMLDivElement>(null);

    const setPositions = useCallback(() => {
        if (cardContainer.current) {
            const containerRect = cardContainer.current.getBoundingClientRect();

            if (isActive) {
                setPosition(() => ({
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    width: "100%",
                    height: "100%",
                }));
            } else {
                setPosition(() => ({
                    top: `${containerRect.top}px`,
                    left: `${containerRect.left}px`,
                    width: `${containerRect.width}px`,
                    height: `${containerRect.height}px`,
                    bottom: `unset`,
                    right: `unset`,
                }));
            }
        }
    }, [isActive]);

    useEffect(setPositions, [setPositions]);

    return (
        <>
            <div className="w-full" ref={cardContainer}>
                <div className={isActive ? "opacity-0" : ""}>
                    <ProjectCard project={project} />
                </div>
            </div>
            <FixedCardWrapper {...position} open={id === project.$id} project={project}>
                {children}
            </FixedCardWrapper>
        </>
    );
}

export default ProjectCardHome;
