// ─────────────────────────────────────────────────────────────────────────────
// HR module data. Mirrors the web HR-ERP domain (vacancies → applications →
// employees, plus email templates & delivery log) so a real API swap is a
// drop-in later. All copy is Azerbaijani, matching the rest of the app.
// ─────────────────────────────────────────────────────────────────────────────

export type StatusMeta = { label: string; color: string; bg: string };

// ── Enum-ish labels ──────────────────────────────────────────────────────────
export type JobType = 'full_time' | 'part_time' | 'hourly';
export type Category = 'alumni' | 'aztu';
export type VacancyStatus = 'open' | 'closed' | 'filled';
export type AppStatus = 'submitted' | 'screening' | 'approved' | 'rejected' | 'withdrawn';
export type ReviewDecision = 'screening' | 'approved' | 'rejected';
export type EmpStatus = 'onboarding' | 'active' | 'terminated';
export type DocType = 'contract' | 'approval_doc' | 'id_doc' | 'other';
export type TemplateType = 'approval' | 'rejection' | 'onboarding_step' | 'termination';
export type EmailStatus = 'pending' | 'sent' | 'failed';

export const jobTypeLabel: Record<JobType, string> = {
  full_time: 'Tam ştat',
  part_time: 'Yarım ştat',
  hourly: 'Saatlıq',
};

export const categoryLabel: Record<Category, string> = {
  alumni: 'Məzunlar',
  aztu: 'AzTU',
};

export const templateTypeLabel: Record<TemplateType, string> = {
  approval: 'Təsdiq',
  rejection: 'İmtina',
  onboarding_step: 'Adaptasiya addımı',
  termination: 'İşdən çıxarma',
};

export const docTypeLabel: Record<DocType, string> = {
  contract: 'Müqavilə',
  approval_doc: 'Təsdiq sənədi',
  id_doc: 'Şəxsiyyət sənədi',
  other: 'Digər',
};

// ── Status metadata (label + theme-aligned colours) ──────────────────────────
export const vacancyStatusMeta: Record<VacancyStatus, StatusMeta> = {
  open: { label: 'Açıq', color: '#0E9F6E', bg: '#DEF7EC' },
  closed: { label: 'Bağlı', color: '#6B7390', bg: '#EEF0F6' },
  filled: { label: 'Tutulub', color: '#0EA5E9', bg: '#E0F2FE' },
};

export const appStatusMeta: Record<AppStatus, StatusMeta> = {
  submitted: { label: 'Göndərilib', color: '#0EA5E9', bg: '#E0F2FE' },
  screening: { label: 'Baxılır', color: '#C27803', bg: '#FDF6B2' },
  approved: { label: 'Təsdiqlənib', color: '#0E9F6E', bg: '#DEF7EC' },
  rejected: { label: 'Rədd edilib', color: '#E02424', bg: '#FDE8E8' },
  withdrawn: { label: 'Geri götürülüb', color: '#6B7390', bg: '#EEF0F6' },
};

export const empStatusMeta: Record<EmpStatus, StatusMeta> = {
  onboarding: { label: 'Qəbul prosesi', color: '#C27803', bg: '#FDF6B2' },
  active: { label: 'Aktiv', color: '#0E9F6E', bg: '#DEF7EC' },
  terminated: { label: 'İşdən çıxarılıb', color: '#E02424', bg: '#FDE8E8' },
};

export const emailStatusMeta: Record<EmailStatus, StatusMeta> = {
  pending: { label: 'Gözləyir', color: '#C27803', bg: '#FDF6B2' },
  sent: { label: 'Göndərilib', color: '#0E9F6E', bg: '#DEF7EC' },
  failed: { label: 'Uğursuz', color: '#E02424', bg: '#FDE8E8' },
};

// ── Domain types ─────────────────────────────────────────────────────────────
export type Vacancy = {
  id: string;
  jobTitle: string;
  department: string;
  jobType: JobType;
  category: Category;
  salary: number | null;
  status: VacancyStatus;
  description: string;
  applicants: number;
  openedAt: string;
  closesAt: string | null;
};

export type ApplicationReview = {
  id: string;
  decision: ReviewDecision;
  reason: string | null;
  reviewedBy: string;
  reviewedAt: string;
};

