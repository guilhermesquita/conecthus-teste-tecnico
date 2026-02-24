import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Sim',
    cancelText = 'Não',
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-100 cursor-pointer"
                    />

                    <div className="fixed inset-0 flex items-center justify-center z-101 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#86868620] p-10 w-full max-w-[480px] pointer-events-auto flex flex-col items-center text-center"
                        >
                            <h2 className="text-[28px] font-bold text-[#0F2621] mb-4">
                                {title}
                            </h2>
                            <p className="text-[18px] text-[#0F2621] font-medium mb-10">
                                {description}
                            </p>

                            <div className="flex gap-4 w-full justify-center">
                                <button
                                    onClick={onClose}
                                    className="w-[145px] h-[55px] hover:bg-[#C9D9D9] border border-[#0F2621] rounded-lg text-[#0F2621] font-bold text-lg bg-[#19866D00] transition-colors cursor-pointer"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="w-[145px] h-[55px] bg-main-cyan-200 rounded-lg text-white font-bold text-lg hover:bg-main-hover transition-colors shadow-lg cursor-pointer"
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
