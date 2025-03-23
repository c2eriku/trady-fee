import { AnimatePresence, motion } from "framer-motion";
import Overlay from "./Overlay";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

export enum DialogSize {
    md = "w-64 h-64",
    lg = "w-[90%] h-fit"
}

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    size?: string
    children?: ReactNode;
}

export function Dialog({ children, isOpen, onClose, size = DialogSize.md }: DialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (<>
                <Overlay onClose={onClose}></Overlay>


                <motion.div
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`fixed flex justify-center items-center inset-0 m-auto z-50`}
                >

                    <div className={`${size} relative bg-background border border-primary rounded shadow-lg p-4 text-foreground`}>
                        <button className="absolute top-0 right-0 rounded-bl-md hover:bg-primary-600" onClick={onClose}>
                            <XMarkIcon className="size-8"></XMarkIcon>
                        </button>
                        {children}
                    </div>

                </motion.div>
            </>)}
        </AnimatePresence>
    )
}