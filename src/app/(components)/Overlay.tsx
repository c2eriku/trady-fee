import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface OverlayProps {
    onClose: () => void;
}

export default function Overlay({ onClose }: OverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 w-screen h-screen bg-black z-10"
        >
        </motion.div>
    );
}