import React from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Mail, Phone, Globe, Award, Users, Music, Star, Zap, Heart, Smile } from 'lucide-react';

const About: React.FC = () => {
  const { networks, aboutData } = useData();

  // Icon Mapper for Dynamic Icons
  const iconMap: { [key: string]: any } = {
    Music: Music,
    Users: Users,
    Award: Award,
    Globe: Globe,
    Star: Star,
    Zap: Zap,
    Heart: Heart,
    Smile: Smile
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Music;
    return <IconComponent size={32} />;
  };

  return (
    <div className="animate-fade-in pb-12 space-y-16">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center text-center group">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
            style={{ backgroundImage: `url('${aboutData.hero.bgImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 border border-prambors-yellow text-prambors-yellow rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Since {aboutData.hero.sinceYear}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter uppercase">
            {aboutData.hero.titleLine1} <br /> {aboutData.hero.titleLine2} <span className="text-prambors-yellow italic">{aboutData.hero.highlightWord}</span>
          </h1>
          <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            {aboutData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* History & Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase">
            {aboutData.story.title} <span className="text-prambors-yellow">{aboutData.story.highlightWord}</span>
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed text-justify">
            <p>{aboutData.story.description1}</p>
            <p>{aboutData.story.description2}</p>
          </div>
          <div className="flex gap-4 pt-4">
            <div className="bg-prambors-gray border border-white/10 p-4 rounded-xl flex-1 text-center">
                <h3 className="text-3xl font-black text-white">{aboutData.story.stat1Value}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{aboutData.story.stat1Label}</p>
            </div>
            <div className="bg-prambors-gray border border-white/10 p-4 rounded-xl flex-1 text-center">
                <h3 className="text-3xl font-black text-prambors-yellow">{aboutData.story.stat2Value}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{aboutData.story.stat2Label}</p>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] bg-gray-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
           <img src={aboutData.story.image} className="w-full h-full object-cover opacity-80" alt="About" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
           <div className="absolute bottom-6 left-6">
               <p className="text-white font-black text-2xl">KAWULA MUDA</p>
               <p className="text-prambors-yellow text-sm">Our Community, Our Soul.</p>
           </div>
        </div>
      </section>

      {/* DNA Values */}
      <section>
        <div className="text-center mb-10">
            <h2 className="text-3xl font-black italic uppercase mb-2">
                {aboutData.dna.title} <span className="text-prambors-yellow">{aboutData.dna.highlightWord}</span>
            </h2>
            <p className="text-gray-400">{aboutData.dna.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.dna.items.map((item) => (
                <div key={item.id} className="bg-prambors-gray p-8 rounded-3xl border border-white/5 hover:border-prambors-yellow/50 transition-colors group text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-prambors-yellow">
                        {getIcon(item.icon)}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 italic uppercase">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Networks */}
      <section className="bg-gradient-to-br from-prambors-yellow to-yellow-600 rounded-3xl p-8 md:p-12 text-black shadow-[0_0_40px_rgba(255,205,0,0.15)]">
        <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
                <h2 className="text-4xl font-black italic mb-4 leading-tight">JARINGAN<br/>PRAMBORS</h2>
                <p className="font-medium text-black/80 mb-6">
                    Kami mengudara di {networks.length} kota besar di Indonesia. Temukan frekuensi Prambors di kotamu!
                </p>
                <div className="flex items-center gap-2 font-bold opacity-75">
                    <Globe size={20} />
                    <span>Streaming Worldwide</span>
                </div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {networks.map((net, idx) => (
                    <div key={idx} className="bg-black/10 hover:bg-black/20 backdrop-blur-sm p-4 rounded-xl transition-colors cursor-default border border-black/5">
                        <h4 className="font-bold text-lg">{net.city}</h4>
                        <p className="font-black text-2xl tracking-tighter">{net.freq}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-12">
         <div>
            <h2 className="text-2xl font-black italic mb-6">CONNECT WITH US</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-prambors-yellow" />
                    </div>
                    <div>
                        <h5 className="font-bold text-white text-sm">Headquarters</h5>
                        <p className="text-sm">{aboutData.contact.address}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                        <Mail size={20} className="text-prambors-yellow" />
                    </div>
                    <div>
                        <h5 className="font-bold text-white text-sm">General Inquiries</h5>
                        <p className="text-sm">{aboutData.contact.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                        <Phone size={20} className="text-prambors-yellow" />
                    </div>
                    <div>
                        <h5 className="font-bold text-white text-sm">Advertising</h5>
                        <p className="text-sm">{aboutData.contact.phone}</p>
                    </div>
                </div>
            </div>
         </div>
         <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
            <h3 className="font-bold text-white mb-4">Partner With Us</h3>
            <p className="text-sm text-gray-400 mb-6">
                Ingin brand kamu didengar jutaan anak muda Indonesia? Hubungi tim marketing kami sekarang.
            </p>
            <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                Download Media Kit
            </button>
         </div>
      </section>

    </div>
  );
};

export default About;