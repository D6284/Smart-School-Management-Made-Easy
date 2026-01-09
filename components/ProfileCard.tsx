import React from 'react';

interface ProfileCardProps {
  id?: number;
  type?: 'teacher' | 'student' | 'admin';
  name: string;
  role?: string;
  subject?: string;
  email?: string;
  image?: string | null;
  cacheBuster?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ id, type, name, role, subject, email, image, cacheBuster }) => {
  const placeholder = `https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60`;
  let src = image || placeholder;
  if (type && id) {
    src = `get_image.php?type=${encodeURIComponent(type)}&id=${encodeURIComponent(String(id))}` + (cacheBuster ? `&v=${cacheBuster}` : '');
  }

  return (
    <div className="profile-card">
      <img src={src} alt={`Profile of ${name}`} className="profile-avatar responsive-img" />
      <div className="profile-info">
        <h3>{name}</h3>
        {subject && <p>Subject: {subject}</p>}
        {role && <p>{role}</p>}
        {email && <a className="text-blue-600 hover:underline" href={`mailto:${email}`}>{email}</a>}
      </div>
    </div>
  );
};

export default ProfileCard;
