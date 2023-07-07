import React from "react";
import LikeProjectButtonWrapper from "./LikeProjectButtonWrapper";

type Props = {
    projectId: string;
    liked?: boolean;
    likesCount?: number;
};

function LargeLikeButton({ projectId, liked = false, likesCount = 0 }: Props) {
    return (
        <LikeProjectButtonWrapper projectId={projectId}>
            <button
                className={`rounded-lg text-white px-4 py-1 border ${
                    liked ? "border-primary" : "bg-primary border-transparent"
                }`}
            >
                {liked ? likesCount : "Like"}
            </button>
        </LikeProjectButtonWrapper>
    );
}

export default LargeLikeButton;
