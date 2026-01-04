import React, { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Bell, Check, Trash2, X, Info, CheckCircle, AlertCircle } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markAllNotificationsAsRead, clearNotifications } = useData();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      case 'alert': return <AlertCircle size={16} className="text-red-500" />;
      default: return <Info size={16} className="text-prambors-yellow" />;
    }
  };

  return (
    <div 
      ref={modalRef}
      className="absolute top-16 right-4 md:right-8 w-80 md:w-96 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-50 animate-fade-in overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Bell size={18} className="text-prambors-yellow" /> Notifikasi
          <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-300">
            {notifications.length}
          </span>
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center px-6">
             <Bell size={40} className="text-gray-700 mb-3" />
             <p className="text-gray-400 text-sm">Tidak ada notifikasi baru.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 hover:bg-white/5 transition-colors relative ${!notif.read ? 'bg-white/5' : ''}`}
              >
                {!notif.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-prambors-yellow rounded-full"></div>
                )}
                <div className="flex gap-3">
                   <div className="mt-1 shrink-0">
                       {getIcon(notif.type)}
                   </div>
                   <div>
                       <h4 className={`text-sm ${!notif.read ? 'font-bold text-white' : 'font-medium text-gray-300'}`}>
                           {notif.title}
                       </h4>
                       <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                           {notif.message}
                       </p>
                       <span className="text-[10px] text-gray-500 mt-2 block">
                           {notif.time}
                       </span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 bg-black/40 border-t border-white/10 flex justify-between gap-2">
           <button 
             onClick={markAllNotificationsAsRead}
             className="flex-1 text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
           >
             <Check size={14} /> Tandai Dibaca
           </button>
           <button 
             onClick={clearNotifications}
             className="flex-1 text-xs font-bold text-red-400 hover:text-red-300 bg-red-900/10 hover:bg-red-900/20 py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
           >
             <Trash2 size={14} /> Hapus Semua
           </button>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;