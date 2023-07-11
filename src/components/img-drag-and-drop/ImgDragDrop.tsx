"use client";
import React, { useRef, useState } from "react";

type Props = {
    value?: string;
    className?: string;
    placeholder?: string;
    onChange?: (file: File) => void;
    onError?: (err: string) => void;
};

function ImgDragDrop({ value, onChange, onError, placeholder = "Drag and Drop Files", className = "" }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    const isImg = (fileType: string) => {
        const is = fileType.includes("image") || false;

        if (!is && onError) onError("Please select image");

        return is;
    };

    const fileSelect = (file: File) => {
        if (onChange) onChange(file);
        setFile(file);
        // const reader = new FileReader();
        // reader.addEventListener("load", () => {
        //     setFile((prev) => (prev ? { ...prev, src: reader.result as string } : null));
        // });
        // reader.readAsDataURL(file);
        // setFile(() => {
        //     if (onChange) onChange(file);
        //     return { src: "", file: file };
        // });
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

    return (
        <div
            className={`min-h-[100px] w-full flex flex-wrap items-center justify-center bg-white/10 rounded-lg cursor-pointer border border-white/20 border-dashed hover:bg-white/[0.15] duration-150 ${className}`}
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
            {value ? (
                <div className="w-full border border-white/20 flex items-center justify-center">
                    <img src={value} alt={file?.name} />
                </div>
            ) : (
                placeholder
            )}
        </div>
    );
}

export default ImgDragDrop;
