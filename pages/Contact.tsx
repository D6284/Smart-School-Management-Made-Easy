
import React from 'react';

interface ContactProps {
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center bg-white border-b border-slate-100">
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
        <button onClick={() => onNavigate('home')} className="text-slate-600 font-bold hover:text-blue-600 transition-colors">Home</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Have questions about our system or need support? Our team is here to help your school transition smoothly to digital management.
            </p>
          </div>

          <div className="space-y-8">
            <ContactInfo icon="📍" title="Location" content="123 Academic Avenue, Knowledge Park, NY 10001" />
            <ContactInfo icon="📧" title="Email" content="support@edustream.edu" />
            <ContactInfo icon="📞" title="Phone" content="+1 (555) 012-3456" />
          </div>

          <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4">Office Hours</h4>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex justify-between"><span>Mon - Fri:</span> <span>8:00 AM - 6:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 1:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday:</span> <span>Closed</span></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Subject</label>
              <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"></textarea>
            </div>
            <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

const ContactInfo = ({ icon, title, content }: { icon: string, title: string, content: string }) => (
  <div className="flex gap-6 items-start">
    <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-lg mb-1">{title}</h4>
      <p className="text-slate-500 leading-relaxed">{content}</p>
    </div>
  </div>
);

export default Contact;
