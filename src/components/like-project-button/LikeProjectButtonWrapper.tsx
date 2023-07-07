"use client";
import service from "@/appwrite/config";
import { updateProject } from "@/state/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    projectId: string;
}>;

function LikeProjectButtonWrapper({ children, projectId }: Props) {
    const { status: authStatus, userData } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const toggleLike = async () => {
        if (!authStatus || !userData) return;

        const updatedProject = await service.toggleLike(projectId, userData.$id);

        if (updatedProject) dispatch(updateProject(updatedProject));
    };

    return <div onClick={toggleLike}>{children}</div>;
}

export default LikeProjectButtonWrapper;
