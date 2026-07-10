// ─────────────────────────────────────────────────────────────────────────────
// Mock data for the AzTU ERP mobile app. Shapes mirror the web ERP domain
// (LMS attendance/transcript, Finance/payroll, security) so swapping in a real
// API later is a drop-in change. All copy is in Azerbaijani, matching the ERP.
// ─────────────────────────────────────────────────────────────────────────────

export const AZN = (n: number) =>
  `${n.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼`;

// ── Current user ─────────────────────────────────────────────────────────────
export const currentUser = {
  name: 'Elvin Məmmədov',
  role: 'Baş müəllim',
  department: 'İnformasiya Texnologiyaları kafedrası',
  faculty: 'Kompüter və İnformasiya Texnologiyaları fakültəsi',
  email: 'elvin.mammadov@aztu.edu.az',
  employeeNo: 'AZTU-2041',
  phone: '+994 50 xxx xx 12',
  initials: 'EM',
};

// ── Dashboard stats ──────────────────────────────────────────────────────────
export type Stat = {
  key: string;
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  icon: string;
  gradient: 'brand' | 'gold' | 'success' | 'sky' | 'purple';
};

export const dashboardStats: Stat[] = [
  { key: 'students', label: 'Tələbələr', value: '312', delta: '+18', up: true, icon: 'school', gradient: 'brand' },
  { key: 'courses', label: 'Fənlər', value: '6', delta: 'bu semestr', icon: 'book', gradient: 'purple' },
  { key: 'attendance', label: 'Davamiyyət', value: '%92', delta: '+2%', up: true, icon: 'checkmark-done', gradient: 'success' },
  { key: 'salary', label: 'Bu ay maaş', value: '2 340 ₼', delta: '15 iyul', icon: 'wallet', gradient: 'gold' },
];

export type QuickAction = {
  key: string;
  label: string;
  icon: string;
  route: string;
  tint: string;
  bg: string;
};

export const quickActions: QuickAction[] = [
  { key: 'attendance', label: 'Davamiyyət', icon: 'checkmark-done-circle', route: '/lms/attendance', tint: '#0E9F6E', bg: '#DEF7EC' },
  { key: 'transcript', label: 'Transkript', icon: 'ribbon', route: '/lms/transcript', tint: '#3D4ED6', bg: '#E5E8FF' },
  { key: 'courses', label: 'Fənlər', icon: 'book', route: '/lms/courses', tint: '#5566F0', bg: '#EEF0FF' },
  { key: 'exams', label: 'İmtahanlar', icon: 'document-text', route: '/lms/exams', tint: '#C27803', bg: '#FDF6B2' },
  { key: 'payslip', label: 'Maaş vərəqi', icon: 'receipt', route: '/finance/payslip', tint: '#F5A524', bg: '#FDEFD3' },
  { key: 'runs', label: 'Hesablamalar', icon: 'calculator', route: '/finance/runs', tint: '#0EA5E9', bg: '#E0F2FE' },
  { key: 'library', label: 'Kitabxana', icon: 'library', route: '/module/library', tint: '#7C3AED', bg: '#EDE9FE' },
  { key: 'turnstile', label: 'Keçid', icon: 'scan', route: '/module/turnstile', tint: '#E02424', bg: '#FDE8E8' },
];

// ── Today's schedule ─────────────────────────────────────────────────────────
export type ScheduleItem = {
  id: string;
  time: string;
  course: string;
  room: string;
  group: string;
  now?: boolean;
};

export const todaySchedule: ScheduleItem[] = [
  { id: 's1', time: '09:00', course: 'Verilənlər bazası', room: 'B-214', group: '650a1' },
  { id: 's2', time: '11:00', course: 'Alqoritmlər', room: 'A-108', group: '651a2', now: true },
  { id: 's3', time: '14:00', course: 'Veb proqramlaşdırma', room: 'C-305', group: '652a1' },
];

