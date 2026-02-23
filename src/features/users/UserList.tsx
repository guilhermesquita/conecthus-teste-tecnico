import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, MoreVertical, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastSeen: string;
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Alex Rivera', email: 'alex@conecthus.com', role: 'Admin', status: 'Active', lastSeen: '2 hours ago' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@conecthus.com', role: 'Editor', status: 'Active', lastSeen: '5 mins ago' },
  { id: 3, name: 'Marco Silva', email: 'marco@conecthus.com', role: 'Viewer', status: 'Inactive', lastSeen: '3 days ago' },
  { id: 4, name: 'Elena Frost', email: 'elena@conecthus.com', role: 'Admin', status: 'Active', lastSeen: 'Just now' },
];

export const UserList: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-5">
        <div className="flex flex-col">
          <Link to="/" className="text-brand text-sm font-medium mb-5 hover:underline decoration-brand/50 underline-offset-4">← Dashboards</Link>
          <h1 className="gradient-text text-4xl font-bold mb-2">Team Members</h1>
          <p className="text-muted-foreground">Manage and invite your team members from here.</p>
        </div>
        <button className="bg-brand hover:bg-brand-hover text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shadow-lg shadow-brand/30">
          <UserPlus size={18} /> Add Member
        </button>
      </header>

      <div className="glass-card mb-6 p-4 md:px-6 flex flex-col md:flex-row justify-between gap-5 rounded-xl">
        <div className="flex-1 relative flex items-center">
          <Search size={18} className="absolute left-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            className="w-full bg-white/5 border border-glass-border py-2.5 pl-11 pr-4 rounded-lg text-white text-sm focus:outline-none focus:border-brand transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <select className="bg-white/5 border border-glass-border text-white text-sm py-2 px-4 rounded-lg outline-none focus:border-brand transition-colors appearance-none">
            <option className="bg-background">All Roles</option>
            <option className="bg-background">Admin</option>
            <option className="bg-background">Editor</option>
          </select>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden rounded-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-brand to-brand/60 rounded-lg flex items-center justify-center font-bold text-white shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[15px]">{user.name}</span>
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${user.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-gray-500/10 text-gray-400'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-200">{user.role}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} /> {user.lastSeen}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-muted-foreground hover:text-white transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
