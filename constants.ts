
import { UserRole, Student, Teacher, Announcement, TimetableEntry } from './types';

export const MOCK_STUDENT: Student = {
  id: 'S001',
  name: 'Alex Johnson',
  email: 'alex.j@school.edu',
  role: UserRole.STUDENT,
  avatar: 'https://picsum.photos/seed/alex/200',
  grade: '10th Grade',
  attendance: 92,
  performance: [85, 88, 76, 92, 95, 89, 91],
  timetable: [
    { day: 'Mon', time: '09:00 AM', subject: 'Mathematics', room: 'B101' },
    { day: 'Mon', time: '11:00 AM', subject: 'Physics', room: 'Lab 2' },
    { day: 'Tue', time: '10:00 AM', subject: 'English', room: 'A204' },
    { day: 'Wed', time: '09:00 AM', subject: 'Computer Science', room: 'IT Lab' },
  ]
};

export const MOCK_TEACHER: Teacher = {
  id: 'T001',
  name: 'Prof. Sarah Miller',
  email: 's.miller@school.edu',
  role: UserRole.TEACHER,
  avatar: 'https://picsum.photos/seed/sarah/200',
  subject: 'Mathematics',
  classes: ['Grade 10-A', 'Grade 11-B', 'Grade 9-C']
};

export const MOCK_ADMIN = {
  id: 'A001',
  name: 'Administrator Smith',
  email: 'admin@school.edu',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/admin/200'
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Final Exam Schedule Posted',
    content: 'The final exam schedule for the Winter semester is now available in the portal.',
    date: '2024-05-15',
    author: 'Academic Office'
  },
  {
    id: '2',
    title: 'School Picnic Postponed',
    content: 'Due to expected rain, the annual picnic is moved to next Friday.',
    date: '2024-05-18',
    author: 'Principal'
  }
];
