
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  grade: string;
  attendance: number;
  performance: number[]; // Weekly scores
  timetable: TimetableEntry[];
}

export interface Teacher extends User {
  subject: string;
  classes: string[];
}

export interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  room: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface GradeRecord {
  id: string;
  studentName: string;
  subject: string;
  score: number;
  date: string;
}
