import React from 'react';

interface PageLayoutProps {
    title: React.ReactNode;
    children: React.ReactNode;
}


export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
    return (
        <main className="flex-1 overflow-y-auto bg-background">
            <div className="p-5 w-full max-w-[1400px] mx-auto min-h-full flex flex-col">
                <header className="mb-3">
                    {typeof title === 'string' ? (
                        <h1 className="text-3xl font-bold text-main-green-dark300">{title}</h1>
                    ) : (
                        title
                    )}
                </header>

                {children}
            </div>
        </main>
    );
};
