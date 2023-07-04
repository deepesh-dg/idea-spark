"use client";
import React, { useEffect, useRef, useState } from "react";
import { ProjectForm } from "..";

// function ProjectFormSlide() {
//     const [open, setOpen] = useState(false);
//     const [translate, setTranslate] = useState(0);

//     const buttonRef = useRef<HTMLButtonElement>(null);
//     const formRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const button = buttonRef.current;
//         let draggable = false;
//         let mouseStartPos = 0;
//         let translate = 0;
//         const maxWidth = formRef.current?.clientWidth || 0;

//         const mouseDownHandler = (e: MouseEvent) => {
//             draggable = true;
//             mouseStartPos = e.clientX;
//         };

//         const mouseMoveHandler = (e: MouseEvent) => {
//             if (draggable) {
//                 if (translate <= maxWidth) {
//                     translate = mouseStartPos - e.clientX;
//                     setTranslate(translate);
//                 }
//             }
//         };

//         const mouseUpHandler = (e: MouseEvent) => {
//             if (draggable) {
//                 draggable = false;
//                 mouseStartPos = 0;
//                 if (translate < maxWidth / 2) {
//                     translate = 0;
//                     setTranslate(0);
//                     setOpen(false);
//                 } else if (translate > maxWidth) {
//                     translate = maxWidth;
//                     setTranslate(maxWidth);
//                     setOpen(true);
//                 }
//             }
//         };

//         button?.addEventListener("mousedown", mouseDownHandler);
//         document.addEventListener("mousemove", mouseMoveHandler);
//         document.addEventListener("mouseup", mouseUpHandler);

//         return () => {
//             button?.removeEventListener("mousedown", mouseDownHandler);
//             document.removeEventListener("mousemove", mouseMoveHandler);
//             document.removeEventListener("mouseup", mouseUpHandler);
//         };
//     }, []);

//     return (
//         <div
//             className="fixed z-50 inset-y-0 right-0 duration-150"
//             style={{ transform: `translateX(-${open ? formRef.current?.clientWidth || 0 : translate}px)` }}
//         >
//             <button
//                 className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 inline-flex w-16 h-16 pl-3 justify-start items-center bg-primary rounded-full text-2xl hover:shadow shadow-primary"
//                 ref={buttonRef}
//                 onClick={() => setOpen((prev) => !prev)}
//             >
//                 {open ? "-" : "+"}
//             </button>
//             <div className="absolute inset-y-0 left-0">
//                 <div className="w-full h-full" ref={formRef}>
//                     <ProjectForm />
//                 </div>
//             </div>
//         </div>
//     );
// }

function ProjectFormSlide() {
    const [open, setOpen] = useState(false);
    const [initialRender, setInitialRender] = useState(true);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInitialRender(false);
    }, []);

    return (
        <div
            className="fixed inset-y-0 right-0 duration-150 flex items-center w-full max-w-2xl"
            style={{
                transform: `translateX(${
                    initialRender ? "100%" : `${open ? 0 : formRef.current?.clientWidth || 0}px`
                })`,
            }}
        >
            <button
                className="inline-flex w-16 h-16 pl-3 justify-start items-center bg-primary rounded-full text-2xl hover:shadow shadow-primary shrink-0 translate-x-1/2"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
            >
                {open ? "-" : "+"}
            </button>
            <div className="relative w-full h-full z-[1]" ref={formRef} onClick={(e) => e.stopPropagation()}>
                <ProjectForm />
            </div>
        </div>
    );
}

export default ProjectFormSlide;
