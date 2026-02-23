import React, { useState } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TopHeader: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <header className="h-[70px] bg-white border-b border-gray-100 flex items-center justify-end px-12 shrink-0 z-30 relative">
            <div
                className="relative cursor-pointer py-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative">
                    <div className={`w-10 h-10 rounded-full bg-sidebar flex items-center justify-center text-white ring-2 transition-all duration-300 ${isHovered ? 'ring-[#01748C]' : 'ring-brand'}`}>
                        <span className="text-xs font-bold tracking-tight">MS</span>
                    </div>

                    <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center transition-transform duration-300">
                        <ChevronDown
                            size={12}
                            className={`text-gray-400 transition-transform duration-300 ${isHovered ? 'rotate-0' : 'rotate-180'}`}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-0 top-full mt-4 w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-8 z-50 pointer-events-auto"
                        >
                            {/* Popover Arrow */}
                            <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-full bg-sidebar flex items-center justify-center text-white shrink-0 shadow-inner">
                                    <span className="text-base font-bold">MS</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <h4 className="text-[#00B4D8] font-bold text-lg truncate leading-tight">Milena Santana Borges</h4>
                                    <p className="text-gray-400 text-sm truncate font-medium">milena.santana@energy.org.br</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-4 text-sidebar font-bold text-lg hover:text-brand transition-all group w-full pt-6 border-t border-gray-50 active:scale-95">
                                <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-brand/10 transition-colors">
                                    <LogOut size={22} className="group-hover:text-brand transition-colors" />
                                </div>
                                <span>Sair</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};
