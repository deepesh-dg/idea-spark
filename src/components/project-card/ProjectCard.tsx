"use client";
import service from "@/appwrite/config";
import { ProjectDocument } from "@/types";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useCallback, useRef } from "react";
import { useAppSelector } from "@/state/store";

type Props = {
    link?: boolean;
    project: ProjectDocument;
    bg?: string;
};

function ProjectCard({ project, link = true, bg = "bg-dark" }: Props) {
    const blurEl = useRef<HTMLSpanElement>(null);
    const cardContainer = useRef<HTMLDivElement>(null);

    const { userData } = useAppSelector((state) => state.auth);

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
            className={`group relative w-full p-3 border overflow-hidden border-white/10 rounded-xl ${bg}`}
            ref={cardContainer}
            onMouseMove={handleMouseMove}
        >
            <span
                className="inline-block absolute w-40 h-40 bg-white/10 blur-[100px] overflow-hidden opacity-0 z-[0] group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2"
                ref={blurEl}
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
                <p className="text-white/50 text-sm">
                    {project.description?.substring(0, 45)}
                    {project.description?.length > 45 ? "..." : ""}
                </p>
            </div>
            <div className="flex gap-x-6">
                <span className="inline-flex items-center">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={userData && project.likes.includes(userData.$id) ? "text-primary" : "text-white/40"}
                    />
                    &nbsp;{project.likes.length}
                </span>
                <span className="inline-flex items-center">
                    <FontAwesomeIcon icon={faEye} className={"text-white/40"} />
                    &nbsp;{project.views.length}
                </span>
            </div>
        </div>
    );
    return link ? <Link href={`/project/${project.$id}`}>{card}</Link> : card;
}

export default ProjectCard;
