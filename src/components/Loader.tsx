import React from "react";

type Props = {
    show?: boolean;
    className?: string;
};

function Loader({ show = true, className = "" }: Props) {
    return show ? <div className={`absolute inset-0 bg-white/20 ${className}`}>Loader</div> : null;
}

export default Loader;
