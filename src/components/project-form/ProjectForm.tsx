"use client";
import React, { useCallback, useState } from "react";
import { Button, ImgDragDrop, Input, Select, Textarea } from "..";
import conf from "@/conf/conf";
import service from "@/appwrite/config";

function ProjectForm() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        thumbnail: "",
        category: "uncategorized",
        websiteUrl: "",
        github: "",
    });

    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const uploadThumbnail = useCallback(async (image: File) => {
        setLoader(true);
        setErr(null);

        const user = await service.getCurrentUser();

        if (user) {
            const bucketImage = await service.uploadFile(image);

            if (bucketImage) {
                setForm((prev) => ({ ...prev, thumbnail: bucketImage.bucketId }));
            } else {
                setErr("Error uploading thumbnail");
            }
        } else {
            setErr("User not logged in");
        }

        setLoader(false);
    }, []);

    const addProject = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoader(true);
            setErr(null);

            const user = await service.getCurrentUser();

            if (user) {
                const project = await service.createProject({ ...form, userId: user.$id, likes: [] });

                if (project) {
                } else {
                    setErr("Error adding project");
                }
            } else {
                setErr("User not logged in");
            }

            setLoader(false);
        },
        [form]
    );

    return (
        <div
            className={`relative h-full bg-dark p-4 border border-white/20 overflow-auto after:absolute after:inset-0 after:bg-white/20 ${
                loader ? "" : "after:hidden"
            }`}
        >
            <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
            {err && (
                <p className="text-red-600 border mt-2 mb-4 py-2 rounded-lg border-white/20 text-center">
                    Error : {err}
                </p>
            )}
            <form className="w-full" onSubmit={addProject}>
                <div className="w-full max-w-2xl">
                    <ImgDragDrop className="mb-4" placeholder="Upload Thumbnail" onChange={uploadThumbnail} />
                </div>
                <Input
                    setValue={(value) => setForm((prev) => ({ ...prev, name: value }))}
                    label="Name : "
                    placeholder="Project Name"
                    type="text"
                    className="mb-4"
                    required
                />
                <Textarea
                    setValue={(value) => setForm((prev) => ({ ...prev, description: value }))}
                    placeholder="Project Description"
                    className="mb-4"
                    label="Description : "
                    textareaClassName="h-40"
                    required
                />
                <Select
                    options={conf.projectCategories.map((category) => ({ name: category, value: category }))}
                    label="Select Catgory : "
                    setValue={(value) => setForm((prev) => ({ ...prev, category: value }))}
                    selectdOption={form.category}
                    className="mb-4"
                />
                <Input
                    setValue={(value) => setForm((prev) => ({ ...prev, websiteUrl: value }))}
                    label="Website : "
                    placeholder="Website URL"
                    type="url"
                    className="mb-4"
                />
                <Input
                    setValue={(value) => setForm((prev) => ({ ...prev, github: value }))}
                    label="Github : "
                    placeholder="Github URL"
                    type="url"
                    className="mb-4"
                    required
                />
                <Button type="submit" value="Add Project" className="w-full" />
            </form>
        </div>
    );
}

export default ProjectForm;
