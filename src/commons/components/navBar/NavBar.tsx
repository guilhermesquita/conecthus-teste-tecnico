import React from 'react';
import NavListItems from './NavListItems';

interface NavBarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBar: React.FC<NavBarProps> = ({ open, setOpen }) => {
    return (
        <NavListItems open={open} setOpen={setOpen} />
    );
};
