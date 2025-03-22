import { AnimatePresence, motion } from "framer-motion";
import Overlay from "./Overlay";
import { XMarkIcon } from "@heroicons/react/16/solid";

export function Dialog({ isOpen, onClose, children }: any) {
    return (
        <>
            <AnimatePresence>
                {isOpen && (<>
                    <Overlay onClose={onClose}></Overlay>

                    <motion.div
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 m-auto w-64 h-64 rounded-lg shadow-lg z-50"
                    >

                        <div className="relative min-h-72 bg-background border border-primary rounded p-4">
                            <button className="absolute top-0 right-0 rounded-bl-md hover:bg-primary-600" onClick={onClose}>
                                <XMarkIcon className="size-8"></XMarkIcon>
                            </button>
                            {children}
                        </div>

                    </motion.div>
                </>)}
            </AnimatePresence>
        </>
    )
}