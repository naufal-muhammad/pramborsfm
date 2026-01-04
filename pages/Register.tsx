import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { User, Mail, Lock, ArrowRight, Radio } from 'lucide-react';
import { User as UserType } from '../types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser, addUser } = useData();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password konfirmasi tidak cocok.");
      return;
    }

    setIsLoading(true);

    // Simulate API Call delay
    setTimeout(() => {
        const newUser: UserType = {
            id: `u-${Date.now()}`,
            name: formData.name,
            email: formData.email,
            role: 'user',
            status: 'active',
            joinedDate: new Date().toISOString().split('T')[0],
            bio: 'New Kawula Muda member!',
            // Auto generate avatar based on name
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=FFCD00&color=000`
        };

        // Add to global user list
        addUser(newUser);
        
        // Log user in immediately
        updateUser(newUser);

        alert("Registrasi Berhasil! Selamat datang Kawula Muda.");
        setIsLoading(false);
        navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-prambors-gray rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Left Side: Visual */}
        <div className="relative hidden md:flex flex-col justify-center p-12 bg-black">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
             
             <div className="relative z-10">
                 <div className="w-16 h-16 bg-prambors-yellow rounded-full flex items-center justify-center mb-6 text-black">
                     <Radio size={32} />
                 </div>
                 <h1 className="text-4xl font-black italic tracking-tighter text-white mb-4">
                     JOIN THE <br/> <span className="text-prambors-yellow">HYPE!</span>
                 </h1>
                 <p className="text-gray-300 text-lg leading-relaxed mb-8">
                     Daftar sekarang buat akses fitur eksklusif: request lagu, vote chart, dan gabung komunitas Kawula Muda se-Indonesia.
                 </p>
                 <div className="flex gap-2">
                     <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10">🎵 Create Playlists</span>
                     <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10">💬 Live Chat</span>
                 </div>
             </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-400 text-sm">Masukan detail kamu untuk mendaftar.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nama Lengkap" 
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-prambors-yellow focus:ring-1 focus:ring-prambors-yellow transition-all"
                        />
                    </div>
                </div>

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

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-prambors-yellow focus:ring-1 focus:ring-prambors-yellow transition-all"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-prambors-yellow text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(255,205,0,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating Account...' : (
                        <>Sign Up <ArrowRight size={18} /></>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Sudah punya akun? <Link to="/login" className="text-prambors-yellow font-bold hover:underline">Log In di sini</Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;