// ── Activity / notifications feed ────────────────────────────────────────────
export type Activity = {
  id: string;
  type: 'attendance' | 'finance' | 'exam' | 'security' | 'system';
  title: string;
  detail: string;
  time: string;
  unread?: boolean;
};

export const notifications: Activity[] = [
  { id: 'n1', type: 'security', title: 'Yeni cihazdan giriş', detail: 'iPhone 15 · Bakı, Azərbaycan', time: '5 dəq əvvəl', unread: true },
  { id: 'n2', type: 'finance', title: 'Maaş hesablaması təsdiqləndi', detail: 'İyul 2026 · 2 340,00 ₼', time: '2 saat əvvəl', unread: true },
  { id: 'n3', type: 'attendance', title: 'Davamiyyət qeyd olundu', detail: 'Alqoritmlər · 651a2 · 24/26 iştirak', time: 'bu gün 11:45' },
  { id: 'n4', type: 'exam', title: 'İmtahan cədvəli dərc olundu', detail: 'Yay sessiyası 2026', time: 'dünən' },
  { id: 'n5', type: 'system', title: 'Sistem yeniləməsi', detail: 'LMS modulu v2.3 istifadəyə verildi', time: '2 gün əvvəl' },
];

// ── LMS: courses ─────────────────────────────────────────────────────────────
export type Course = {
  id: string;
  name: string;
  code: string;
  group: string;
  students: number;
  attendance: number; // percent
  credits: number;
  color: string;
};

export const courses: Course[] = [
  { id: 'c1', name: 'Verilənlər bazası', code: 'CS-304', group: '650a1', students: 28, attendance: 94, credits: 6, color: '#3D4ED6' },
  { id: 'c2', name: 'Alqoritmlər və data strukturları', code: 'CS-211', group: '651a2', students: 26, attendance: 88, credits: 6, color: '#0E9F6E' },
  { id: 'c3', name: 'Veb proqramlaşdırma', code: 'CS-330', group: '652a1', students: 31, attendance: 91, credits: 5, color: '#F5A524' },
  { id: 'c4', name: 'Əməliyyat sistemləri', code: 'CS-320', group: '650a2', students: 24, attendance: 86, credits: 5, color: '#0EA5E9' },
  { id: 'c5', name: 'Kompüter şəbəkələri', code: 'CS-340', group: '651a1', students: 29, attendance: 90, credits: 4, color: '#7C3AED' },
  { id: 'c6', name: 'Süni intellekt əsasları', code: 'CS-410', group: '653a1', students: 22, attendance: 95, credits: 6, color: '#E02424' },
];

// ── LMS: attendance session ──────────────────────────────────────────────────
export type AttStatus = 'present' | 'absent' | 'late' | 'excused';

export const attStatusMeta: Record<AttStatus, { label: string; color: string; bg: string }> = {
  present: { label: 'İştirak', color: '#0E9F6E', bg: '#DEF7EC' },
  absent: { label: 'Qayıb', color: '#E02424', bg: '#FDE8E8' },
  late: { label: 'Gecikmə', color: '#C27803', bg: '#FDF6B2' },
  excused: { label: 'Üzrlü', color: '#0EA5E9', bg: '#E0F2FE' },
};

export type StudentAtt = {
  id: string;
  name: string;
  studentNo: string;
  status: AttStatus;
};

export const attendanceSession = {
  course: 'Alqoritmlər və data strukturları',
  code: 'CS-211',
  group: '651a2',
  room: 'A-108',
  date: '10 İyul 2026, Cümə',
  time: '11:00 – 12:20',
  topic: 'Qraf alqoritmləri: BFS və DFS',
  present: 22,
  total: 26,
  students: [
    { id: 'a1', name: 'Aysel Hüseynova', studentNo: '2022-0451', status: 'present' },
    { id: 'a2', name: 'Rəşad Quliyev', studentNo: '2022-0452', status: 'present' },
    { id: 'a3', name: 'Nigar Əliyeva', studentNo: '2022-0453', status: 'late' },
    { id: 'a4', name: 'Tural Məmmədli', studentNo: '2022-0454', status: 'absent' },
    { id: 'a5', name: 'Günel Rəhimova', studentNo: '2022-0455', status: 'present' },
    { id: 'a6', name: 'Elçin Sadıqov', studentNo: '2022-0456', status: 'excused' },
    { id: 'a7', name: 'Leyla Nəbiyeva', studentNo: '2022-0457', status: 'present' },
    { id: 'a8', name: 'Kamran Vəliyev', studentNo: '2022-0458', status: 'present' },
  ] as StudentAtt[],
};

