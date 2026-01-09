import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProfileCard from '../components/ProfileCard';

interface TeachersProps {
  onNavigate: (page: string) => void;
}

const teachersSample = [
  { name: 'Mrs. Angela Perez', subject: 'Mathematics', email: 'angela.perez@school.edu', image: null },
  { name: 'Mr. John Smith', subject: 'Physics', email: 'john.smith@school.edu', image: null },
  { name: 'Ms. Amina Yusuf', subject: 'English', email: 'amina.yusuf@school.edu', image: null },
];

const Teachers: React.FC<TeachersProps> = ({ onNavigate }) => {
  const [refresh, setRefresh] = useState<Record<number, number>>({});

  const handleUpload = async (id: number, file: File | null) => {
    if (!file) return;
    const fd = new FormData();
    fd.append('type', 'teacher');
    fd.append('id', String(id));
    fd.append('image', file);
    try {
      const res = await fetch('upload.php', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.success) {
        setRefresh(prev => ({ ...prev, [id]: Date.now() }));
      } else {
        console.error('Upload error', json);
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero
        title="Meet Our Dedicated Teachers"
        subtitle="Experienced educators committed to student success and learning excellence."
        ctaPrimary={{ label: 'Contact Us', onClick: () => onNavigate('contact') }}
        ctaSecondary={{ label: 'View Dashboard', onClick: () => onNavigate('dashboard') }}
        imageUrl={`https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop`}
      />

      <main className="container mx-auto px-6 py-12">
        <div className="profile-grid">
          {teachersSample.map((t, i) => {
            const id = i + 1;
            return (
              <div key={i}>
                <ProfileCard id={id} type="teacher" cacheBuster={refresh[id]} name={t.name} subject={t.subject} email={t.email} image={t.image} />
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={e => handleUpload(id, e.target.files ? e.target.files[0] : null)} />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Teachers;
