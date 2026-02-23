import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../commons/hooks/useAuth';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_bottom_left,_#1e1b4b_0%,_#0a0a0c_40%)] p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-[440px] p-10 rounded-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand/20">
            <LogIn size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-muted-foreground" size={18} />
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-glass-border py-3 pl-10 pr-3 rounded-lg text-white text-[15px] transition-all focus:border-brand focus:bg-white/10 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-muted-foreground" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-glass-border py-3 pl-10 pr-10 rounded-lg text-white text-[15px] transition-all focus:border-brand focus:bg-white/10 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 text-muted-foreground hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="text-accent text-sm text-center">{error}</div>}

          <button
            type="submit"
            className="mt-2 w-full bg-brand hover:bg-brand-hover text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-lg shadow-brand/30"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account? <a href="#" className="text-brand font-semibold hover:underline">Request Access</a>
        </div>
      </motion.div>
    </div>
  );
};
