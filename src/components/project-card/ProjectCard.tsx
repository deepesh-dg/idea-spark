import service from "@/appwrite/config";
import { ProjectDocument } from "@/types";
import React from "react";

function ProjectCard({ project }: { project: ProjectDocument }) {
    return (
        <div className="relative w-full p-4 border border-white/20 bg-white/5 rounded-lg">
            <div className="w-full pt-[75%] relative overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center">
                    <img src={service.getFilePreview(project.thumbnail)} alt={project.name} />
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
