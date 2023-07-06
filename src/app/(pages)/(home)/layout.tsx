"use client";
import service from "@/appwrite/config";
import { Container, ProjectCard, ProjectCardHome } from "@/components";
import { addProjects } from "@/state/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import React, { useEffect } from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { documents: projects } = useAppSelector((state) => state.projects);

    useEffect(() => {
        service.getProjectList().then((projects) => {
            if (projects) dispatch(addProjects(projects.documents));
        });
    }, [dispatch]);

    return (
        <Container>
            <div className={`flex flex-wrap -mx-2 gap-y-4`}>
                {projects.map((project) => {
                    return (
                        <div key={project.$id} className="w-full md:w-1/2 lg:w-1/3 px-2">
                            <ProjectCardHome project={project}>{children}</ProjectCardHome>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export default HomeLayout;
