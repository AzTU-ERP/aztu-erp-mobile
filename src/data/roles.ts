// ─────────────────────────────────────────────────────────────────────────────
// Role model. The ERP has several user types (student, teacher/staff, finance
// admin, HR). Switching role re-skins the whole app: identity, dashboard, tab
// labels and the LMS/Finance screens. All copy is Azerbaijani.
// ─────────────────────────────────────────────────────────────────────────────
import { gradients } from '@/theme';
import { QuickAction, Stat } from '@/data';
import { hrStats } from '@/data/hr';

export type Role = 'student' | 'teacher' | 'finance' | 'hr';
type Grad = keyof typeof gradients;

export type RoleProfile = {
  name: string;
  role: string;
  org: string; // department / program
  faculty: string;
  idLabel: string;
  idValue: string;
  email: string;
  initials: string;
  gradient: Grad;
};

export const roleProfiles: Record<Role, RoleProfile> = {
  student: {
    name: 'Nihat Əliyev',
    role: 'Tələbə',
    org: 'Kompüter mühəndisliyi · 3-cü kurs',
    faculty: 'Kompüter və İnformasiya Texnologiyaları fakültəsi',
    idLabel: 'Tələbə №',
    idValue: '2022-0451',
    email: 'nihat.aliyev@stu.aztu.edu.az',
    initials: 'NƏ',
    gradient: 'sky',
  },
  teacher: {
    name: 'Elvin Məmmədov',
    role: 'Baş müəllim',
    org: 'İnformasiya Texnologiyaları kafedrası',
    faculty: 'Kompüter və İnformasiya Texnologiyaları fakültəsi',
    idLabel: 'Əməkdaş №',
    idValue: 'AZTU-2041',
    email: 'elvin.mammadov@aztu.edu.az',
    initials: 'EM',
    gradient: 'brand',
  },
  finance: {
    name: 'Aynur Hüseynova',
    role: 'Maliyyə əməkdaşı',
    org: 'Mühasibatlıq və maliyyə şöbəsi',
    faculty: 'İdarəetmə aparatı',
    idLabel: 'Əməkdaş №',
    idValue: 'AZTU-0087',
    email: 'aynur.huseynova@aztu.edu.az',
    initials: 'AH',
    gradient: 'gold',
  },
  hr: {
    name: 'Səbinə Quliyeva',
    role: 'Kadrlar şöbəsinin müdiri',
    org: 'İnsan resursları şöbəsi',
    faculty: 'İdarəetmə aparatı',
    idLabel: 'Əməkdaş №',
    idValue: 'AZTU-0043',
    email: 'sabina.quliyeva@aztu.edu.az',
    initials: 'SQ',
    gradient: 'purple',
  },
};

export const roleMeta: Record<Role, { label: string; icon: string }> = {
  student: { label: 'Tələbə', icon: 'school' },
  teacher: { label: 'Müəllim', icon: 'easel' },
  finance: { label: 'Maliyyə', icon: 'briefcase' },
  hr: { label: 'Kadrlar', icon: 'people' },
};

// Per-role tab labels/icons for the middle two tabs (lms + finance routes).
export const roleTabs: Record<
  Role,
  { lms: { label: string; icon: string; iconActive: string }; finance: { label: string; icon: string; iconActive: string } }
> = {
  student: {
    lms: { label: 'Dərslərim', icon: 'book-outline', iconActive: 'book' },
    finance: { label: 'Ödənişlər', icon: 'card-outline', iconActive: 'card' },
  },
  teacher: {
    lms: { label: 'Təhsil', icon: 'school-outline', iconActive: 'school' },
    finance: { label: 'Maaş', icon: 'wallet-outline', iconActive: 'wallet' },
  },
  finance: {
    lms: { label: 'Akademik', icon: 'stats-chart-outline', iconActive: 'stats-chart' },
    finance: { label: 'Maliyyə', icon: 'briefcase-outline', iconActive: 'briefcase' },
  },
  hr: {
    lms: { label: 'İşçilər', icon: 'people-outline', iconActive: 'people' },
    finance: { label: 'İşə qəbul', icon: 'megaphone-outline', iconActive: 'megaphone' },
  },
};

// ── Dashboard config per role ────────────────────────────────────────────────
export type HomeFocus = 'schedule' | 'approvals';

type DashboardCfg = {
  stats: Stat[];
  actions: QuickAction[];
  focus: HomeFocus;
  attentionTitle: string;
};

