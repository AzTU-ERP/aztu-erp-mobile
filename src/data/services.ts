// ─────────────────────────────────────────────────────────────────────────────
// Services catalog ("Xidmətlər"). A single, role-independent list of every
// module in the ERP, grouped for the Services hub screen. Each entry carries a
// gradient + soft wash used to render a glossy 3D-style icon tile. All copy is
// Azerbaijani, matching the rest of the app.
// ─────────────────────────────────────────────────────────────────────────────

export type Service = {
  key: string;
  title: string;
  subtitle: string;
  icon: string; // Ionicons glyph name
  grad: [string, string]; // 3D icon gradient (start → end)
  wash: string; // faint diagonal tint for the card corner
  route: string;
};

export type ServiceGroup = { key: string; title: string; items: Service[] };

export const serviceGroups: ServiceGroup[] = [
  {
    key: 'edu',
    title: 'Təhsil',
    items: [
      { key: 'courses', title: 'Dərslər', subtitle: 'Fənlər və cədvəl', icon: 'book', grad: ['#5566F0', '#7C89F6'], wash: '#EEF0FF', route: '/lms/courses' },
      { key: 'attendance', title: 'Davamiyyət', subtitle: 'İştirak qeydiyyatı', icon: 'checkmark-done', grad: ['#0E9F6E', '#31C48D'], wash: '#DEF7EC', route: '/lms/attendance' },
      { key: 'exams', title: 'İmtahanlar', subtitle: 'Sessiya cədvəli', icon: 'document-text', grad: ['#F5A524', '#F7B84B'], wash: '#FDEFD3', route: '/lms/exams' },
      { key: 'transcript', title: 'Transkript', subtitle: 'Qiymətlər və GPA', icon: 'ribbon', grad: ['#3D4ED6', '#5566F0'], wash: '#E5E8FF', route: '/lms/transcript' },
    ],
  },
  {
    key: 'finance',
    title: 'Maliyyə',
    items: [
      { key: 'payments', title: 'Ödənişlər', subtitle: 'Təhsil haqqı və borc', icon: 'card', grad: ['#F5A524', '#F7B84B'], wash: '#FDEFD3', route: '/finance' },
      { key: 'payslip', title: 'Maaş vərəqi', subtitle: 'Qazanc və tutulmalar', icon: 'receipt', grad: ['#0EA5E9', '#38BDF8'], wash: '#E0F2FE', route: '/finance/payslip' },
      { key: 'runs', title: 'Hesablamalar', subtitle: 'Maaş dövrləri', icon: 'calculator', grad: ['#3D4ED6', '#5566F0'], wash: '#E5E8FF', route: '/finance/runs' },
      { key: 'bonuses', title: 'Premyalar', subtitle: 'Mükafat sorğuları', icon: 'gift', grad: ['#7C3AED', '#9F7AEA'], wash: '#EDE9FE', route: '/finance/bonuses' },
    ],
  },
  {
    key: 'admin',
    title: 'İdarəetmə',
    items: [
      { key: 'hr', title: 'İnsan resursları', subtitle: 'Vakansiya, müraciət, kadr', icon: 'people', grad: ['#232F73', '#3D4ED6'], wash: '#E5E8FF', route: '/hr' },
      { key: 'library', title: 'Kitabxana', subtitle: 'Kataloq və icarələr', icon: 'library', grad: ['#7C3AED', '#9F7AEA'], wash: '#EDE9FE', route: '/module/library' },
      { key: 'turnstile', title: 'Keçid nəzarəti', subtitle: 'Turniket jurnalı', icon: 'scan', grad: ['#E02424', '#F05252'], wash: '#FDE8E8', route: '/module/turnstile' },
      { key: 'exports', title: 'Hesabatlar', subtitle: 'İxrac və sənədlər', icon: 'bar-chart', grad: ['#0E9F6E', '#31C48D'], wash: '#DEF7EC', route: '/module/exports' },
    ],
  },
  {
    key: 'comm',
    title: 'Ünsiyyət',
    items: [
      { key: 'messages', title: 'Mesajlar', subtitle: 'Söhbətlər', icon: 'chatbubbles', grad: ['#0EA5E9', '#38BDF8'], wash: '#E0F2FE', route: '/messages' },
      { key: 'notifications', title: 'Bildirişlər', subtitle: 'Xəbərdarlıqlar', icon: 'notifications', grad: ['#F5A524', '#F7B84B'], wash: '#FDEFD3', route: '/notifications' },
    ],
  },
  {
    key: 'account',
    title: 'Hesab',
    items: [
      { key: 'security', title: 'Təhlükəsizlik', subtitle: 'Sessiyalar və cihazlar', icon: 'shield-checkmark', grad: ['#1B2559', '#3D4ED6'], wash: '#E5E8FF', route: '/security' },
      { key: 'settings', title: 'Parametrlər', subtitle: 'Bildiriş, dil, mövzu', icon: 'settings', grad: ['#4B5270', '#6B7390'], wash: '#EEF0F6', route: '/settings' },
    ],
  },
];

export const allServices: Service[] = serviceGroups.flatMap((g) => g.items);
