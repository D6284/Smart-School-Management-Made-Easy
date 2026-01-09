import React from 'react';

interface StudentCardProps {
  id?: number;
  type?: 'student' | 'teacher' | 'admin';
  name: string;
  grade?: string;
  email?: string;
  image?: string | null;
  cacheBuster?: number;
}

const StudentCard: React.FC<StudentCardProps> = ({ id, type = 'student', name, grade, email, image, cacheBuster }) => {
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E2E8F0&color=1F2937&size=128`;
  let avatar = image || defaultAvatar;
  if (id && type) avatar = `get_image.php?type=${encodeURIComponent(type)}&id=${encodeURIComponent(String(id))}` + (cacheBuster ? `&v=${cacheBuster}` : '');
  return (
    <div className="profile-card" style={{padding:'10px'}}>
      <img src={avatar} alt={`Avatar of ${name}`} className="profile-avatar-sm responsive-img" />
      <div className="profile-info">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h4 style={{margin:0}} className="font-medium">{name}</h4>
          {grade && <span className="text-sm text-slate-500">{grade}</span>}
        </div>
        {email && <p className="text-sm text-slate-500">{email}</p>}
      </div>
    </div>
  );
};

export default StudentCard;
