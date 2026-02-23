import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../../commons/components/navBar/NavBar';
import { TopHeader } from '../../commons/components/header/TopHeader';

export const Home: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <NavBar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-12 w-full max-w-[1400px] mx-auto">
            <header className="mb-10">
              <h1 className="text-2xl font-bold text-sidebar">Home</h1>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="welcome-card p-16 flex flex-col min-h-[600px]"
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-sidebar mb-2">Olá Millena!</h2>
                <p className="text-muted-foreground text-sm font-medium">22, Novembro 2024</p>
              </div>

              <div className="flex-1 illustration-container">
                <div className="relative w-full max-w-md h-72 mb-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent rounded-full scale-110 opacity-50" />

                  <div className="relative flex items-end gap-6 h-full">
                    <div className="w-20 h-40 bg-brand rounded-2xl shadow-xl shadow-brand/20" />
                    <div className="w-20 h-48 bg-sidebar rounded-2xl shadow-xl shadow-sidebar/20" />
                    <div className="w-20 h-36 bg-brand/30 rounded-2xl" />
                  </div>

                  <div className="absolute top-0 right-1/4 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center">
                    <div className="w-6 h-6 bg-brand/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-brand rounded-full" />
                    </div>
                  </div>
                </div>

                <button className="premium-button">
                  Bem-vindo ao WenLock!
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};