export type Application = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  vacancyId: string;
  vacancyTitle: string;
  category: Category;
  cv: string | null;
  source: string;
  status: AppStatus;
  submittedAt: string;
  reviews: ApplicationReview[];
};

export type EmployeeDocument = {
  id: string;
  docType: DocType;
  name: string;
  size: string;
  uploadedAt: string;
};

export type ScheduleRow = {
  id: string;
  day: string;
  start: string;
  end: string;
  hours: number;
};

export type Employee = {
  id: string;
  name: string;
  surname: string;
  email: string;
  department: string;
  jobTitle: string;
  jobType: JobType;
  salary: number | null;
  status: EmpStatus;
  userId: string | null;
  approvedAt: string | null;
  officialAt: string | null;
  documents: EmployeeDocument[];
  schedule: ScheduleRow[];
};

export type HrTemplate = {
  id: string;
  type: TemplateType;
  name: string;
  subject: string;
  body: string;
  active: boolean;
  updatedAt: string;
};

export type EmailLog = {
  id: string;
  to: string;
  subject: string;
  status: EmailStatus;
  sentAt: string | null;
  createdAt: string;
};

// ── Departments ──────────────────────────────────────────────────────────────
export const departments = [
  'İnformasiya Texnologiyaları kafedrası',
  'Kompüter mühəndisliyi kafedrası',
  'Riyaziyyat kafedrası',
  'Elektronika və avtomatika kafedrası',
  'İqtisadiyyat və menecment kafedrası',
  'Mexanika mühəndisliyi kafedrası',
];

// ── Vacancies ────────────────────────────────────────────────────────────────
export const vacancies: Vacancy[] = [
  {
    id: 'v1',
    jobTitle: 'Baş müəllim — Verilənlər bazası',
    department: 'İnformasiya Texnologiyaları kafedrası',
    jobType: 'full_time',
    category: 'aztu',
    salary: 1800,
    status: 'open',
    description:
      'Verilənlər bazası və proqram mühəndisliyi fənləri üzrə mühazirə və laboratoriya dərslərini aparmaq. Elmi-tədqiqat işlərinə cəlb olunmaq.',
    applicants: 14,
    openedAt: '02 İyul 2026',
    closesAt: '31 İyul 2026',
  },
  {
    id: 'v2',
    jobTitle: 'Laboratoriya assistenti',
    department: 'Elektronika və avtomatika kafedrası',
    jobType: 'part_time',
    category: 'alumni',
    salary: 720,
    status: 'open',
    description:
      'Elektronika laboratoriyalarında dərs prosesinə texniki dəstək, avadanlığın hazırlanması və tələbələrə mentorluq.',
    applicants: 9,
    openedAt: '28 İyun 2026',
    closesAt: '20 İyul 2026',
  },
  {
    id: 'v3',
    jobTitle: 'Saatlıq müəllim — Riyazi analiz',
    department: 'Riyaziyyat kafedrası',
    jobType: 'hourly',
    category: 'aztu',
    salary: null,
    status: 'open',
    description: 'Riyazi analiz və diskret riyaziyyat fənləri üzrə saatlıq dərslərin aparılması.',
    applicants: 6,
    openedAt: '05 İyul 2026',
    closesAt: '25 İyul 2026',
  },
  {
    id: 'v4',
    jobTitle: 'Dosent — Kompüter şəbəkələri',
    department: 'Kompüter mühəndisliyi kafedrası',
    jobType: 'full_time',
    category: 'aztu',
    salary: 2100,
    status: 'filled',
    description: 'Kompüter şəbəkələri və kibertəhlükəsizlik istiqamətində elmi və pedaqoji fəaliyyət.',
    applicants: 21,
    openedAt: '10 İyun 2026',
    closesAt: '30 İyun 2026',
  },
  {
    id: 'v5',
    jobTitle: 'Kafedra üzrə metodist',
    department: 'İqtisadiyyat və menecment kafedrası',
    jobType: 'full_time',
    category: 'alumni',
    salary: 950,
    status: 'closed',
    description: 'Tədris planlarının hazırlanması, sənəd dövriyyəsi və akkreditasiya prosesinə dəstək.',
    applicants: 11,
    openedAt: '15 May 2026',
    closesAt: '05 İyun 2026',
  },
];

