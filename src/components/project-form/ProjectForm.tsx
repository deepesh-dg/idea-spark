"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Button, ImgDragDrop, Input, Loader, Select, Textarea } from "..";
import conf from "@/conf/conf";
import service from "@/appwrite/config";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { addProjects } from "@/state/projectsSlice";

function ProjectForm() {
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

    const addProject = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoader(true);
            setErr(null);

            if (authStatus && userData) {
                const project = await service.createProject({ ...form, userId: userData.$id, likes: [] });

                if (project) {
                    setForm(formInitialValue);
                    dispatch(addProjects([project]));
                } else {
                    setErr("Error adding project");
                }
            } else {
                setErr("User not logged in");
            }

            setLoader(false);
        },
        [form, formInitialValue, authStatus, userData, dispatch]
    );

    return (
        <div className={`relative h-full bg-dark p-4 border border-white/20 overflow-auto`}>
            <Loader show={loader} />
            <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
            {err && (
                <p className="text-red-600 border mt-2 mb-4 py-2 rounded-lg border-white/20 text-center">
                    Error : {err}
                </p>
            )}
            <form className="w-full" onSubmit={addProject}>
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
                <Button type="submit" value="Add Project" className="w-full" />
            </form>
        </div>
    );
}

export default ProjectForm;
