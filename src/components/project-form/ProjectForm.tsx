"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, ImgDragDrop, Input, Loader, Select, Textarea } from "..";
import conf from "@/conf/conf";
import service from "@/appwrite/config";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { addProjects, deleteProject } from "@/state/projectsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ProjectDocument } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
    clickCloseBtn?: () => void;
    className?: string;
    project?: ProjectDocument;
};

function ProjectForm({ project, clickCloseBtn, className = "" }: Props) {
    const formInitialValue = useMemo(
        () => ({
            name: "",
            description: "",
            thumbnail: "",
            category: "uncategorized",
            websiteUrl: "",
            github: "",
        }),
        []
    );

    const router = useRouter();

    const [form, setForm] = useState(formInitialValue);

    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const { status: authStatus, userData } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const uploadThumbnail = useCallback(
        async (image: File) => {
            setLoader(true);
            setErr(null);

            if (authStatus) {
                const bucketImage = await service.uploadFile(image);

                if (bucketImage) {
                    setForm((prev) => ({ ...prev, thumbnail: bucketImage.$id }));
                } else {
                    setErr("Error uploading thumbnail");
                }
            } else {
                setErr("User not logged in");
            }

            setLoader(false);
        },
        [authStatus]
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoader(true);
            setErr(null);

            if (authStatus && userData) {
                const resProject = project
                    ? await service.updateProject(project.$id, { ...form })
                    : await service.createProject({ ...form, userId: userData.$id, likes: [], views: [] });

                if (resProject) {
                    setForm(formInitialValue);
                    if (!project) dispatch(addProjects({ projects: [resProject] }));
                } else {
                    setErr("Error adding project");
                }
            } else {
                setErr("User not logged in");
            }

            setLoader(false);
        },
        [form, formInitialValue, authStatus, userData, dispatch, project]
    );

    const deleteProj = useCallback(async () => {
        if (project) {
            const hasDeleted = await service.deleteProject(project.$id);
            if (hasDeleted) {
                dispatch(deleteProject(project.$id));
                router.push("/");
            }
        }
    }, [project, router, dispatch]);

    useEffect(() => {
        if (project) {
            setForm({
                name: project.name,
                description: project.description,
                category: project.category,
                websiteUrl: project.websiteUrl,
                github: project.github,
                thumbnail: project.thumbnail,
            });
        }
    }, [project]);

    return (
        <div className={`relative h-full bg-dark p-4 border border-white/20 overflow-auto ${className}`}>
            <Loader show={loader} />
            <div className="relative">
                <h2 className="text-2xl font-bold mb-4">{project ? "Edit" : "Add New"} Project</h2>
                {clickCloseBtn && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                        <button
                            className="border border-white/20 hover:bg-primary duration-150 w-8 h-8 rounded-full flex justify-center items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                clickCloseBtn();
                            }}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                )}
            </div>
            {err && (
                <p className="text-red-600 border mt-2 mb-4 py-2 rounded-lg border-white/20 text-center">
                    Error : {err}
                </p>
            )}
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="w-full max-w-2xl">
                    <ImgDragDrop
                        className="mb-4"
                        placeholder="Upload a thumbnail"
                        value={form.thumbnail ? service.getFilePreview(form.thumbnail) : ""}
                        onChange={uploadThumbnail}
                        onError={setErr}
                    />
                </div>
                <Input
                    setValue={(value) => setForm((prev) => ({ ...prev, name: value }))}
                    label="Name : "
                    placeholder="Project Name"
                    type="text"
                    className="mb-4"
                    value={form.name}
                    required
                />
                <Textarea
                    setValue={(value) => setForm((prev) => ({ ...prev, description: value }))}
                    placeholder="Project Description"
                    className="mb-4"
                    label="Description : "
                    textareaClassName="h-40"
                    value={form.description}
                    required
                />
                <Select
                    options={conf.projectCategories.map((category) => ({ name: category, value: category }))}
                    label="Select Catgory : "
                    setValue={(value) => setForm((prev) => ({ ...prev, category: value }))}
                    className="mb-4"
                    value={form.category}
                />
                <Input
                    setValue={(value) => setForm((prev) => ({ ...prev, websiteUrl: value }))}
                    label="Website : "
                    placeholder="Website URL"
                    type="url"
                    className="mb-4"
                    value={form.websiteUrl}
                />
                <Input
                    setValue={(value) => setForm((prev) => ({ ...prev, github: value }))}
                    label="Github : "
                    placeholder="Github URL"
                    type="url"
                    className="mb-4"
                    value={form.github}
                    required
                />
                <div className="flex gap-x-4">
                    <Button type="submit" value={`${project ? "Update" : "Add"} Project`} className="w-full" />
                    {project && (
                        <Button
                            onClick={() => deleteProj()}
                            type="button"
                            variant="dark"
                            value="Delete Project"
                            className="w-full bg-red-900 hover:bg-red-900/80"
                        />
                    )}
                </div>
            </form>
        </div>
    );
}

export default ProjectForm;
