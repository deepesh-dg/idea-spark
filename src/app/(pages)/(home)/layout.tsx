"use client";
import service from "@/appwrite/config";
import { Container, ProjectCard } from "@/components";
import conf from "@/conf/conf";
import { addProjects, setProjects as setStateProjects } from "@/state/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Query } from "appwrite";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { documents: projects, total } = useAppSelector((state) => state.projects);
    const { id } = useParams();

    const query = useSearchParams();
    const category = query.get("category");

    const [page, setPage] = useState(1);
    const itemsPerPage = 1;
    const maxPage = Math.ceil(total / itemsPerPage);

    useEffect(() => {
        const query: string[] = [];

        query.push(Query.limit(itemsPerPage), Query.orderDesc("$createdAt"));

        if (category) query.push(Query.equal("category", category));
        if (page && Number(page) > 0) query.push(Query.offset(Number(page) * itemsPerPage - 1));

        service.getProjectList(query).then((projects) => {
            if (projects) {
                if (category) dispatch(setStateProjects({ total: projects.total, documents: projects.documents }));
                else dispatch(addProjects({ projects: projects.documents, total: projects.total }));
            }
        });
    }, [dispatch, category, page]);

    return (
        <div className="py-16">
            <Container>
                <ul className="flex flex-wrap gap-4 mb-4 justify-center">
                    {conf.projectCategories.map((localCategory, i) => (
                        <li key={localCategory}>
                            <Link
                                href={{ pathname: "/", query: { category: i === 0 ? "" : localCategory } }}
                                className={`inline-block px-3 py-1 rounded-md border capitalize hover:border-primary hover:bg-primary duration-150 ${
                                    localCategory === category || (i === 0 && !category)
                                        ? "border-primary bg-primary"
                                        : "border-white/10"
                                }`}
                            >
                                {i === 0 ? `All` : localCategory}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={`flex flex-wrap -mx-2 gap-y-4`}>
                    {projects.map((project) => {
                        return (
                            <div key={project.$id} className="w-full md:w-1/2 lg:w-1/3 px-2">
                                <ProjectCard project={project} />
                            </div>
                        );
                    })}
                </div>
                {page < maxPage && (
                    <div className="flex mt-6 justify-center">
                        <button
                            className="rounded-md px-3 py-1 inline-flex bg-white/10 items-center justify-center hover:bg-white/20 duration-150"
                            onClick={() => setPage((prev) => prev + itemsPerPage)}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </Container>
            {id && (
                <div className="fixed z-40 inset-0 border border-white/20 overflow-auto w-full h-full bg-lightenDark py-12 animate-popup">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <div className="flex mb-4">
                                <Link href={"/"}>
                                    <span className="inline-flex w-8 h-8 rounded-full border border-white/20 text-white/70 hover:text-white/90 hover:bg-white/10 justify-center items-center">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </span>
                                </Link>
                            </div>
                            {children}
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default HomeLayout;
