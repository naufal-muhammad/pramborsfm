import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Mail, Lock, ArrowRight, Radio, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { allUsers, updateUser } = useData();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert("Mohon isi email dan password.");
      return;
    }

    setIsLoading(true);

    // Simulate API Call delay
    setTimeout(() => {
        // Simple Mock Authentication: Check if email exists in our user list
        // In a real app, you would verify the password hash here.
        const foundUser = allUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

        if (foundUser) {
            if (foundUser.status === 'banned') {
                alert("Akun anda telah dibekukan. Hubungi admin.");
                setIsLoading(false);
                return;
            }

            // Login Success
            updateUser(foundUser);
            alert(`Welcome back, ${foundUser.name}!`);
            navigate('/');
        } else {
            // Login Failed
            alert("Email tidak ditemukan atau password salah.");
        }
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-prambors-gray rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Left Side: Visual */}
        <div className="relative hidden md:flex flex-col justify-center p-12 bg-black">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
             
             <div className="relative z-10">
                 <div className="w-16 h-16 bg-prambors-yellow rounded-full flex items-center justify-center mb-6 text-black">
                     <Radio size={32} />
                 </div>
                 <h1 className="text-4xl font-black italic tracking-tighter text-white mb-4">
                     WELCOME <br/> <span className="text-prambors-yellow">BACK!</span>
                 </h1>
                 <p className="text-gray-300 text-lg leading-relaxed mb-8">
                     Lanjut dengerin playlist favorit lo dan update berita terkini bareng Prambors.
                 </p>
                 <div className="flex gap-2">
                     <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10">🎧 High Quality Audio</span>
                     <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10">🔥 Exclusive Content</span>
                 </div>
             </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Log In</h2>
                <p className="text-gray-400 text-sm">Masuk ke akun Kawula Muda kamu.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="nama@email.com" 
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-prambors-yellow focus:ring-1 focus:ring-prambors-yellow transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-prambors-yellow focus:ring-1 focus:ring-prambors-yellow transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                        <input type="checkbox" className="accent-prambors-yellow rounded" /> Remember me
                    </label>
                    <a href="#" className="hover:text-prambors-yellow transition-colors">Forgot Password?</a>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-prambors-yellow text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(255,205,0,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Logging In...' : (
                        <>Log In <LogIn size={18} /></>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Belum punya akun? <Link to="/register" className="text-prambors-yellow font-bold hover:underline">Daftar Sekarang</Link>
                </p>
                <div className="mt-6 text-xs text-gray-600">
                    <p>Demo Accounts:</p>
                    <p>admin@pramborsfm.com (Admin)</p>
                    <p>member@pramborsfm.com (User)</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;