// ── Applications ─────────────────────────────────────────────────────────────
export const applications: Application[] = [
  {
    id: 'a1',
    name: 'Aysel',
    surname: 'Hüseynova',
    email: 'aysel.huseynova@gmail.com',
    phone: '+994 50 234 56 78',
    vacancyId: 'v1',
    vacancyTitle: 'Baş müəllim — Verilənlər bazası',
    category: 'aztu',
    cv: 'aysel_huseynova_cv.pdf',
    source: 'AzTU Karyera',
    status: 'submitted',
    submittedAt: '08 İyul 2026, 14:20',
    reviews: [],
  },
  {
    id: 'a2',
    name: 'Rəşad',
    surname: 'Quliyev',
    email: 'rashad.quliyev@gmail.com',
    phone: '+994 55 987 65 43',
    vacancyId: 'v1',
    vacancyTitle: 'Baş müəllim — Verilənlər bazası',
    category: 'aztu',
    cv: 'rashad_quliyev_cv.pdf',
    source: 'AzTU Karyera',
    status: 'screening',
    submittedAt: '06 İyul 2026, 09:05',
    reviews: [
      { id: 'r1', decision: 'screening', reason: 'İxtisas uyğundur, müsahibəyə dəvət olunur', reviewedBy: 'HR şöbəsi', reviewedAt: '07 İyul 2026, 10:30' },
    ],
  },
  {
    id: 'a3',
    name: 'Nigar',
    surname: 'Əliyeva',
    email: 'nigar.aliyeva@gmail.com',
    phone: '+994 51 345 67 89',
    vacancyId: 'v2',
    vacancyTitle: 'Laboratoriya assistenti',
    category: 'alumni',
    cv: 'nigar_aliyeva_cv.pdf',
    source: 'AzTU Karyera',
    status: 'approved',
    submittedAt: '02 İyul 2026, 16:40',
    reviews: [
      { id: 'r2', decision: 'screening', reason: null, reviewedBy: 'HR şöbəsi', reviewedAt: '03 İyul 2026, 11:00' },
      { id: 'r3', decision: 'approved', reason: 'Təcrübəsi tələblərə uyğundur', reviewedBy: 'Kafedra müdiri', reviewedAt: '05 İyul 2026, 15:20' },
    ],
  },
  {
    id: 'a4',
    name: 'Tural',
    surname: 'Məmmədli',
    email: 'tural.mammadli@gmail.com',
    phone: '+994 70 456 78 90',
    vacancyId: 'v3',
    vacancyTitle: 'Saatlıq müəllim — Riyazi analiz',
    category: 'aztu',
    cv: null,
    source: 'Birbaşa müraciət',
    status: 'rejected',
    submittedAt: '01 İyul 2026, 12:15',
    reviews: [
      { id: 'r4', decision: 'rejected', reason: 'Tələb olunan elmi dərəcə yoxdur', reviewedBy: 'HR şöbəsi', reviewedAt: '04 İyul 2026, 09:45' },
    ],
  },
  {
    id: 'a5',
    name: 'Günel',
    surname: 'Rəhimova',
    email: 'gunel.rahimova@gmail.com',
    phone: '+994 50 567 89 01',
    vacancyId: 'v2',
    vacancyTitle: 'Laboratoriya assistenti',
    category: 'alumni',
    cv: 'gunel_rahimova_cv.pdf',
    source: 'AzTU Karyera',
    status: 'submitted',
    submittedAt: '09 İyul 2026, 08:50',
    reviews: [],
  },
  {
    id: 'a6',
    name: 'Elçin',
    surname: 'Sadıqov',
    email: 'elchin.sadigov@gmail.com',
    phone: '+994 55 678 90 12',
    vacancyId: 'v1',
    vacancyTitle: 'Baş müəllim — Verilənlər bazası',
    category: 'aztu',
    cv: 'elchin_sadigov_cv.pdf',
    source: 'AzTU Karyera',
    status: 'withdrawn',
    submittedAt: '03 İyul 2026, 18:30',
    reviews: [
      { id: 'r5', decision: 'screening', reason: null, reviewedBy: 'HR şöbəsi', reviewedAt: '04 İyul 2026, 14:00' },
    ],
  },
];

