import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronDown } from 'lucide-react';
import { NavBar } from '../../commons/components/navBar/NavBar';
import { TopHeader } from '../../commons/components/header/TopHeader';

interface User {
  id: number;
  name: string;
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Raimundo Neto Abreu Teixeira' },
];

export const UserList: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <NavBar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto bg-background p-12">
          <div className="max-w-[1400px] mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-sidebar">Usuários</h1>
            </header>

            <div className="flex justify-between items-center mb-6">
              <div className="relative w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisa"
                  className="w-full bg-white border border-gray-100 py-2.5 pl-11 pr-4 rounded-lg text-sm focus:outline-none focus:border-brand transition-colors shadow-sm"
                />
              </div>
              <button className="bg-brand text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg shadow-brand/20 hover:bg-brand-hover transition-all active:scale-95">
                <Plus size={18} />
                Cadastrar Usuário
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-sidebar rounded-lg px-6 py-4 flex justify-between items-center shadow-lg">
                <span className="text-white text-sm font-medium">Nome</span>
                <span className="text-white text-sm font-medium">Ações</span>
              </div>

              {MOCK_USERS.map((user) => (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={user.id}
                  className="bg-white border border-gray-100 rounded-lg px-6 py-4 flex justify-between items-center shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  <span className="text-sidebar text-sm font-medium">{user.name}</span>
                  <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-brand transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-brand transition-colors">
                      <Pencil size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center text-[11px] text-gray-500 font-medium pb-8 uppercase tracking-wider">
              <div>
                Total de itens <span className="font-bold">13</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span>Itens por página</span>
                  <span className="font-bold flex items-center gap-1 cursor-pointer">
                    15 <ChevronDown size={12} />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 mr-2 text-gray-400">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors group">
                      <div className="flex items-center">
                        <ChevronLeft size={14} />
                        <div className="w-[1px] h-3 bg-gray-300 -ml-[4px]" />
                      </div>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <ChevronLeft size={14} />
                    </button>
                  </div>

                  <div className="bg-brand text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shadow-md shadow-brand/20 cursor-pointer">
                    1
                  </div>

                  <div className="flex items-center gap-1 ml-2 text-gray-400">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <ChevronLeft size={14} className="rotate-180" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors group">
                      <div className="flex items-center">
                        <div className="w-[1px] h-3 bg-gray-300 -mr-[4px]" />
                        <ChevronLeft size={14} className="rotate-180" />
                      </div>
                    </button>
                  </div>
                  <span className="ml-2 lowercase font-normal">de 10</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
