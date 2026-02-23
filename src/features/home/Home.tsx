import React from 'react';
import { motion } from 'framer-motion';
import { Users, Layout, Shield, ArrowRight, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../commons/hooks/useAuth';

export const Home: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,_#0a0a0c_40%)]">
      <nav className="glass-card mx-auto mt-5 w-[90%] max-w-[1100px] h-[70px] flex items-center justify-between px-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center font-bold text-xl">C</div>
          <span className="text-2xl font-bold tracking-tight">Conecthus</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/users" className="text-muted-foreground font-medium hover:text-white transition-colors">Users</Link>
          <button onClick={logout} className="text-muted-foreground hover:text-accent transition-colors flex items-center">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto mt-24 text-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="gradient-text text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-6">
            Connecting Modern <br /> Infrastructure.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] mx-auto mb-12 leading-relaxed">
            A minimalist approach to user management and connection strategies.
            Professional, fast, and secure.
          </p>

          <div className="flex justify-center">
            <Link to="/users" className="bg-brand hover:bg-brand-hover text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shadow-lg shadow-brand/30">
              View Users <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 pb-12">
          <FeatureCard
            icon={<Users className="w-8 h-8 text-brand mb-5" />}
            title="User Management"
            description="Manage your team with ease through our intuitive interface."
          />
          <FeatureCard
            icon={<Layout className="w-8 h-8 text-brand mb-5" />}
            title="Clean Layout"
            description="Built with the latest design principles for a premium feel."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-brand mb-5" />}
            title="Secure Access"
            description="Smart routing ensures your data stays protected at all times."
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="glass-card p-8 text-left transition-transform duration-300 hover:-translate-y-2 hover:border-brand rounded-2xl">
    {icon}
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);
