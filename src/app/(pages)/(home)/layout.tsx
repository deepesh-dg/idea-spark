"use client";
import service from "@/appwrite/config";
import { Button, Container, ProjectCard } from "@/components";
import conf from "@/conf/conf";
import { setProjects as setStateProjects } from "@/state/projectsSlice";
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
    const itemsPerPage = 6;
    const maxPage = Math.ceil(total / itemsPerPage);

    useEffect(() => {
        const query: string[] = [];

        query.push(Query.limit(itemsPerPage), Query.orderDesc("$createdAt"));

        if (category) query.push(Query.equal("category", category));
        if (page && Number(page) > 0) query.push(Query.offset((Number(page) - 1) * itemsPerPage));

        service.getProjectList(query).then((projects) => {
            if (projects) {
                dispatch(setStateProjects({ total: projects.total, documents: projects.documents }));
            }
        });
    }, [dispatch, category, page]);

    return (
        <div className="py-16">
            <Container>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-4 justify-center">
                    {conf.projectCategories.map((localCategory, i) => (
                        <li key={localCategory}>
                            <Link
                                href={{ pathname: "/", query: { category: i === 0 ? "" : localCategory } }}
                                className={`inline-block px-3 py-1 rounded-md border capitalize hover:border-primary hover:bg-primary duration-150 ${
                                    localCategory === category || (i === 0 && !category)
                                        ? "border-primary bg-primary"
                                        : "border-white/10 md:border-transparent"
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
                <div className="flex mt-6 justify-center gap-4">
                    {page > 1 && (
                        <Button
                            value="Prev"
                            variant="primary"
                            onClick={() => setPage((prev) => (prev <= 1 ? 1 : prev - 1))}
                            disabled={page <= 1}
                        />
                    )}
                    {page < maxPage && (
                        <Button
                            value="Next"
                            variant="primary"
                            onClick={() => setPage((prev) => (prev >= maxPage ? maxPage : prev + 1))}
                            disabled={page >= maxPage}
                        />
                    )}
                </div>
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
