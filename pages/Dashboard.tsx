
import React, { useState, useEffect } from 'react';
import { UserRole, Student, Teacher, TimetableEntry } from '../types';
import { MOCK_STUDENT, MOCK_TEACHER, MOCK_ADMIN, ANNOUNCEMENTS } from '../constants';
import { StatCard } from '../components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAcademicInsights } from '../geminiService';

interface DashboardProps {
  role: UserRole;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, onLogout }) => {
  const [aiInsight, setAiInsight] = useState<string>("Loading academic insights...");

  useEffect(() => {
    if (role === UserRole.STUDENT) {
      getAcademicInsights(MOCK_STUDENT.name, MOCK_STUDENT.performance).then((insight) => {
        setAiInsight(insight || "Keep up the hard work! Your consistent effort is showing in your progress.");
      });
    } else if (role === UserRole.TEACHER) {
      setAiInsight("You have 3 classes scheduled for today. Remember to mark attendance for Grade 10-A.");
    } else {
      setAiInsight("Overall school attendance is up by 4% compared to last week.");
    }
  }, [role]);

  const renderStudentView = () => {
    const chartData = MOCK_STUDENT.performance.map((score, i) => ({ name: `W${i+1}`, score }));

    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard label="Attendance" value={`${MOCK_STUDENT.attendance}%`} icon={<span className="text-xl">📅</span>} color="bg-blue-50 text-blue-600" />
          <StatCard label="Current Grade" value={MOCK_STUDENT.grade} icon={<span className="text-xl">🎓</span>} color="bg-purple-50 text-purple-600" />
          <StatCard label="Average" value="89.2" icon={<span className="text-xl">📈</span>} color="bg-green-50 text-green-600" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="p-2 bg-blue-100 rounded-lg text-blue-600">📊</span>
                Performance Trend
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{r: 4, fill: '#2563eb'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="p-2 bg-orange-100 rounded-lg text-orange-600">🕒</span>
                Weekly Timetable
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-50">
                      <th className="pb-4 font-bold text-slate-500 uppercase text-xs">Day</th>
                      <th className="pb-4 font-bold text-slate-500 uppercase text-xs">Time</th>
                      <th className="pb-4 font-bold text-slate-500 uppercase text-xs">Subject</th>
                      <th className="pb-4 font-bold text-slate-500 uppercase text-xs">Room</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_STUDENT.timetable.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 font-medium text-slate-800">{entry.day}</td>
                        <td className="py-4 text-slate-600">{entry.time}</td>
                        <td className="py-4">
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                            {entry.subject}
                          </span>
                        </td>
                        <td className="py-4 text-slate-500">{entry.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM5.884 6.607a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.121 2.121a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 111.414-1.414l.707.707zM16.707 9.293a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM13 11a2 2 0 104 0 2 2 0 00-4 0zm-1 7a1 1 0 100-2 1 1 0 000 2zm-4-1a1 1 0 11-2 0 1 1 0 012 0zm1.414-1.414a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 111.414-1.414l.707.707z" /></svg>
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">AI Smart Advisor</h4>
              <p className="text-lg leading-relaxed italic">
                "{aiInsight}"
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="p-2 bg-pink-100 rounded-lg text-pink-600">🔔</span>
                Recent Notices
              </h3>
              <div className="space-y-6">
                {ANNOUNCEMENTS.map(item => (
                  <div key={item.id} className="group cursor-pointer">
                    <p className="text-xs font-bold text-blue-600 mb-1">{item.date}</p>
                    <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</h5>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.content}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 border border-slate-100 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">
                View All Announcements
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTeacherView = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard label="Total Students" value="124" icon={<span className="text-xl">👨‍🎓</span>} color="bg-blue-50 text-blue-600" />
        <StatCard label="Classes Managed" value={MOCK_TEACHER.classes.length} icon={<span className="text-xl">🏫</span>} color="bg-orange-50 text-orange-600" />
        <StatCard label="Assignments Due" value="12" icon={<span className="text-xl">📝</span>} color="bg-green-50 text-green-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
            <span>Student Management</span>
            <button className="text-sm text-blue-600 font-bold hover:underline">+ Add Record</button>
          </h3>
          <div className="space-y-4">
            {['John Doe', 'Emma Wilson', 'Michael Ross', 'Sarah Connor'].map((name, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={`https://picsum.photos/seed/${idx + 50}/100`} className="w-10 h-10 rounded-full" alt="avatar" />
                  <div>
                    <p className="font-bold text-slate-800">{name}</p>
                    <p className="text-xs text-slate-500">Grade 10-A • Roll #{(idx + 1).toString().padStart(3, '0')}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-slate-200 text-xs font-bold rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600">Edit</button>
                  <button className="px-3 py-1 bg-white border border-slate-200 text-xs font-bold rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600">Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <ActionBtn icon="📅" label="Mark Attendance" color="bg-blue-500" />
            <ActionBtn icon="📤" label="Post Assignment" color="bg-purple-500" />
            <ActionBtn icon="📊" label="Upload Results" color="bg-emerald-500" />
            <ActionBtn icon="📢" label="Send Broadcast" color="bg-orange-500" />
          </div>
          
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <h4 className="font-bold text-slate-700 mb-2">Daily Insight</h4>
            <p className="text-sm text-slate-600 italic">"{aiInsight}"</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminView = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard label="Students" value="1,240" icon={<span className="text-xl">👨‍🎓</span>} color="bg-blue-50 text-blue-600" />
        <StatCard label="Teachers" value="48" icon={<span className="text-xl">👩‍🏫</span>} color="bg-purple-50 text-purple-600" />
        <StatCard label="Revenue" value="$42.5k" icon={<span className="text-xl">💰</span>} color="bg-green-50 text-green-600" />
        <StatCard label="Attendance" value="94%" icon={<span className="text-xl">📈</span>} color="bg-orange-50 text-orange-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">School Enrollment Statistics</h3>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-500 px-4 py-2 focus:ring-0">
              <option>This Academic Year</option>
              <option>Last Academic Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full flex items-center justify-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed">
            <div className="text-center">
              <p className="text-4xl mb-2">📈</p>
              <p className="text-sm font-bold">Enrollment Chart Placeholder</p>
              <p className="text-xs">Data analysis module loading...</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { user: 'Sarah Miller', action: 'Uploaded Grade 10 Math Results', time: '10m ago' },
                { user: 'System', action: 'Monthly backups completed', time: '1h ago' },
                { user: 'John Admin', action: 'Added new teacher profile: David Lee', time: '3h ago' }
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 bg-blue-100 rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{act.user}</p>
                    <p className="text-xs text-slate-500">{act.action}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h4 className="text-blue-700 font-bold mb-4">Admin Alert</h4>
            <p className="text-sm text-blue-600 leading-relaxed mb-4">
              Fee collection for Quarter 3 is at 78%. Send reminders to pending parents?
            </p>
            <button className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all">
              Send Reminders
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const currentUser = role === UserRole.STUDENT ? MOCK_STUDENT : role === UserRole.TEACHER ? MOCK_TEACHER : MOCK_ADMIN;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900">EduStream</span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon="🏠" label="Dashboard" active />
          <SidebarItem icon="📂" label="Resources" />
          <SidebarItem icon="💬" label="Messages" />
          <SidebarItem icon="⚙️" label="Settings" />
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-2xl bg-slate-50">
            <img src={currentUser.avatar} className="w-10 h-10 rounded-xl" alt="avatar" />
            <div className="min-w-0">
              <p className="font-bold text-sm text-slate-900 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Hello, {currentUser.name.split(' ')[0]} 👋</h2>
            <p className="text-slate-500 font-medium">Here's what's happening in your school today.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              New Task
            </button>
          </div>
        </header>

        {role === UserRole.STUDENT && renderStudentView()}
        {role === UserRole.TEACHER && renderTeacherView()}
        {role === UserRole.ADMIN && renderAdminView()}
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
    <span className="text-xl">{icon}</span>
    {label}
  </button>
);

const ActionBtn = ({ icon, label, color }: { icon: string, label: string, color: string }) => (
  <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white border border-slate-100 hover:shadow-xl hover:scale-[1.02] transition-all group">
    <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-inherit`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-center">{label}</span>
  </button>
);

export default Dashboard;
