"use client";
import service from "@/appwrite/config";
import { Avatar, LargeLikeButton, ProjectCard } from "@/components";
import conf from "@/conf/conf";
import { updateProject } from "@/state/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { ProjectDocument, ProjectDocuments, User } from "@/types";
import { faCode, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Query } from "appwrite";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectDocument | null>(null);
    const [authorProjects, setAuthorProjects] = useState<ProjectDocuments | null>(null);
    const [author, setAuthor] = useState<User | null>(null);
    const projects = useAppSelector((state) => state.projects.documents);
    const { userData } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (author) {
            service.getProjectList([Query.equal("userId", author.id), Query.limit(4)]).then(setAuthorProjects);
        }
    }, [author]);

    useEffect(() => {
        if (userData) {
            service.views(id, userData.$id).then((newProj) => {
                if (newProj) dispatch(updateProject(newProj));
            });
        }
    }, [userData, id]);

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
            <div className="relative flex flex-wrap justify-between my-8 gap-y-4">
                <div className="w-full sm:w-1/2 flex gap-x-3 items-center">
                    <div className="w-10">
                        <Avatar text={author.name[0]} />
                    </div>
                    <div className="block leading-4">
                        <p className="font-bold">{author.name}</p>
                        <div className="flex items-center gap-x-3">
                            <p className="text-white/80 text-sm">{author.username}</p>
                            &middot;
                            {conf.projectCategories[0].toLowerCase() !== project.category.toLowerCase() && (
                                <Link
                                    href={{
                                        pathname: "/",
                                        query: {
                                            category: project.category,
                                        },
                                    }}
                                    className="capitalize text-primary hover:underline"
                                >
                                    {project.category}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 flex sm:justify-end">
                    <LargeLikeButton
                        likesCount={project.likes.length}
                        projectId={project.$id}
                        liked={Boolean(userData && project.likes.includes(userData.$id))}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center mb-8">
                <Link href={service.getFilePreview(project.thumbnail)} target="_blank">
                    <img src={service.getFilePreview(project.thumbnail)} alt={project.name} className="rounded-xl" />
                </Link>
            </div>
            <div className="flex justify-center gap-x-6 mb-8">
                {project.websiteUrl && (
                    <Link className="text-primary hover:underline" href={project.websiteUrl} target="_blank">
                        <FontAwesomeIcon icon={faLink} /> Live Website
                    </Link>
                )}
                {project.github && (
                    <Link className="text-primary hover:underline" href={project.github} target="_blank">
                        <FontAwesomeIcon icon={faCode} /> Source Code
                    </Link>
                )}
            </div>
            <p className="mb-8">{project.description}</p>
            <div className="relative flex justify-center before:absolute before:top-1/2 before:inset-x-0 before:-translate-y-1/2 before:h-[2px] before:bg-white/20 before:-z-[1] z-[1]">
                <div className="w-28 rounded-full border-[32px] border-lightenDark bg-lightenDark">
                    <Avatar text={author.name[0]} />
                </div>
            </div>
            <h3 className="text-2xl mb-12 text-center">{author.name}</h3>
            <div className="flex flex-wrap gap-4">
                <h2 className="w-full font-bold text-2xl">
                    More By <span className="bg-primary/80 inline-block px-1 rounded-md">{author.name}</span>
                </h2>
                {authorProjects?.documents.map((project) => {
                    return (
                        project.$id !== id && (
                            <div key={project.$id} className="w-full md:w-1/2 px-2">
                                <ProjectCard project={project} bg="bg-lightenDark" />
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    ) : null;
}

export default Project;
