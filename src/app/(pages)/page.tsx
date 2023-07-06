"use client";
import service from "@/appwrite/config";
import { Container, ProjectCard } from "@/components";
import { addProjects } from "@/state/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";

export default function Home() {
    const dispatch = useAppDispatch();
    const { documents: projects } = useAppSelector((state) => state.projects);

    useEffect(() => {
        service.getProjectList().then((projects) => {
            if (projects) dispatch(addProjects(projects.documents));
        });
    }, [dispatch]);

    return (
        <Container>
            <div className="flex flex-wrap -mx-2 gap-y-4">
                {projects.map((project) => (
                    <div key={project.$id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </Container>
    );
}
