"use client";
import service from "@/appwrite/config";
import { Container, ProjectCard } from "@/components";
import { addProjects } from "@/state/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { documents: projects } = useAppSelector((state) => state.projects);
    const { id } = useParams();

    useEffect(() => {
        service.getProjectList().then((projects) => {
            if (projects) {
                const sortedProjects = projects.documents.sort((a, b) => {
                    const prevDate = new Date(a.$createdAt);
                    const nextDate = new Date(b.$createdAt);

                    return prevDate > nextDate ? -1 : 1;
                });
                dispatch(addProjects(sortedProjects));
            }
        });
    }, [dispatch]);

    return (
        <>
            <Container>
                <div className={`flex flex-wrap -mx-2 gap-y-4`}>
                    {projects.map((project) => {
                        return (
                            <div key={project.$id} className="w-full md:w-1/2 lg:w-1/3 px-2">
                                <ProjectCard project={project} />
                            </div>
                        );
                    })}
                </div>
            </Container>
            {id && (
                <div className="fixed z-40 inset-0 border border-white/20 animate-popup">
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
                </div>
            )}
        </>
    );
}

export default HomeLayout;
