
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (page: string) => void;
}

const DEMO_CREDENTIALS = [
  { role: UserRole.ADMIN, username: 'admin01', email: 'admin@school.com', password: 'Admin@123' },
  { role: UserRole.TEACHER, username: 'teacher01', email: 'teacher@school.com', password: 'Teach@123' },
  { role: UserRole.STUDENT, username: 'student01', email: 'student@school.com', password: 'Stud@123' },
];

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo validation logic
    const matchedUser = DEMO_CREDENTIALS.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (matchedUser) {
      onLogin(role);
    } else {
      setError('Invalid credentials for the selected role. Please check the demo table below.');
    }
  };

  const quickLogin = (creds: typeof DEMO_CREDENTIALS[0]) => {
    setRole(creds.role);
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 space-y-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 bg-blue-600 text-white text-center">
          <div 
            className="flex items-center justify-center gap-2 mb-4 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span className="text-2xl font-bold tracking-tight">EduStream</span>
          </div>
          <h2 className="text-xl font-medium">{isRegistering ? 'Create Account' : 'Welcome Back!'}</h2>
          <p className="text-blue-100 text-sm mt-1">{isRegistering ? 'Join our academic community' : 'Please enter your details to login'}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Login as</label>
              <div className="grid grid-cols-3 gap-2">
                {[UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      role === r 
                      ? 'bg-blue-50 border-blue-600 text-blue-600' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-medium rounded-lg animate-pulse">
                  {error}
                </div>
              )}
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"} 
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="ml-2 text-blue-600 font-bold hover:underline"
              >
                {isRegistering ? 'Login' : 'Register'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Demo Credentials Section */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-xl p-8 animate-in slide-in-from-bottom duration-500 delay-150">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Demo Access Portal</h3>
            <p className="text-xs text-slate-500">For internship project testing purposes only.</p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase rounded-full">Test Environment</span>
        </div>
        
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Password</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {DEMO_CREDENTIALS.map((creds) => (
                <tr key={creds.role} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      creds.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' :
                      creds.role === UserRole.TEACHER ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {creds.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{creds.username}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{creds.email}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{creds.password}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => quickLogin(creds)}
                      className="text-blue-600 font-bold text-xs hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Quick Fill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-[10px] text-slate-400 italic">
          Tip: Click "Quick Fill" to automatically populate the login form for testing.
        </p>
      </div>
    </div>
  );
};

export default Login;
