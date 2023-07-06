"use client";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    projectId: string;
}>;

function LikeProjectButton({ children, projectId }: Props) {
    return <div>LikeProjectButton</div>;
}

export default LikeProjectButton;
