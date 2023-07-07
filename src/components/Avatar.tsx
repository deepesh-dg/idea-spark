import React from "react";

type Props = {
    img?: string;
    alt?: string;
    text?: string;
};

function Avatar({ img, alt, text }: Props) {
    return (
        <div className="rounded-full overflow-hidden w-full pt-[100%] relative bg-primary/50 text-white">
            {img && (
                <div className="absolute inset-0">
                    <img src={img} alt={alt || img} />
                </div>
            )}
            {text && !img && <span className="absolute inset-0 inline-flex justify-center items-center">{text}</span>}
        </div>
    );
}

export default Avatar;
