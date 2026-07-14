import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Hero, Screen } from '@/components/layout';
import { Badge, Card, IconChip, ProgressBar, SectionHeader } from '@/components/ui';
import { useRole } from '@/context/role';
import { courses, exams, transcript } from '@/data';
import { empStatusMeta, employees, fullName, hrStats, initialsOf } from '@/data/hr';
import { colors, gradients, radius, shadow, spacing, typography } from '@/theme';

export default function LmsHub() {
  const { role } = useRole();
  if (role === 'hr') return <HrPersonnel />;
  if (role === 'finance') return <AcademicOverview />;
  return <StudentTeacherLms student={role === 'student'} />;
}

// ── Student & teacher LMS hub ────────────────────────────────────────────────
function StudentTeacherLms({ student }: { student: boolean }) {
  const router = useRouter();

  const modules = [
    { key: 'attendance', label: 'Davamiyyət', desc: student ? 'Öz iştirakım' : 'Yoxlama və qeydiyyat', icon: 'checkmark-done-circle', tint: '#0E9F6E', bg: '#DEF7EC', route: '/lms/attendance' },
    { key: 'transcript', label: 'Transkript', desc: 'GPA və qiymətlər', icon: 'ribbon', tint: '#3D4ED6', bg: '#E5E8FF', route: '/lms/transcript' },
    { key: 'courses', label: 'Fənlər', desc: student ? 'Seçdiyim fənlər' : '6 aktiv fənn', icon: 'book', tint: '#5566F0', bg: '#EEF0FF', route: '/lms/courses' },
    { key: 'exams', label: 'İmtahanlar', desc: 'Cədvəl və nəticələr', icon: 'document-text', tint: '#C27803', bg: '#FDF6B2', route: '/lms/exams' },
  ];

  return (
    <Screen>
      <Hero>
        <Text style={styles.eyebrow}>LMS · TƏHSİL MODULU</Text>
        <Text style={styles.title}>{student ? 'Akademik profilim' : 'Tədris idarəetməsi'}</Text>

        <View style={styles.summary}>
          {student ? (
            <>
              <SummaryItem value={transcript.gpa.toFixed(2)} label="GPA" />
              <SummaryDivider />
              <SummaryItem value={`${transcript.completedCredits}`} label="Kredit" />
              <SummaryDivider />
              <SummaryItem value={`${exams.length}`} label="İmtahan" />
            </>
          ) : (
            <>
              <SummaryItem value="312" label="Tələbə" />
              <SummaryDivider />
              <SummaryItem value={`${courses.length}`} label="Fənn" />
              <SummaryDivider />
              <SummaryItem value={`${exams.length}`} label="İmtahan" />
            </>
          )}
        </View>
      </Hero>

      <View style={styles.section}>
        <View style={styles.moduleGrid}>
          {modules.map((m) => (
            <Pressable
              key={m.key}
              onPress={() => router.push(m.route as never)}
              style={({ pressed }) => [styles.moduleCard, pressed && styles.pressed]}>
              <IconChip icon={m.icon as never} color={m.tint} bg={m.bg} size={46} />
              <Text style={styles.moduleLabel}>{m.label}</Text>
              <Text style={styles.moduleDesc}>{m.desc}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Növbəti imtahan" actionLabel="Hamısı" onAction={() => router.push('/lms/exams')} />
        <Pressable onPress={() => router.push('/lms/exams')}>
          <LinearGradient
            colors={gradients.purple as unknown as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.examCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.examCourse}>{exams[0].course}</Text>
              <Text style={styles.examMeta}>
                {exams[0].type} · {exams[0].date}, {exams[0].time} · {exams[0].room}
              </Text>
            </View>
            <View style={styles.examDays}>
              <Text style={styles.examDaysNum}>{exams[0].daysLeft}</Text>
              <Text style={styles.examDaysLabel}>gün</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>

      <View style={styles.section}>
        <SectionHeader title={student ? 'Fənlərim' : 'Fənlərim'} actionLabel="Hamısı" onAction={() => router.push('/lms/courses')} />
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {courses.slice(0, 4).map((c, i) => (
            <View key={c.id}>
              <Pressable
                onPress={() => router.push('/lms/courses')}
                style={({ pressed }) => [styles.courseRow, pressed && { opacity: 0.7 }]}>
                <View style={[styles.courseBar, { backgroundColor: c.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.courseName} numberOfLines={1}>
                    {c.name}
                  </Text>
                  <Text style={styles.courseMeta}>
                    {c.code} · {student ? `${c.credits} kredit` : `${c.students} tələbə · ${c.credits} kredit`}
                  </Text>
                  <View style={styles.courseProgress}>
                    <ProgressBar value={c.attendance} color={c.color} height={5} />
                  </View>
                </View>
                <Badge
                  label={`${c.attendance}%`}
                  color={c.attendance >= 90 ? colors.success : colors.warning}
                  bg={c.attendance >= 90 ? '#DEF7EC' : '#FDF6B2'}
                />
              </Pressable>
              {i < 3 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </Card>
      </View>
    </Screen>
  );
}

// ── Finance role: read-only academic overview ────────────────────────────────
const faculties = [
  { id: 'f1', name: 'Kompüter və İT', students: 2140, attendance: 92 },
  { id: 'f2', name: 'İnşaat və Nəqliyyat', students: 1980, attendance: 88 },
  { id: 'f3', name: 'Metallurgiya və Materialşünaslıq', students: 1240, attendance: 90 },
  { id: 'f4', name: 'Energetika və Avtomatika', students: 1560, attendance: 87 },
];

function AcademicOverview() {
  return (
    <Screen>
      <Hero>
        <Text style={styles.eyebrow}>AKADEMİK İCMAL</Text>
        <Text style={styles.title}>Universitet üzrə</Text>
        <View style={styles.summary}>
          <SummaryItem value="12 480" label="Tələbə" />
          <SummaryDivider />
          <SummaryItem value="9" label="Fakültə" />
          <SummaryDivider />
          <SummaryItem value="%90" label="Davamiyyət" />
        </View>
      </Hero>

      <View style={styles.section}>
        <SectionHeader title="Fakültələr üzrə" />
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {faculties.map((f, i) => (
            <View key={f.id}>
              <View style={styles.courseRow}>
                <IconChip icon="business" color={colors.primary} bg="#E5E8FF" size={40} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.courseName} numberOfLines={1}>
                    {f.name}
                  </Text>
                  <Text style={styles.courseMeta}>{f.students.toLocaleString('az-AZ')} tələbə</Text>
                  <View style={[styles.courseProgress, { marginRight: 0 }]}>
                    <ProgressBar value={f.attendance} color={colors.success} height={5} />
                  </View>
                </View>
                <Badge label={`${f.attendance}%`} color={colors.success} bg="#DEF7EC" />
              </View>
              {i < faculties.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </Card>
      </View>
    </Screen>
  );
}

// ── HR role: personnel / employees hub ───────────────────────────────────────
function HrPersonnel() {
  const router = useRouter();

  const modules = [
    { key: 'employees', label: 'İşçilər', desc: 'Kadr uçotu', icon: 'people', tint: '#0E9F6E', bg: '#DEF7EC', route: '/hr/employees' },
    { key: 'vacancies', label: 'Vakansiyalar', desc: 'Açıq vəzifələr', icon: 'briefcase', tint: '#E02424', bg: '#FDE8E8', route: '/hr/vacancies' },
    { key: 'applications', label: 'Müraciətlər', desc: 'CV baxışı', icon: 'documents', tint: '#3D4ED6', bg: '#E5E8FF', route: '/hr/applications' },
    { key: 'panel', label: 'HR paneli', desc: 'Ümumi baxış', icon: 'grid', tint: '#5566F0', bg: '#EEF0FF', route: '/hr' },
  ];
  const recent = employees.slice(0, 5);

  return (
    <Screen>
      <Hero>
        <Text style={styles.eyebrow}>KADRLAR · İŞÇİLƏR</Text>
        <Text style={styles.title}>Kadr idarəetməsi</Text>

        <View style={styles.summary}>
          <SummaryItem value={`${hrStats.activeEmployees}`} label="Aktiv" />
          <SummaryDivider />
          <SummaryItem value={`${hrStats.onboarding}`} label="Qəbulda" />
          <SummaryDivider />
          <SummaryItem value={`${hrStats.openVacancies}`} label="Vakansiya" />
        </View>
      </Hero>

      <View style={styles.section}>
        <View style={styles.moduleGrid}>
          {modules.map((m) => (
            <Pressable
              key={m.key}
              onPress={() => router.push(m.route as never)}
              style={({ pressed }) => [styles.moduleCard, pressed && styles.pressed]}>
              <IconChip icon={m.icon as never} color={m.tint} bg={m.bg} size={46} />
              <Text style={styles.moduleLabel}>{m.label}</Text>
              <Text style={styles.moduleDesc}>{m.desc}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="İşçilər" actionLabel="Hamısı" onAction={() => router.push('/hr/employees')} />
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {recent.map((e, i) => {
            const meta = empStatusMeta[e.status];
            return (
              <View key={e.id}>
                <Pressable
                  onPress={() => router.push(`/hr/employees/${e.id}` as never)}
                  style={({ pressed }) => [styles.courseRow, pressed && { opacity: 0.7 }]}>
                  <View style={[styles.hrAvatar, { backgroundColor: meta.bg }]}>
                    <Text style={[styles.hrAvatarText, { color: meta.color }]}>{initialsOf(e)}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.courseName} numberOfLines={1}>{fullName(e)}</Text>
                    <Text style={styles.courseMeta} numberOfLines={1}>
                      {e.jobTitle} · {e.department}
                    </Text>
                  </View>
                  <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                </Pressable>
                {i < recent.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </Card>
      </View>
    </Screen>
  );
}

// helpers
function SummaryItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}
function SummaryDivider() {
  return <View style={styles.summaryDivider} />;
}

const styles = StyleSheet.create({
  eyebrow: { ...typography.overline, color: 'rgba(255,255,255,0.7)', marginTop: spacing.sm },
  title: { ...typography.h1, color: '#fff', marginTop: 6 },
  summary: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { ...typography.h1, color: '#fff' },
  summaryLabel: { ...typography.caption, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  summaryDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)' },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  moduleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  moduleCard: {
    width: '47.5%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  moduleLabel: { ...typography.title, color: colors.text, marginTop: spacing.md },
  moduleDesc: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  examCard: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.lg, padding: spacing.lg, ...shadow.card },
  examCourse: { ...typography.h3, color: '#fff' },
  examMeta: { ...typography.small, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  examDays: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  examDaysNum: { ...typography.h1, color: '#fff' },
  examDaysLabel: { ...typography.caption, color: 'rgba(255,255,255,0.85)' },

  courseRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  courseBar: { width: 4, height: 44, borderRadius: 2, marginRight: spacing.md },
  hrAvatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  hrAvatarText: { ...typography.bodyStrong },
  courseName: { ...typography.bodyStrong, color: colors.text },
  courseMeta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  courseProgress: { marginTop: 8, marginRight: spacing.md },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: spacing.md },
});