export const roleDashboard: Record<Role, DashboardCfg> = {
  student: {
    stats: [
      { key: 'gpa', label: 'GPA', value: '3.72', delta: '+0.08', up: true, icon: 'ribbon', gradient: 'brand' },
      { key: 'att', label: 'Davamiyyət', value: '%94', delta: 'yaxşı', up: true, icon: 'checkmark-done', gradient: 'success' },
      { key: 'credit', label: 'Kredit', value: '132', delta: '16 qalıb', icon: 'layers', gradient: 'purple' },
      { key: 'tuition', label: 'Borc', value: '450 ₼', delta: '20 iyul', icon: 'card', gradient: 'gold' },
    ],
    actions: [
      { key: 'transcript', label: 'Transkript', icon: 'ribbon', route: '/lms/transcript', tint: '#3D4ED6', bg: '#E5E8FF' },
      { key: 'attendance', label: 'Davamiyyət', icon: 'checkmark-done-circle', route: '/lms/attendance', tint: '#0E9F6E', bg: '#DEF7EC' },
      { key: 'exams', label: 'İmtahanlar', icon: 'document-text', route: '/lms/exams', tint: '#C27803', bg: '#FDF6B2' },
      { key: 'courses', label: 'Cədvəl', icon: 'calendar', route: '/lms/courses', tint: '#5566F0', bg: '#EEF0FF' },
      { key: 'tuition', label: 'Ödənişlər', icon: 'card', route: '/finance', tint: '#F5A524', bg: '#FDEFD3' },
      { key: 'library', label: 'Kitabxana', icon: 'library', route: '/module/library', tint: '#7C3AED', bg: '#EDE9FE' },
      { key: 'card', label: 'Tələbə kartı', icon: 'id-card', route: '/module/turnstile', tint: '#0EA5E9', bg: '#E0F2FE' },
      { key: 'chat', label: 'Mesajlar', icon: 'chatbubbles', route: '/messages', tint: '#E02424', bg: '#FDE8E8' },
    ],
    focus: 'schedule',
    attentionTitle: 'Mənim davamiyyətim',
  },
  teacher: {
    stats: [
      { key: 'students', label: 'Tələbələr', value: '312', delta: '+18', up: true, icon: 'school', gradient: 'brand' },
      { key: 'courses', label: 'Fənlər', value: '6', delta: 'bu semestr', icon: 'book', gradient: 'purple' },
      { key: 'attendance', label: 'Davamiyyət', value: '%92', delta: '+2%', up: true, icon: 'checkmark-done', gradient: 'success' },
      { key: 'salary', label: 'Bu ay maaş', value: '2 340 ₼', delta: '15 iyul', icon: 'wallet', gradient: 'gold' },
    ],
    actions: [
      { key: 'attendance', label: 'Davamiyyət', icon: 'checkmark-done-circle', route: '/lms/attendance', tint: '#0E9F6E', bg: '#DEF7EC' },
      { key: 'courses', label: 'Fənlər', icon: 'book', route: '/lms/courses', tint: '#5566F0', bg: '#EEF0FF' },
      { key: 'exams', label: 'İmtahanlar', icon: 'document-text', route: '/lms/exams', tint: '#C27803', bg: '#FDF6B2' },
      { key: 'transcript', label: 'Qiymətlər', icon: 'ribbon', route: '/lms/transcript', tint: '#3D4ED6', bg: '#E5E8FF' },
      { key: 'payslip', label: 'Maaş vərəqi', icon: 'receipt', route: '/finance/payslip', tint: '#F5A524', bg: '#FDEFD3' },
      { key: 'library', label: 'Kitabxana', icon: 'library', route: '/module/library', tint: '#7C3AED', bg: '#EDE9FE' },
      { key: 'turnstile', label: 'Keçid', icon: 'scan', route: '/module/turnstile', tint: '#0EA5E9', bg: '#E0F2FE' },
      { key: 'chat', label: 'Mesajlar', icon: 'chatbubbles', route: '/messages', tint: '#E02424', bg: '#FDE8E8' },
    ],
    focus: 'schedule',
    attentionTitle: 'Semestr davamiyyəti',
  },
  finance: {
    stats: [
      { key: 'fund', label: 'Maaş fondu', value: '984K ₼', delta: 'İyul', icon: 'cash', gradient: 'brand' },
      { key: 'employees', label: 'Əməkdaş', value: '412', delta: '+3', up: true, icon: 'people', gradient: 'purple' },
      { key: 'pending', label: 'Təsdiq gözləyən', value: '4', delta: 'təcili', icon: 'hourglass', gradient: 'gold' },
      { key: 'bonus', label: 'Premya', value: '12', delta: 'bu ay', icon: 'gift', gradient: 'success' },
    ],
    actions: [
      { key: 'runs', label: 'Hesablamalar', icon: 'calculator', route: '/finance/runs', tint: '#0EA5E9', bg: '#E0F2FE' },
      { key: 'employees', label: 'Əməkdaşlar', icon: 'people', route: '/module/hr', tint: '#3D4ED6', bg: '#E5E8FF' },
      { key: 'bonuses', label: 'Premyalar', icon: 'gift', route: '/finance/bonuses', tint: '#7C3AED', bg: '#EDE9FE' },
      { key: 'exports', label: 'İxraclar', icon: 'download', route: '/module/exports', tint: '#0E9F6E', bg: '#DEF7EC' },
      { key: 'reminders', label: 'Xatırlatma', icon: 'alarm', route: '/finance', tint: '#E02424', bg: '#FDE8E8' },
      { key: 'reports', label: 'Hesabatlar', icon: 'bar-chart', route: '/module/exports', tint: '#C27803', bg: '#FDF6B2' },
      { key: 'tax', label: 'Vergilər', icon: 'document-attach', route: '/finance/runs', tint: '#0891B2', bg: '#CFFAFE' },
      { key: 'chat', label: 'Mesajlar', icon: 'chatbubbles', route: '/messages', tint: '#5566F0', bg: '#EEF0FF' },
    ],
    focus: 'approvals',
    attentionTitle: 'Bu ayın maaş icmalı',
  },
  hr: {
    stats: [
      { key: 'vacancies', label: 'Açıq vakansiya', value: String(hrStats.openVacancies), delta: 'işə qəbul', icon: 'briefcase', gradient: 'brand' },
      { key: 'applications', label: 'Müraciət', value: String(hrStats.applications), delta: 'baxış gözləyir', icon: 'documents', gradient: 'purple' },
      { key: 'active', label: 'Aktiv işçi', value: String(hrStats.activeEmployees), delta: 'kadr uçotu', icon: 'people', gradient: 'success' },
      { key: 'onboarding', label: 'Qəbul prosesi', value: String(hrStats.onboarding), delta: 'davam edir', icon: 'person-add', gradient: 'gold' },
    ],
    actions: [
      { key: 'vacancies', label: 'Vakansiyalar', icon: 'briefcase', route: '/hr/vacancies', tint: '#E02424', bg: '#FDE8E8' },
      { key: 'applications', label: 'Müraciətlər', icon: 'documents', route: '/hr/applications', tint: '#3D4ED6', bg: '#E5E8FF' },
      { key: 'employees', label: 'İşçilər', icon: 'people', route: '/hr/employees', tint: '#0E9F6E', bg: '#DEF7EC' },
      { key: 'onboarding', label: 'Qəbul', icon: 'person-add', route: '/hr/employees', tint: '#C27803', bg: '#FDF6B2' },
      { key: 'templates', label: 'Şablonlar', icon: 'copy', route: '/hr/templates', tint: '#7C3AED', bg: '#EDE9FE' },
      { key: 'emails', label: 'E-poçt', icon: 'mail', route: '/hr/emails', tint: '#0EA5E9', bg: '#E0F2FE' },
      { key: 'panel', label: 'HR paneli', icon: 'grid', route: '/hr', tint: '#5566F0', bg: '#EEF0FF' },
      { key: 'chat', label: 'Mesajlar', icon: 'chatbubbles', route: '/messages', tint: '#F5A524', bg: '#FDEFD3' },
    ],
    focus: 'approvals',
    attentionTitle: 'İşə qəbul icmalı',
  },
};

