import React, { useState } from 'react';
import Hero from '../components/Hero';
import StudentCard from '../components/StudentCard';

interface StudentsProps {
  onNavigate: (page: string) => void;
}

const studentsSample = [
  { name: 'Adamu Bello', grade: 'Grade 5', email: 'adamu.bello@student.school.edu' },
  { name: 'Fatima Ali', grade: 'Grade 7', email: 'fatima.ali@student.school.edu' },
  { name: 'Chinedu Okonkwo', grade: 'Grade 9', email: 'chinedu.okonkwo@student.school.edu' },
];

const Students: React.FC<StudentsProps> = ({ onNavigate }) => {
  const [refresh, setRefresh] = useState<Record<number, number>>({});

  const handleUpload = async (id: number, file: File | null) => {
    if (!file) return;
    const fd = new FormData();
    fd.append('type', 'student');
    fd.append('id', String(id));
    fd.append('image', file);
    try {
      const res = await fetch('upload.php', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.success) setRefresh(prev => ({ ...prev, [id]: Date.now() }));
      else alert('Upload failed');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title="Students Learning Together"
        subtitle="A supportive environment for collaborative learning and growth."
        ctaPrimary={{ label: 'Register', onClick: () => onNavigate('login') }}
        ctaSecondary={{ label: 'View Programs', onClick: () => onNavigate('about') }}
        imageUrl={`https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop`}
      />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-4 shadow-sm">
          <div className="profile-grid">
            {studentsSample.map((s, i) => {
              const id = i + 1;
              return (
                <div key={i}>
                  <StudentCard id={id} type="student" cacheBuster={refresh[id]} name={s.name} grade={s.grade} email={s.email} />
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={e => handleUpload(id, e.target.files ? e.target.files[0] : null)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Students;
