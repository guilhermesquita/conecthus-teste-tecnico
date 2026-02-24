import React, { useState } from 'react';
import {
    ChevronLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import WenlockFullLogo from '../../../assets/icons/wenlock-full-logo.svg?react';
import WenlockLogo from '../../../assets/icons/wenlock-logo.svg?react';
import ChartIcon from '../../../assets/icons/chart.svg?react';
import CredentialIcon from '../../../assets/icons/credential.svg?react';
import UserIcon from '../../../assets/icons/user.svg?react';
import ChevronIcon from '../../../assets/icons/chevron.svg?react';

interface NavListItemsProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavListItems: React.FC<NavListItemsProps> = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const menuItems = [
        { id: 1, label: 'Home', icon: ChartIcon, path: '/' },
        {
            id: 2,
            label: 'Controle de Acesso',
            icon: CredentialIcon,
            hasSubmenu: true,
            submenu: [
                { label: 'Usuários', icon: UserIcon, path: '/users' }
            ]
        },
    ];

    const isPathActive = (path?: string) => {
        if (!path) return false;
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const isParentActive = (item: any) => {
        if (item.path && isPathActive(item.path)) return true;
        if (item.submenu) {
            return item.submenu.some((sub: any) => isPathActive(sub.path));
        }
        return false;
    };

    const [expandedMenus, setExpandedMenus] = useState<number[]>(() =>
        menuItems
            .filter(item => item.hasSubmenu && item.submenu?.some(sub => isPathActive(sub.path)))
            .map(item => item.id)
    );

    React.useEffect(() => {
        menuItems.forEach(item => {
            if (item.hasSubmenu && isParentActive(item)) {
                setExpandedMenus(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
            }
        });
    }, [location.pathname]);

    const handleToggleSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const toggleSubmenu = (menuId: number) => {
        if (!open) {
            setOpen(true);
            if (!expandedMenus.includes(menuId)) {
                setExpandedMenus([...expandedMenus, menuId]);
            }
            return;
        }
        setExpandedMenus(prev =>
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };



    return (
        <div className={`${open ? 'w-[336px]' : 'w-[116px]'} sidebar-container h-screen z-40 pt-[43.49px]`}>
            <button
                onClick={handleToggleSidebar}
                className={`cursor-pointer absolute -right-5 top-11 w-[37px] h-[37px] rounded-full bg-[#F2F2F2] flex items-center justify-center  shadow-[0px_3px_6px_rgba(0,0,0,0.16)]  z-50 transition-transform duration-300 ${!open ? 'rotate-180' : ''}`}
            >
                <ChevronLeft size={24} className="text-main-green-300/60" strokeWidth={3} />
            </button>

            <div className={`px-10 h-[100px]`}>
                <div >
                    {open ? (
                        <>
                            <WenlockFullLogo className="h-[36.39px] w-[234.68px]" />
                        </>
                    ) : (
                        <div className="flex flex-col items-center ml-0.5">
                            <WenlockLogo className="h-[56.39px] w-[71.49px]" />
                        </div>
                    )}
                </div>
            </div>

            <nav className="flex-1 px-[15px] select-none">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className="relative"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div
                                onClick={() => {
                                    if (item.hasSubmenu) {
                                        toggleSubmenu(item.id);
                                    } else if (item.path) {
                                        navigate(item.path);
                                    }
                                }}
                                className={`
                                    flex items-center gap-[10px] py-[15px] px-[18px] rounded-lg cursor-pointer transition-all text-lg
                                    ${item.hasSubmenu
                                        ? (open && expandedMenus.includes(item.id)
                                            ? (isParentActive(item) ? 'text-white/60 text-lg font-bold' : 'text-white text-lg font-bold')
                                            : 'nav-item-idle'
                                        )
                                        : (isParentActive(item) ? 'nav-item-active' : 'nav-item-idle')
                                    }
                                    ${!open ? 'justify-center w-12 h-12 mx-auto p-0' : ''}
                                `}
                            >
                                <item.icon
                                    className={`shrink-0 w-6 h-6 ${item.hasSubmenu && open && expandedMenus.includes(item.id)
                                        ? (isParentActive(item) ? 'opacity-60' : 'opacity-100')
                                        : ''
                                        }`}
                                />
                                {open && (
                                    <>
                                        <span className={`flex-1 text-lg whitespace-nowrap ${isParentActive(item) ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                                        {item.hasSubmenu && (
                                            <ChevronIcon
                                                className={`transition-transform duration-300 w-6 h-6 ${expandedMenus.includes(item.id)
                                                    ? (isParentActive(item) ? 'opacity-60 rotate-0' : 'opacity-100 rotate-0')
                                                    : 'opacity-50 rotate-180'
                                                    }`}
                                            />
                                        )}
                                    </>
                                )}
                            </div>

                            {!open && item.hasSubmenu && hoveredItem === item.id && (
                                <div className="absolute left-[calc(100%+15px)] top-0 z-50">
                                    <div className="bg-brand text-white rounded-lg py-2 px-4 shadow-xl whitespace-nowrap flex flex-col gap-1 min-w-[120px]">
                                        <div className="absolute -left-1.5 top-5 w-3 h-3 bg-brand rotate-45" />
                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1">{item.label}</span>
                                        {item.submenu?.map((sub, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => navigate(sub.path)}
                                                className="flex items-center gap-2 py-1 hover:text-white/80 cursor-pointer"
                                            >
                                                <div className="w-1 h-1 bg-white rounded-full" />
                                                <span className="text-xs font-bold">{sub.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <AnimatePresence>
                                {open && item.hasSubmenu && expandedMenus.includes(item.id) && (
                                    <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        {item.submenu?.map((sub, idx) => (
                                            <li key={idx} className="ml-6 mt-1">
                                                <div
                                                    onClick={() => navigate(sub.path)}
                                                    className={`
                                                        flex items-center gap-3 py-2 px-2.75 rounded-lg cursor-pointer transition-all
                                                        ${isPathActive(sub.path) ? 'bg-main-cyan-100 text-sidebar font-bold' : 'nav-item-idle'}
                                                    `}
                                                >
                                                    <sub.icon className="shrink-0 w-6 h-6" />
                                                    <span className={`flex-1 text-lg whitespace-nowrap ${isParentActive(item) ? 'font-bold' : 'font-medium'}`}>{sub.label}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={`px-6 py-8 transition-all duration-300`}>
                {open ? (
                    <div className="flex flex-col gap-0.5 opacity-100">
                        <div className="flex items-center gap-1.5 text-white font-bold text-[18px] tracking-tight">
                            © WenLock
                        </div>
                        <p className="text-sm text-main-pastel font-medium">Power by Conecthus</p>
                        <p className="text-sm text-main-pastel font-medium">V 0.0.0</p>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-sm text-main-pastel font-bold opacity-70">V 0.0.0</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavListItems;