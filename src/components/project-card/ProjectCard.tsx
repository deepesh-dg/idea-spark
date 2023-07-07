"use client";
import service from "@/appwrite/config";
import { ProjectDocument } from "@/types";
import Link from "next/link";
import React, { useCallback, useRef } from "react";

type Props = {
    link?: boolean;
    project: ProjectDocument;
};

function ProjectCard({ project, link = true }: Props) {
    const blurEl = useRef<HTMLSpanElement>(null);
    const cardContainer = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (cardContainer.current && blurEl.current) {
            const rect = cardContainer.current.getBoundingClientRect();
            const left = e.clientX - rect.left;
            const top = e.clientY - rect.top;

            blurEl.current.style.top = `${top}px`;
            blurEl.current.style.left = `${left}px`;
        }
    }, []);

    const card = (
        <div
            className="group relative w-full p-3 border overflow-hidden border-white/10 bg-lightenDark rounded-xl"
            ref={cardContainer}
            onMouseMove={handleMouseMove}
        >
            <span
                className="inline-block absolute w-20 h-20 bg-white/10 blur-xl overflow-hidden opacity-0 z-[0] group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2"
                ref={blurEl}
                // style={{ background: "#c1ffb4" }}
            ></span>
            <div className="w-full pt-[60%] relative overflow-hidden z-[1] mb-3">
                <div className="absolute inset-0 flex justify-center items-center rounded-xl overflow-hidden">
                    <img src={service.getFilePreview(project.thumbnail)} alt={project.name} className="rounded-xl" />
                </div>
            </div>
            <div className="relative mb-2 px-1">
                <div className="absolute right-1 top-0 rotate-[135deg] text-xl group-hover:text-3xl duration-300">
                    «
                </div>
                <h2 className="text-lg">{project.name.substring(0, 40)}</h2>
                <p className="text-white/50 text-sm">{project.description?.substring(0, 50)}</p>
            </div>
        </div>
    );
    return link ? <Link href={`/project/${project.$id}`}>{card}</Link> : card;
}

export default ProjectCard;
