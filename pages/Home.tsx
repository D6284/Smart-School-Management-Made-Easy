
import React from 'react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen gradient-bg">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">EduStream</span>
        </div>
        <div className="hidden md:flex gap-8 items-center font-medium text-slate-600">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">Home</button>
          <button onClick={() => onNavigate('about')} className="hover:text-blue-600 transition-colors">About</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-blue-600 transition-colors">Contact</button>
          <button 
            onClick={() => onNavigate('login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Smart School <br />
            <span className="text-blue-600">Management</span> Made Easy
          </h1>
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            Revolutionize your academic environment with our all-in-one digital platform. Streamline communication, track performance, and empower students, teachers, and admins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('login')}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200/50"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-white text-blue-600 border border-blue-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              Learn More
            </button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-slate-400">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i + 10}/100`} className="w-10 h-10 rounded-full border-2 border-white" alt="user" />
              ))}
            </div>
            <p className="text-sm font-medium">Trusted by 50+ Modern Schools</p>
          </div>
        </div>

        <div className="relative hidden lg:block animate-in fade-in slide-in-from-right duration-700">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 -z-10 animate-pulse"></div>
          <img 
            src="https://picsum.photos/seed/school/800/600" 
            alt="Dashboard Preview" 
            className="rounded-3xl shadow-2xl border-4 border-white/50"
          />
          <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Attendance Rate</p>
              <p className="text-xl font-bold">98.5% This Month</p>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Empowering Every Role</h2>
            <p className="text-slate-500 mt-2">Specialized tools designed for the whole academic community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="For Students" 
              desc="Access study materials, track grades, and view personalized timetables in one tap."
              icon="🎓"
            />
            <FeatureCard 
              title="For Teachers" 
              desc="Effortlessly manage attendance, post assignments, and communicate with parents."
              icon="✍️"
            />
            <FeatureCard 
              title="For Admins" 
              desc="Comprehensive oversight with advanced analytics and centralized resource management."
              icon="🛡️"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-50 group">
    <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
