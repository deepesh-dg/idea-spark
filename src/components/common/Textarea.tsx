"use client";
import React, { useId } from "react";

type Props = {
    label?: string;
    setValue: (value: string) => void;
    className?: string;
    textareaClassName?: string;
    placeholder?: string;
    [key: string]: any;
};

function Textarea({ setValue, label, placeholder, className = "", textareaClassName = "", ...props }: Props) {
    const id = useId();

    return (
        <div className={`${className}`}>
            {label ? (
                <label htmlFor={id} className="mb-2 inline-block">
                    {label}
                </label>
            ) : null}
            <textarea
                id={id}
                onChange={(e) => setValue(e.target.value)}
                className={`bg-white/10 px-4 py-2 rounded-lg outline-none border border-transparent focus:border-primary/70 duration-150 w-full ${textareaClassName}`}
                placeholder={placeholder}
                {...props}
            ></textarea>
        </div>
    );
}

export default Textarea;
