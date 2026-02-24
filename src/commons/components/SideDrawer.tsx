import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed pt-7 px-[35px] top-0 right-0 h-full w-[640px] bg-white z-101 shadow-[-7px_0px_27px_#0000001A] flex flex-col gap-[19px]"
                    >

                        <div className="flex justify-between items-center">
                            <h2 className="text-[26px] font-bold text-main-green-300">{title}</h2>
                            <button
                                onClick={onClose}
                                className="text-main-gray hover:text-main-green-300 hover:bg-main-green-300/10 rounded-full transition-colors cursor-pointer p-1"
                            >

                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pb-[19px]">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