// ── LMS: transcript ──────────────────────────────────────────────────────────
export type Grade = {
  id: string;
  course: string;
  code: string;
  credits: number;
  score: number;
  letter: string;
  gpa: number;
  semester: string;
};

export const transcript = {
  gpa: 3.72,
  totalCredits: 148,
  completedCredits: 132,
  rank: '14 / 210',
  grades: [
    { id: 'g1', course: 'Riyazi analiz II', code: 'MATH-102', credits: 6, score: 92, letter: 'A', gpa: 4.0, semester: '2025 Payız' },
    { id: 'g2', course: 'Diskret riyaziyyat', code: 'MATH-210', credits: 5, score: 85, letter: 'B', gpa: 3.3, semester: '2025 Payız' },
    { id: 'g3', course: 'Obyekt yönümlü proqramlaşdırma', code: 'CS-201', credits: 6, score: 96, letter: 'A', gpa: 4.0, semester: '2025 Payız' },
    { id: 'g4', course: 'Fizika I', code: 'PHYS-101', credits: 4, score: 78, letter: 'C', gpa: 2.7, semester: '2025 Yaz' },
    { id: 'g5', course: 'Verilənlər bazası', code: 'CS-304', credits: 6, score: 89, letter: 'B', gpa: 3.3, semester: '2025 Yaz' },
    { id: 'g6', course: 'İngilis dili III', code: 'ENG-301', credits: 3, score: 94, letter: 'A', gpa: 4.0, semester: '2025 Yaz' },
  ] as Grade[],
};

// ── LMS: exams ───────────────────────────────────────────────────────────────
export type Exam = {
  id: string;
  course: string;
  code: string;
  date: string;
  time: string;
  room: string;
  type: 'Aralıq' | 'Final' | 'Kollokvium';
  daysLeft: number;
};

export const exams: Exam[] = [
  { id: 'e1', course: 'Alqoritmlər', code: 'CS-211', date: '18 İyul', time: '10:00', room: 'A-201', type: 'Final', daysLeft: 8 },
  { id: 'e2', course: 'Verilənlər bazası', code: 'CS-304', date: '21 İyul', time: '13:00', room: 'B-114', type: 'Final', daysLeft: 11 },
  { id: 'e3', course: 'Veb proqramlaşdırma', code: 'CS-330', date: '24 İyul', time: '09:00', room: 'C-305', type: 'Final', daysLeft: 14 },
  { id: 'e4', course: 'Kompüter şəbəkələri', code: 'CS-340', date: '27 İyul', time: '11:00', room: 'A-108', type: 'Final', daysLeft: 17 },
];

// ── Finance: my payslip ──────────────────────────────────────────────────────
export const payslip = {
  period: 'İyul 2026',
  status: 'approved' as const,
  net: 2340.0,
  gross: 2980.0,
  payDate: '15 İyul 2026',
  earnings: [
    { id: 'p1', name: 'Baza əməkhaqqı', amount: 2400.0 },
    { id: 'p2', name: 'Elmi dərəcə əlavəsi', amount: 320.0 },
    { id: 'p3', name: 'Əlavə saatlar (12 saat)', amount: 180.0 },
    { id: 'p4', name: 'Premya', amount: 80.0 },
  ],
  deductions: [
    { id: 'd1', name: 'Gəlir vergisi', amount: 420.0 },
    { id: 'd2', name: 'Sosial sığorta (DSMF)', amount: 180.0 },
    { id: 'd3', name: 'İşsizlik sığortası', amount: 40.0 },
  ],
};

