import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type SnackType = 'success' | 'warning';

interface SnackMessage {
    id: string;
    type: SnackType;
    message: string;
}

interface SnackbarContextType {
    showSnack: (message: string, type: SnackType, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [snacks, setSnacks] = useState<SnackMessage[]>([]);

    const removeSnack = useCallback((id: string) => {
        setSnacks((prev) => prev.filter((snack) => snack.id !== id));
    }, []);

    const showSnack = useCallback((message: string, type: SnackType, duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setSnacks((prev) => [...prev, { id, type, message }]);

        setTimeout(() => {
            removeSnack(id);
        }, duration);
    }, [removeSnack]);

    return (
        <SnackbarContext.Provider value={{ showSnack }}>
            {children}
            <div className="fixed top-24 right-0 z-9999 flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {snacks.map((snack) => (
                        <motion.div
                            key={snack.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            className={cn(
                                "pointer-events-auto flex items-center gap-3 p-3 rounded-[6px_0px_0px_6px] min-w-[329px] max-w-md text-white font-bold text-lg",
                                snack.type === 'success' ? "bg-main-alerts-green-light" : "bg-main-alerts-orange-light"
                            )}
                        >
                            <div className="shrink-0">
                                {snack.type === 'success' ? (
                                    <Check size={28} strokeWidth={3} />
                                ) : (
                                    <AlertTriangle size={28} strokeWidth={3} />
                                )}
                            </div>
                            <span className="flex-1">{snack.message}</span>
                            <button
                                onClick={() => removeSnack(snack.id)}
                                className="ml-4 hover:opacity-80 transition-opacity cursor-pointer"
                            >
                                <X size={32} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
