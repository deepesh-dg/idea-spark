"use client";
import React, { useId } from "react";

type Props = {
    label?: string;
    setValue: (value: string) => void;
    className?: string;
    selectClassName?: string;
    options: { name: string; value: string }[];
    [key: string]: any;
};

function Select({ setValue, label, options, className = "", selectClassName = "", ...props }: Props) {
    const id = useId();

    return (
        <div className={`${className}`}>
            {label ? (
                <label htmlFor={id} className="mb-2 inline-block">
                    {label}
                </label>
            ) : null}
            <select
                id={id}
                className={`bg-white/10 px-4 py-2 rounded-lg outline-none w-full capitalize ${selectClassName}`}
                onChange={(e) => setValue(e.target.value)}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
