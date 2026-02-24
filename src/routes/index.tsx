import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../commons/hooks/useAuth';
import { Home } from '../features/home/Home';
import { UserList } from '../features/users/User';
import { Login } from '../features/auth/Login';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
        </Routes>
    );
};
