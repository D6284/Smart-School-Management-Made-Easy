
import React, { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { UserRole } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('home');
  };

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'about':
        return <About onNavigate={navigate} />;
      case 'contact':
        return <Contact onNavigate={navigate} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={navigate} />;
      case 'dashboard':
        return userRole ? <Dashboard role={userRole} onLogout={handleLogout} /> : <Login onLogin={handleLogin} onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="transition-all duration-300">
      {renderPage()}
    </div>
  );
};

export default App;
