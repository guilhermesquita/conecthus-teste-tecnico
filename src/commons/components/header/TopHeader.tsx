import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowIcon from '../../../assets/icons/arrow.svg?react';
import LogoutIcon from '../../../assets/icons/logoutsvg.svg?react';
import { useAuth } from '../../hooks/useAuth';

export const TopHeader: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { user, logout } = useAuth();

    const getInitials = (name: string) => {
        const names = name.split(' ').filter(n => n.length > 0);
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };


    const userInitials = user ? getInitials(user.name) : '??';

    return (
        <header className="h-[84px] bg-white border-b shadow-sm flex items-center justify-end px-[62.5px] shrink-0 z-30 relative">
            <div
                className="relative cursor-pointer py-[19.5px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative">
                    <div className={`w-12 h-12 rounded-full bg-main-green-300 flex items-center justify-center text-white ring-3 transition-all duration-300 ${isHovered ? 'ring-main-hover' : 'ring-main-cyan-100'}`}>
                        <span className="text-lg font-bold tracking-tight">{userInitials}</span>
                    </div>

                    <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300">
                        <ArrowIcon className={`text-gray-400 transition-transform duration-300 ${isHovered ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-[-5px] top-[82px] w-[280px] bg-white rounded-lg shadow-2xl border-[0.2px] border-[#707070] pt-4 pb-3.25 px-3 z-50 pointer-events-auto"
                        >
                            <div className="absolute -top-2.5 right-5 w-5 h-5 bg-white border-t-[0.2px] border-l-[0.2px] border-[#707070] rotate-45" />

                            <div className="flex items-center gap-[6px]">
                                <div className="w-10 h-10 rounded-full bg-main-green-300 flex items-center justify-center text-white shrink-0 shadow-inner">
                                    <span className="text-lg font-bold">{userInitials}</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <h4 className="text-main-cyan-200 font-bold text-lg truncate leading-tight">{user?.name || 'Usuário'}</h4>
                                    <p className="text-main-green-300/80 text-sm truncate font-medium">{user?.email || 'email@exemplo.com'}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => logout()}
                                className="w-full text-left mt-3 py-[7px] px-[6px] flex items-center gap-[6px] hover:bg-main-cyan-200/18 rounded transition-all group active:scale-95 cursor-pointer text-main-green-300"
                            >
                                <LogoutIcon className="w-6 h-6 shrink-0" />
                                <span className="font-medium text-lg">Sair</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

