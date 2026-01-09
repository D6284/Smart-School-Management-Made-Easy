import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProfileCard from '../components/ProfileCard';

interface AdminProps {
  onNavigate: (page: string) => void;
}

const adminsSample = [
  { name: 'Principal - Dr. Grace Nwosu', role: 'Principal', email: 'grace.nwosu@school.edu', image: null },
  { name: 'Mr. Emmanuel Ade', role: 'Head of Operations', email: 'emmanuel.ade@school.edu', image: null },
];

const Administration: React.FC<AdminProps> = ({ onNavigate }) => {
  const [refresh, setRefresh] = useState<Record<number, number>>({});

  const handleUpload = async (id: number, file: File | null) => {
    if (!file) return;
    const fd = new FormData();
    fd.append('type', 'admin');
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
    <div className="min-h-screen bg-slate-50">
      <Hero
        title="School Administration"
        subtitle="Management team ensuring smooth operations and student success."
        ctaPrimary={{ label: 'Contact Admin', onClick: () => onNavigate('contact') }}
        ctaSecondary={{ label: 'Dashboard', onClick: () => onNavigate('dashboard') }}
        imageUrl={`https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop`}
      />

      <main className="container mx-auto px-6 py-12">
        <div className="profile-grid">
          {adminsSample.map((a, i) => {
            const id = i + 1;
            return (
              <div key={i}>
                <ProfileCard id={id} type="admin" cacheBuster={refresh[id]} name={a.name} role={a.role} email={a.email} image={a.image} />
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

export default Administration;
