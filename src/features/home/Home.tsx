import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../../commons/components/navBar/NavBar';
import { TopHeader } from '../../commons/components/header/TopHeader';
import ManagerImages from '../../commons/images/ManagerImages';
import { PageLayout } from '../../commons/components/layout/PageLayout';
import { useAuth } from '../../commons/hooks/useAuth';

export const Home: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();

  const firstName = user ? user.name.split(' ')[0] : 'Usuário';

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <NavBar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopHeader />

        <PageLayout title="Home">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="info-card px-7 py-6 flex flex-col min-h-[600px]"
          >
            <div>
              <h2 className="text-[32px] font-bold text-main-dark-blue mb-2">Olá {firstName}!</h2>
              <p className="text-main-dark-blue text-xl font-medium">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="flex-1 flex-col gap-[15px] illustration-container">
              <img src={ManagerImages.wenlockHomeImage} width={400} height={350} />
              <button className="py-4 flex justify-center border rounded border-[#272846] w-[500px] text-main-green-300 text-xl font-bold">
                Bem-vindo ao WenLock!
              </button>
            </div>
          </motion.div>
        </PageLayout>
      </div>
    </div>
  );
};

