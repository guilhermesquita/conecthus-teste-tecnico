import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { NavBar } from '../../commons/components/navBar/NavBar';
import { TopHeader } from '../../commons/components/header/TopHeader';
import { PageLayout } from '../../commons/components/layout/PageLayout';
import { Table } from '../../commons/components/table/Table';
import SearchIcon from '../../assets/icons/search.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import EyeFilledIcon from '../../assets/icons/eyeFilled.svg?react';
import PenIcon from '../../assets/icons/pen.svg?react';
import PenFilledIcon from '../../assets/icons/penFilled.svg?react';
import TrashIcon from '../../assets/icons/trash.svg?react';
import TrashFilledIcon from '../../assets/icons/trashFilled.svg?react';
import NextPreviousIcon from '../../assets/icons/nextPrevious.svg?react';

interface User {
  id: number;
  name: string;
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Raimundo Neto Abreu Teixeira' },
];

export const UserList: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <NavBar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopHeader />

        <PageLayout title="Usuários">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-80">
              <SearchIcon className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-[#274240]" />
              <input
                type="text"
                placeholder="Pesquisa"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-shearch w-[285px] bg-white border border-[#86868645] py-4 pl-12 pr-10 rounded-lg text-[16px] text-main-green-300 focus:outline-none focus:border-main-cyan-100 focus:border-2 hover:bg-[#E3E3E3] transition-colors shadow-md"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-[#6F7D7D] cursor-pointer"
                >
                  <X size={24} />
                </button>
              )}
            </div>
            <button className="bg-main-cyan-200 text-white px-[18px] py-4 rounded-lg flex items-center gap-1.25 text-lg font-bold shadow-lg shadow-brand/20 hover:bg-brand-hover transition-all active:scale-95 cursor-pointer">
              <Plus size={26} />
              Cadastrar Usuário
            </button>
          </div>

          <Table
            data={MOCK_USERS}
            keyExtractor={(user) => user.id}
            rowGap={6}
            columns={[
              {
                header: 'Nome',
                render: (user) => (
                  <span className="text-sidebar text-lg font-medium">{user.name}</span>
                ),
              },
              {
                header: 'Ações',
                align: 'right',
                className: 'w-[280px]',
                render: () => (
                  <div className="flex items-center gap-2">
                    <button className="bg-white hover:bg-main-cyan-200 p-1.5 rounded shadow-lg border border-gray-50 text-[#0F2621] hover:text-white transition-all cursor-pointer group">
                      <EyeIcon className='w-6 h-6 group-hover:hidden' />
                      <EyeFilledIcon className='w-6 h-6 hidden group-hover:block' />
                    </button>
                    <button className="bg-white hover:bg-main-cyan-200 p-1.5 rounded shadow-lg border border-gray-50 text-[#0F2621] hover:text-white transition-all cursor-pointer group">
                      <PenIcon className='w-6 h-6 group-hover:hidden' />
                      <PenFilledIcon className='w-6 h-6 hidden group-hover:block' />
                    </button>
                    <button className="bg-white hover:bg-main-cyan-200 p-1.5 rounded shadow-lg border border-gray-50 text-[#0F2621] hover:text-white transition-all cursor-pointer group">
                      <TrashIcon className='w-6 h-6 group-hover:hidden' />
                      <TrashFilledIcon className='w-6 h-6 hidden group-hover:block' />
                    </button>
                  </div>
                ),
              },
            ]}
          />

          <div className="mt-auto flex justify-between items-center text-base text-main-green-300 font-medium pt-10 pb-8">
            <div>
              Total de itens:<span className="font-bold ml-1">13</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Itens por página</span>
                <button className="font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none">
                  15
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 mr-2 text-[#616c84]">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <NextPreviousIcon />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                </div>

                <div className="bg-main-cyan-200 text-white w-[45px] h-[44px] flex items-center justify-center rounded text-sm font-bold shadow-md shadow-main-cyan-200/20 cursor-pointer">
                  1
                </div>

                <div className="flex items-center gap-1 ml-2 text-[#616c84]">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronRight size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <NextPreviousIcon className='rotate-180' />
                  </button>
                </div>
                <span className="ml-2 lowercase font-bold">de 10</span>
              </div>
            </div>
          </div>
        </PageLayout>
      </div>
    </div>
  );
};
