
import React from 'react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-100">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-slate-900">EduStream</span>
        </div>
        <button onClick={() => onNavigate('home')} className="text-slate-600 font-bold hover:text-blue-600 transition-colors">Back to Home</button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Our Vision for <span className="text-blue-600">Modern Education</span></h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            EduStream was born from the need to bridge the gap between traditional teaching methods and the digital possibilities of the 21st century. We believe that technology should empower educators, not complicate their work.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Why Digital Management?</h3>
            <p className="text-slate-600 leading-relaxed">
              In a rapidly evolving world, information must be accessible, accurate, and actionable. Paper-based systems are prone to errors and lack the insights needed to truly help students succeed. EduStream centralizes data to provide a holistic view of school operations.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Benefits to Society</h3>
            <p className="text-slate-600 leading-relaxed">
              By optimizing school administration, we allow teachers to focus on what matters most: teaching. Better data leads to better interventions, ensuring no student falls through the cracks. This directly contributes to a more educated and resilient workforce.
            </p>
          </div>
        </div>

        <section className="bg-blue-50 p-12 rounded-3xl space-y-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Core Pillars</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="text-4xl">🤝</div>
              <h4 className="font-bold text-slate-900">Transparency</h4>
              <p className="text-sm text-slate-500">Real-time updates for parents and students on progress.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-4xl">⚡</div>
              <h4 className="font-bold text-slate-900">Efficiency</h4>
              <p className="text-sm text-slate-500">Automate repetitive tasks like attendance and reports.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-4xl">🛡️</div>
              <h4 className="font-bold text-slate-900">Security</h4>
              <p className="text-sm text-slate-500">Student data protected with industry-standard encryption.</p>
            </div>
          </div>
        </section>

        <div className="text-center py-12">
          <button 
            onClick={() => onNavigate('login')}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl"
          >
            Ready to Transform Your School?
          </button>
        </div>
      </main>
    </div>
  );
};

export default About;
