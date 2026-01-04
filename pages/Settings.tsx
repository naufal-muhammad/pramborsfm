import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Save, Upload, User, Mail, Lock, Bell, Moon, LogOut, Camera } from 'lucide-react';

const Settings: React.FC = () => {
  const { currentUser, updateUser } = useData();
  const [formData, setFormData] = useState(currentUser);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({ email: true, push: true, promo: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2000000) {
        alert("Ukuran file terlalu besar! Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    alert('Profil berhasil diperbarui!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('Password baru tidak cocok!');
      return;
    }
    // Mock password change
    alert('Password berhasil diubah!');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="animate-fade-in pb-12 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black italic tracking-tighter mb-2">ACCOUNT SETTINGS</h1>
        <p className="text-gray-400">Kelola informasi profil dan keamanan akun kamu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Quick Actions */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-prambors-gray rounded-3xl p-6 border border-white/10 text-center relative group">
             <div className="w-32 h-32 mx-auto rounded-full bg-gray-800 overflow-hidden mb-4 relative border-4 border-prambors-yellow/20">
                {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-prambors-yellow">
                        <User size={48} />
                    </div>
                )}
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera size={24} className="text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
             </div>
             <h2 className="font-bold text-xl text-white">{formData.name}</h2>
             <p className="text-sm text-gray-400">{formData.email}</p>
          </div>

          <div className="bg-prambors-gray rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="font-bold text-gray-300 text-sm uppercase tracking-wide mb-2">Preferences</h3>
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Bell size={16} /> Notifications
                  </div>
                  <input type="checkbox" checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} className="toggle accent-prambors-yellow w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Mail size={16} /> Email Newsletter
                  </div>
                  <input type="checkbox" checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} className="toggle accent-prambors-yellow w-4 h-4" />
              </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-6">
            
            {/* Edit Profile Form */}
            <form onSubmit={handleSaveProfile} className="bg-prambors-gray rounded-3xl p-6 md:p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User className="text-prambors-yellow" /> Edit Profile
                </h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-prambors-yellow focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-prambors-yellow focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bio</label>
                        <textarea 
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-prambors-yellow focus:outline-none h-24 resize-none"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>
                    <div className="pt-2 flex justify-end">
                        <button type="submit" className="bg-prambors-yellow text-black font-bold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-400 transition-colors">
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </form>

            {/* Change Password Form */}
            <form onSubmit={handleChangePassword} className="bg-prambors-gray rounded-3xl p-6 md:p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Lock className="text-prambors-yellow" /> Security
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Password</label>
                        <input 
                            type="password" 
                            value={passwordData.current}
                            onChange={e => setPasswordData({...passwordData, current: e.target.value})}
                            className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-prambors-yellow focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Password</label>
                            <input 
                                type="password" 
                                value={passwordData.new}
                                onChange={e => setPasswordData({...passwordData, new: e.target.value})}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-prambors-yellow focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={passwordData.confirm}
                                onChange={e => setPasswordData({...passwordData, confirm: e.target.value})}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-prambors-yellow focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                        <button type="submit" className="bg-white/10 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-colors border border-white/10">
                            Update Password
                        </button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;