// ── Finance: payroll runs ────────────────────────────────────────────────────
export type RunStatus = 'draft' | 'calculated' | 'approved' | 'paid' | 'partially_paid' | 'cancelled';

export const runStatusMeta: Record<RunStatus, { label: string; color: string; bg: string }> = {
  draft: { label: 'Qaralama', color: '#6B7390', bg: '#EEF0F6' },
  calculated: { label: 'Hesablanıb', color: '#0EA5E9', bg: '#E0F2FE' },
  approved: { label: 'Təsdiqlənib', color: '#3D4ED6', bg: '#E5E8FF' },
  paid: { label: 'Ödənilib', color: '#0E9F6E', bg: '#DEF7EC' },
  partially_paid: { label: 'Qismən ödənilib', color: '#C27803', bg: '#FDF6B2' },
  cancelled: { label: 'Ləğv edilib', color: '#E02424', bg: '#FDE8E8' },
};

export type PayrollRun = {
  id: string;
  period: string;
  status: RunStatus;
  employees: number;
  total: number;
  createdAt: string;
};

export const payrollRuns: PayrollRun[] = [
  { id: 'r1', period: 'İyul 2026', status: 'approved', employees: 412, total: 984_500, createdAt: '05 İyul' },
  { id: 'r2', period: 'İyun 2026', status: 'paid', employees: 409, total: 972_300, createdAt: '05 İyun' },
  { id: 'r3', period: 'May 2026', status: 'paid', employees: 410, total: 968_120, createdAt: '05 May' },
  { id: 'r4', period: 'Aprel 2026', status: 'paid', employees: 408, total: 961_540, createdAt: '05 Apr' },
];

// ── Finance: bonuses ─────────────────────────────────────────────────────────
export type Bonus = {
  id: string;
  reason: string;
  employee: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved';
};

export const bonuses: Bonus[] = [
  { id: 'b1', reason: 'Elmi məqalə (Scopus)', employee: 'Elvin Məmmədov', amount: 300, date: '02 İyul', status: 'approved' },
  { id: 'b2', reason: 'Tələbə layihə rəhbərliyi', employee: 'Aygün Kərimova', amount: 200, date: '28 İyun', status: 'approved' },
  { id: 'b3', reason: 'Konfrans təşkilatı', employee: 'Rəşad Nəbiyev', amount: 250, date: '25 İyun', status: 'pending' },
];

// ── Finance: reminders ───────────────────────────────────────────────────────
export type Reminder = {
  id: string;
  title: string;
  due: string;
  urgent?: boolean;
};

export const reminders: Reminder[] = [
  { id: 'rm1', title: 'İyul maaşlarının təsdiqi', due: '14 İyul', urgent: true },
  { id: 'rm2', title: 'Vergi hesabatının göndərilməsi', due: '20 İyul' },
  { id: 'rm3', title: 'Əlavə saatların yoxlanması', due: '12 İyul', urgent: true },
];

// ── Security: sessions & devices ─────────────────────────────────────────────
export const sessions = [
  { id: 'ss1', device: 'iPhone 15 · Safari', ip: '85.132.xx.xx', location: 'Bakı', current: true, at: 'İndi aktiv' },
  { id: 'ss2', device: 'MacBook Pro · Chrome', ip: '85.132.xx.xx', location: 'Bakı', current: false, at: '2 saat əvvəl' },
  { id: 'ss3', device: 'Windows · Edge', ip: '94.20.xx.xx', location: 'Sumqayıt', current: false, at: 'dünən' },
];

export const trustedDevices = [
  { id: 'dv1', name: 'iPhone 15', trusted: true, lastSeen: 'İndi' },
  { id: 'dv2', name: 'MacBook Pro 14"', trusted: true, lastSeen: '2 saat əvvəl' },
  { id: 'dv3', name: 'Kafedra kompüteri', trusted: false, lastSeen: '3 gün əvvəl' },
];
