import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    fluid?: boolean;
}>;

function Container({ children, fluid = false }: Props) {
    return (
        <div className="flex">
            <div className={`mx-auto px-4 w-full ${fluid ? "" : "max-w-7xl"}`}>{children}</div>
        </div>
    );
}

export default Container;
