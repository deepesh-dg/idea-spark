"use client";
import React, { HTMLInputTypeAttribute, useId } from "react";

type Props = {
    label?: string;
    setValue: (value: string) => void;
    className?: string;
    type?: HTMLInputTypeAttribute;
    inputClassName?: string;
    placeholder?: string;
    [key: string]: any;
};

function Input({ type, setValue, label, placeholder, className = "", inputClassName = "", ...props }: Props) {
    const id = useId();

    return (
        <div className={`${className}`}>
            {label ? (
                <label htmlFor={id} className="mb-2 inline-block">
                    {label}
                </label>
            ) : null}
            <input
                type={type || "text"}
                id={id}
                onChange={(e) => setValue(e.target.value)}
                className={`bg-white/10 px-4 py-2 rounded-lg outline-none border border-transparent focus:border-primary/70 duration-150 w-full ${inputClassName}`}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}

export default Input;
