"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    className?: string;
    placeholder?: string;
    onChange?: (file: File) => void;
    onError?: (err: string) => void;
};

function ImgDragDrop({ onChange, onError, placeholder = "Drag and Drop Files", className = "" }: Props) {
    const [file, setFile] = useState<{ src: string; file: File } | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    const isImg = (fileType: string) => {
        const is = fileType.includes("image") || false;

        if (!is && onError) onError("Please select image");

        return is;
    };

    const fileSelect = (file: File) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setFile((prev) => (prev ? { ...prev, src: reader.result as string } : null));
        });
        reader.readAsDataURL(file);
        setFile({ src: "", file: file });
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const { files } = event.dataTransfer;
        if (files.length > 0 && isImg(files[0].type)) {
            fileSelect(files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (onChange && file) onChange(file.file);
    }, [file, onChange]);

    return (
        <div
            className={`min-h-[100px] w-full flex flex-wrap items-center justify-center bg-white/10 rounded-lg cursor-pointer ${className}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInput.current?.click()}
        >
            <input
                type="file"
                ref={fileInput}
                className="hidden"
                onChange={(e) => {
                    const { files } = e.target;
                    if (files && files.length > 0 && isImg(files[0].type)) {
                        fileSelect(files[0]);
                    }
                }}
            />
            {file ? (
                <div className="w-full border border-white/20">
                    <img src={file.src} alt={file.file.name} />
                </div>
            ) : (
                placeholder
            )}
        </div>
    );
}

export default ImgDragDrop;
