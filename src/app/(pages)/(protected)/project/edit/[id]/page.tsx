"use client";
import service from "@/appwrite/config";
import { Container, ProjectForm } from "@/components";
import { useAppSelector } from "@/state/store";
import { ProjectDocument } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditProject() {
    const router = useRouter();
    const { id } = useParams();
    const [project, setProject] = useState<ProjectDocument | null>(null);
    const { userData } = useAppSelector((state) => state.auth);
    const projects = useAppSelector((state) => state.projects.documents);

    useEffect(() => {
        // const cachedProject = projects.filter((project) => project.$id === id)[0];

        // if (cachedProject) {
        //     setProject(() => cachedProject);
        // } else {
        // }
        service.getProject(id).then(setProject);
    }, [id, projects]);

    useEffect(() => {
        if (project && (!userData || userData.$id !== project.userId)) {
            router.push("/");
            return;
        }
    }, [project, userData, router]);

    return (
        project && (
            <div className="py-12">
                <Container>
                    <div className="mx-auto max-w-2xl">
                        <ProjectForm className="rounded-lg" project={project} />
                    </div>
                </Container>
            </div>
        )
    );
}

export default EditProject;
