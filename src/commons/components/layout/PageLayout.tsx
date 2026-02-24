import React from 'react';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
    return (
        <main className="flex-1 overflow-y-auto bg-background">
            <div className="p-5 w-full max-w-[1400px] mx-auto">
                <header className="mb-3">
                    <h1 className="text-3xl font-bold text-main-green-dark300">{title}</h1>
                </header>
                {children}
            </div>
        </main>
    );
};