// ── Employees ────────────────────────────────────────────────────────────────
export const employees: Employee[] = [
  {
    id: 'e1',
    name: 'Nigar',
    surname: 'Əliyeva',
    email: 'nigar.aliyeva@aztu.edu.az',
    department: 'Elektronika və avtomatika kafedrası',
    jobTitle: 'Laboratoriya assistenti',
    jobType: 'part_time',
    salary: 720,
    status: 'onboarding',
    userId: null,
    approvedAt: '05 İyul 2026',
    officialAt: null,
    documents: [
      { id: 'd1', docType: 'id_doc', name: 'sexsiyyet_vesiqesi.pdf', size: '1.2 MB', uploadedAt: '06 İyul 2026' },
    ],
    schedule: [],
  },
  {
    id: 'e2',
    name: 'Elvin',
    surname: 'Məmmədov',
    email: 'elvin.mammadov@aztu.edu.az',
    department: 'İnformasiya Texnologiyaları kafedrası',
    jobTitle: 'Baş müəllim',
    jobType: 'full_time',
    salary: 1800,
    status: 'active',
    userId: 'AZTU-2041',
    approvedAt: '12 Fevral 2024',
    officialAt: '01 Mart 2024',
    documents: [
      { id: 'd2', docType: 'contract', name: 'emek_muqavilesi.pdf', size: '2.4 MB', uploadedAt: '01 Mart 2024' },
      { id: 'd3', docType: 'approval_doc', name: 'tesdiq_qerari.pdf', size: '0.8 MB', uploadedAt: '28 Fevral 2024' },
    ],
    schedule: [
      { id: 's1', day: 'Bazar ertəsi', start: '09:00', end: '13:00', hours: 4 },
      { id: 's2', day: 'Çərşənbə', start: '11:00', end: '15:00', hours: 4 },
    ],
  },
  {
    id: 'e3',
    name: 'Aygün',
    surname: 'Kərimova',
    email: 'aygun.karimova@aztu.edu.az',
    department: 'Riyaziyyat kafedrası',
    jobTitle: 'Dosent',
    jobType: 'full_time',
    salary: 2100,
    status: 'active',
    userId: 'AZTU-1987',
    approvedAt: '03 Sentyabr 2022',
    officialAt: '15 Sentyabr 2022',
    documents: [
      { id: 'd4', docType: 'contract', name: 'emek_muqavilesi.pdf', size: '2.1 MB', uploadedAt: '15 Sentyabr 2022' },
    ],
    schedule: [
      { id: 's3', day: 'Cümə axşamı', start: '09:00', end: '12:00', hours: 3 },
    ],
  },
  {
    id: 'e4',
    name: 'Rəşad',
    surname: 'Nəbiyev',
    email: 'rashad.nabiyev@aztu.edu.az',
    department: 'Kompüter mühəndisliyi kafedrası',
    jobTitle: 'Metodist',
    jobType: 'full_time',
    salary: 950,
    status: 'terminated',
    userId: 'AZTU-1650',
    approvedAt: '10 Yanvar 2021',
    officialAt: '20 Yanvar 2021',
    documents: [
      { id: 'd5', docType: 'contract', name: 'emek_muqavilesi.pdf', size: '1.9 MB', uploadedAt: '20 Yanvar 2021' },
      { id: 'd6', docType: 'other', name: 'ise_xitam_emri.pdf', size: '0.6 MB', uploadedAt: '30 İyun 2026' },
    ],
    schedule: [],
  },
];

