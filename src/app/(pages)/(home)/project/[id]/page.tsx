"use client";
import service from "@/appwrite/config";
import { Container } from "@/components";
import { useAppSelector } from "@/state/store";
import { ProjectDocument, User } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectDocument | null>(null);
    const [author, setAuthor] = useState<User | null>(null);
    const projects = useAppSelector((state) => state.projects.documents);

    useEffect(() => {
        const cachedProject = projects.filter((project) => project.$id === id)[0];

        if (cachedProject) {
            setProject(cachedProject);
        } else {
            service.getProject(id).then(setProject);
        }
    }, [id, projects]);

    useEffect(() => {
        if (project) {
            service.getUser(project.userId).then(setAuthor);
        }
    }, [project]);

    return project && author ? (
        <div className="relative w-full">
            <div className="w-full justify-center">
                <img src={service.getFilePreview(project.thumbnail)} alt={project.name} className="rounded-xl" />
            </div>
        </div>
    ) : null;
}

export default Project;