// Pending approvals (finance home focus)
export const approvals = [
  { id: 'ap1', title: 'İyul maaş hesablaması', detail: '412 əməkdaş · 984 500 ₼', urgent: true },
  { id: 'ap2', title: 'Premya sorğusu — R. Nəbiyev', detail: 'Konfrans təşkilatı · 250 ₼', urgent: false },
  { id: 'ap3', title: 'Əlavə saatlar — İT kafedrası', detail: '48 saat · yoxlama gözləyir', urgent: true },
];

// ── Student tuition ──────────────────────────────────────────────────────────
export const tuition = {
  total: 3600,
  paid: 3150,
  balance: 450,
  dueDate: '20 İyul 2026',
  year: '2025 / 2026 tədris ili',
  installments: [
    { id: 't1', label: '1-ci hissə', amount: 900, status: 'paid', date: '15 Sen 2025' },
    { id: 't2', label: '2-ci hissə', amount: 900, status: 'paid', date: '15 Dek 2025' },
    { id: 't3', label: '3-cü hissə', amount: 900, status: 'paid', date: '15 Mar 2026' },
    { id: 't4', label: '4-cü hissə', amount: 900, status: 'due', date: '20 İyul 2026' },
  ] as { id: string; label: string; amount: number; status: 'paid' | 'due'; date: string }[],
  scholarship: { active: true, amount: 150, label: 'Təqaüd (aylıq)' },
};