// ── Email templates ──────────────────────────────────────────────────────────
export const templates: HrTemplate[] = [
  {
    id: 't1',
    type: 'approval',
    name: 'Müraciətin təsdiqi',
    subject: 'AzTU — Müraciətiniz təsdiqləndi',
    body: 'Hörmətli {{name}}, «{{vacancy}}» vəzifəsi üzrə müraciətiniz təsdiqləndi. Növbəti addımlar barədə tezliklə sizinlə əlaqə saxlanılacaq.',
    active: true,
    updatedAt: '20 İyun 2026',
  },
  {
    id: 't2',
    type: 'rejection',
    name: 'Müraciətin rədd edilməsi',
    subject: 'AzTU — Müraciətinizin nəticəsi',
    body: 'Hörmətli {{name}}, «{{vacancy}}» vəzifəsi üzrə müraciətinizə görə təşəkkür edirik. Təəssüf ki, bu mərhələdə müraciətiniz təsdiqlənmədi. Səbəb: {{reason}}.',
    active: true,
    updatedAt: '20 İyun 2026',
  },
  {
    id: 't3',
    type: 'onboarding_step',
    name: 'Sənədlərin təqdimi',
    subject: 'AzTU — Adaptasiya: sənədlərin təqdimi',
    body: 'Hörmətli {{name}}, işə qəbul prosesini tamamlamaq üçün müqavilə və şəxsiyyət sənədlərinizi təqdim etməyiniz xahiş olunur.',
    active: true,
    updatedAt: '18 İyun 2026',
  },
  {
    id: 't4',
    type: 'termination',
    name: 'İşdən çıxarma bildirişi',
    subject: 'AzTU — Əmək münasibətlərinə xitam',
    body: 'Hörmətli {{name}}, əmək müqaviləsinə {{reason}} əsasında xitam verilir. Hesablaşma sənədləri hazırlanır.',
    active: false,
    updatedAt: '02 May 2026',
  },
];

// ── Email delivery log ───────────────────────────────────────────────────────
export const emailLogs: EmailLog[] = [
  { id: 'm1', to: 'nigar.aliyeva@gmail.com', subject: 'AzTU — Müraciətiniz təsdiqləndi', status: 'sent', sentAt: '05 İyul 2026, 15:22', createdAt: '05 İyul 2026, 15:20' },
  { id: 'm2', to: 'tural.mammadli@gmail.com', subject: 'AzTU — Müraciətinizin nəticəsi', status: 'sent', sentAt: '04 İyul 2026, 09:47', createdAt: '04 İyul 2026, 09:45' },
  { id: 'm3', to: 'rashad.quliyev@gmail.com', subject: 'AzTU — Müsahibəyə dəvət', status: 'pending', sentAt: null, createdAt: '09 İyul 2026, 08:10' },
  { id: 'm4', to: 'invalid-address@', subject: 'AzTU — Adaptasiya: sənədlərin təqdimi', status: 'failed', sentAt: null, createdAt: '06 İyul 2026, 12:33' },
  { id: 'm5', to: 'gunel.rahimova@gmail.com', subject: 'AzTU — Müraciətiniz qəbul olundu', status: 'sent', sentAt: '09 İyul 2026, 08:52', createdAt: '09 İyul 2026, 08:50' },
  { id: 'm6', to: 'aysel.huseynova@gmail.com', subject: 'AzTU — Müraciətiniz qəbul olundu', status: 'sent', sentAt: '08 İyul 2026, 14:22', createdAt: '08 İyul 2026, 14:20' },
];

// ── Dashboard KPIs (derived from the lists above) ────────────────────────────
export const hrStats = {
  openVacancies: vacancies.filter((v) => v.status === 'open').length,
  applications: applications.length,
  activeEmployees: employees.filter((e) => e.status === 'active').length,
  onboarding: employees.filter((e) => e.status === 'onboarding').length,
  failedEmails: emailLogs.filter((m) => m.status === 'failed').length,
};

// ── Lookups ──────────────────────────────────────────────────────────────────
export const getVacancy = (id?: string) => vacancies.find((v) => v.id === id);
export const getApplication = (id?: string) => applications.find((a) => a.id === id);
export const getEmployee = (id?: string) => employees.find((e) => e.id === id);
export const fullName = (p: { name: string; surname: string }) => `${p.name} ${p.surname}`;
export const initialsOf = (p: { name: string; surname: string }) =>
  `${p.name?.[0] ?? ''}${p.surname?.[0] ?? ''}`.toUpperCase();
export const AZNlite = (n: number | null | undefined) =>
  n === null || n === undefined ? '—' : `${n.toLocaleString('az-AZ')} ₼`;
