import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: number;
    name: string;
    enrollment: string;
    email: string;
    createdAt: string;
    updatedAt: string | null;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    users: User[];
    login: (userData?: User) => void;
    logout: () => void;
    addUser: (newUser: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;

    updateUser: (id: number, updatedData: Partial<User>) => void;

}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_DATE = new Date().toISOString();

const CURRENT_USER_DATA: User = {
    id: 1,
    name: 'Milena Santana Borges',
    enrollment: '809986',
    email: 'milena.santana@energy.com.br',
    createdAt: CURRENT_DATE,
    updatedAt: CURRENT_DATE,
};

const SEEDED_USERS: User[] = [
    { id: 2, name: 'Raimundo Neto Abreu Teixeira', enrollment: '809988', email: 'raimundo.neto@energy.com.br', createdAt: CURRENT_DATE, updatedAt: null },
    { id: 3, name: 'Adriano Machado Souza', enrollment: '809987', email: 'adriano.machado@callidus.com.br', createdAt: CURRENT_DATE, updatedAt: null },
    { id: 4, name: 'Beatriz Almeida Costa', enrollment: '809989', email: 'beatriz.almeida@energy.com.br', createdAt: CURRENT_DATE, updatedAt: null },
    { id: 5, name: 'Carlos Eduardo Santos', enrollment: '809990', email: 'carlos.eduardo@energy.com.br', createdAt: CURRENT_DATE, updatedAt: null },
    { id: 6, name: 'Diana Oliveira Lima', enrollment: '809991', email: 'diana.oliveira@energy.com.br', createdAt: CURRENT_DATE, updatedAt: null },
];


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const [users, setUsers] = useState<User[]>(() => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            const parsed = JSON.parse(savedUsers);
            const migrated = parsed.map((u: any) => ({
                ...u,
                createdAt: u.createdAt || CURRENT_DATE,
                updatedAt: u.updatedAt || CURRENT_DATE,
            }));
            const filtered = migrated.filter((u: User) => u.email !== CURRENT_USER_DATA.email);

            if (parsed.length !== filtered.length || JSON.stringify(parsed) !== JSON.stringify(migrated)) {
                localStorage.setItem('users', JSON.stringify(filtered));
            }
            return filtered;
        }
        return SEEDED_USERS;
    });

    useEffect(() => {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(SEEDED_USERS));
        }

        if (!isAuthenticated || !user || user.email !== CURRENT_USER_DATA.email) {
            login(CURRENT_USER_DATA);
        }
    }, []);

    const login = (userData?: User) => {
        const currentUser = userData || CURRENT_USER_DATA;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(currentUser));
        setIsAuthenticated(true);
        setUser(currentUser);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    const addUser = (newUser: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = new Date().toISOString();
        const fullUser: User = {
            ...newUser,
            id: Math.max(0, ...users.map(u => u.id)) + 1,
            createdAt: now,
            updatedAt: now,
        };
        const updatedUsers = [...users, fullUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const updateUser = (id: number, updatedData: Partial<User>) => {
        const now = new Date().toISOString();
        const updatedUsers = users.map(u =>
            u.id === id ? { ...u, ...updatedData, updatedAt: now } : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, users, login, logout, addUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