// ── Teacher personal payment history ─────────────────────────────────────────
export const myPayments = [
  { id: 'mp1', period: 'İyul 2026', net: 2340, status: 'approved' as const, date: '15 İyul' },
  { id: 'mp2', period: 'İyun 2026', net: 2280, status: 'paid' as const, date: '15 İyun' },
  { id: 'mp3', period: 'May 2026', net: 2280, status: 'paid' as const, date: '15 May' },
  { id: 'mp4', period: 'Aprel 2026', net: 2410, status: 'paid' as const, date: '15 Apr' },
];

// ── Chat / messaging ─────────────────────────────────────────────────────────
export type ChatMessage = { id: string; mine: boolean; text: string; time: string };
export type Conversation = {
  id: string;
  name: string;
  subtitle: string;
  initials: string;
  gradient: Grad;
  last: string;
  time: string;
  unread: number;
  online: boolean;
};

export const conversations: Conversation[] = [
  { id: 'c-dekan', name: 'Dekanlıq', subtitle: 'KİT fakültəsi', initials: 'DK', gradient: 'brand', last: 'Sənədləri sabah təqdim edin.', time: '09:24', unread: 2, online: true },
  { id: 'c-aygun', name: 'Aygün Kərimova', subtitle: 'Kafedra müdiri', initials: 'AK', gradient: 'purple', last: 'Cədvəldə dəyişiklik var idi.', time: 'dünən', unread: 0, online: true },
  { id: 'c-finance', name: 'Maliyyə şöbəsi', subtitle: 'Mühasibatlıq', initials: 'MŞ', gradient: 'gold', last: 'Maaş vərəqiniz hazırdır.', time: 'dünən', unread: 1, online: false },
  { id: 'c-it', name: 'İT Dəstək', subtitle: 'help@aztu.edu.az', initials: 'İT', gradient: 'sky', last: 'Problemi həll etdik, yoxlayın.', time: 'B.e', unread: 0, online: true },
  { id: 'c-rashad', name: 'Rəşad Quliyev', subtitle: 'Tələbə · 651a2', initials: 'RQ', gradient: 'success', last: 'Müəllim, imtahan sualları?', time: 'B.', unread: 0, online: false },
];

export const chatThreads: Record<string, ChatMessage[]> = {
  'c-dekan': [
    { id: 'm1', mine: false, text: 'Salam, semestr hesabatını hazırlaya bildiniz?', time: '09:10' },
    { id: 'm2', mine: true, text: 'Salam, bəli. Bu gün göndərəcəyəm.', time: '09:14' },
    { id: 'm3', mine: false, text: 'Əla. Sənədləri sabah təqdim edin.', time: '09:24' },
  ],
  'c-finance': [
    { id: 'm1', mine: false, text: 'İyul ayı üçün maaş vərəqiniz hazırdır.', time: '14:02' },
    { id: 'm2', mine: true, text: 'Təşəkkür edirəm, baxıram.', time: '14:05' },
  ],
  'c-it': [
    { id: 'm1', mine: true, text: 'Salam, LMS-ə giriş edə bilmirəm.', time: '11:20' },
    { id: 'm2', mine: false, text: 'Yoxlayırıq. Bir neçə dəqiqə gözləyin.', time: '11:22' },
    { id: 'm3', mine: false, text: 'Problemi həll etdik, yoxlayın.', time: '11:35' },
  ],
};

export const defaultThread: ChatMessage[] = [
  { id: 'd1', mine: false, text: 'Salam! Necə kömək edə bilərəm?', time: '10:00' },
];
