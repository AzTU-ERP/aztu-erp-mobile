import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Hero, Screen } from '@/components/layout';
import { Badge, Button, Card, IconChip, ProgressBar, SectionHeader } from '@/components/ui';
import { useRole } from '@/context/role';
import { AZN, bonuses, payrollRuns, payslip, reminders, runStatusMeta } from '@/data';
import {
  appStatusMeta,
  applications,
  fullName,
  hrStats,
  initialsOf,
  jobTypeLabel,
  vacancies,
  vacancyStatusMeta,
} from '@/data/hr';
import { myPayments, tuition } from '@/data/roles';
import { colors, gradients, radius, shadow, spacing, typography } from '@/theme';

export default function FinanceHub() {
  const { role } = useRole();
  if (role === 'hr') return <HrRecruitment />;
  if (role === 'student') return <StudentTuition />;
  if (role === 'finance') return <FinanceAdmin />;
  return <TeacherSalary />;
}

// ── Student: tuition & payments ──────────────────────────────────────────────
function StudentTuition() {
  const paidPct = Math.round((tuition.paid / tuition.total) * 100);
  return (
    <Screen>
      <Hero>
        <Text style={styles.eyebrow}>ÖDƏNİŞLƏR · TƏHSİL HAQQI</Text>
        <Text style={styles.title}>Təhsil haqqı</Text>
      </Hero>

      <View style={styles.section}>
        <LinearGradient
          colors={gradients.brand as unknown as [string, string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.balanceCard, { marginTop: -spacing.xxxl }]}>
          <Text style={styles.balanceLabel}>Qalıq borc · {tuition.year}</Text>
          <Text style={styles.balanceValue}>{AZN(tuition.balance)}</Text>
          <View style={{ marginTop: spacing.md }}>
            <ProgressBar value={paidPct} color="#F7B84B" track="rgba(255,255,255,0.25)" height={8} />
          </View>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceSmallLabel}>{AZN(tuition.paid)} ödənilib · {paidPct}%</Text>
            <Text style={styles.balanceSmallLabel}>Son tarix: {tuition.dueDate}</Text>
          </View>
        </LinearGradient>

        <Button label="İndi ödə" icon="card" variant="gold" style={{ marginTop: spacing.lg }} />

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Ödəniş qrafiki" />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {tuition.installments.map((it, i) => (
              <View key={it.id}>
                <View style={styles.runRow}>
                  <IconChip
                    icon={it.status === 'paid' ? 'checkmark-circle' : 'time'}
                    color={it.status === 'paid' ? colors.success : colors.warning}
                    bg={it.status === 'paid' ? '#DEF7EC' : '#FDF6B2'}
                    size={38}
                  />
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.runPeriod}>{it.label}</Text>
                    <Text style={styles.runMeta}>{it.date}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.runTotal}>{AZN(it.amount)}</Text>
                    <Badge
                      label={it.status === 'paid' ? 'Ödənilib' : 'Gözləyir'}
                      color={it.status === 'paid' ? colors.success : colors.warning}
                      bg={it.status === 'paid' ? '#DEF7EC' : '#FDF6B2'}
                    />
                  </View>
                </View>
                {i < tuition.installments.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </Card>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Təqaüd" />
          <Card style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconChip icon="school" color="#0E9F6E" bg="#DEF7EC" size={44} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.runPeriod}>{tuition.scholarship.label}</Text>
              <Text style={styles.runMeta}>Aktiv · hər ayın 5-i</Text>
            </View>
            <Text style={[styles.runTotal, { color: colors.success }]}>+{AZN(tuition.scholarship.amount)}</Text>
          </Card>
        </View>
      </View>
    </Screen>
  );
}

// ── Teacher: my salary ───────────────────────────────────────────────────────
function TeacherSalary() {
  const router = useRouter();
  return (
    <Screen>
      <Hero>
        <Text style={styles.eyebrow}>MAAŞ · ŞƏXSİ</Text>
        <Text style={styles.title}>Əməkhaqqım</Text>
      </Hero>

      <View style={styles.section}>
        <Pressable onPress={() => router.push('/finance/payslip')}>
          <LinearGradient
            colors={gradients.gold as unknown as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.balanceCard, { marginTop: -spacing.xxxl }]}>
            <View style={styles.balanceTop}>
              <Text style={styles.balanceLabel}>Bu ay xalis maaş · {payslip.period}</Text>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.9)" />
            </View>
            <Text style={styles.balanceValue}>{AZN(payslip.net)}</Text>
            <View style={styles.balanceRow}>
              <Badge label="Təsdiqlənib" color="#7A4E00" bg="rgba(255,255,255,0.6)" icon="checkmark-circle" />
              <Text style={styles.balanceSmallLabel}>Ödəniş: {payslip.payDate}</Text>
            </View>
          </LinearGradient>
        </Pressable>

        <View style={styles.linkGrid}>
          {[
            { key: 'payslip', label: 'Maaş vərəqi', icon: 'receipt', tint: '#F5A524', bg: '#FDEFD3', route: '/finance/payslip' },
            { key: 'bonuses', label: 'Premyalarım', icon: 'gift', tint: '#7C3AED', bg: '#EDE9FE', route: '/finance/bonuses' },
          ].map((l) => (
            <Pressable
              key={l.key}
              onPress={() => router.push(l.route as never)}
              style={({ pressed }) => [styles.linkCard, pressed && styles.pressed]}>
              <IconChip icon={l.icon as never} color={l.tint} bg={l.bg} size={44} />
              <Text style={styles.linkLabel}>{l.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Ödəniş tarixçəm" />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {myPayments.map((p, i) => {
              const meta = runStatusMeta[p.status];
              return (
                <View key={p.id}>
                  <View style={styles.runRow}>
                    <IconChip icon="cash" color={colors.primary} bg="#E5E8FF" size={38} />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.runPeriod}>{p.period}</Text>
                      <Text style={styles.runMeta}>Ödəniş: {p.date}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.runTotal}>{AZN(p.net)}</Text>
                      <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                    </View>
                  </View>
                  {i < myPayments.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              );
            })}
          </Card>
        </View>
      </View>
    </Screen>
  );
}

// ── Finance admin: payroll ───────────────────────────────────────────────────
function FinanceAdmin() {
  const router = useRouter();
  return (
    <Screen>
      <Hero>
        <Text style={styles.eyebrow}>FINANCE · MALİYYƏ İDARƏETMƏSİ</Text>
        <Text style={styles.title}>Əməkhaqqı idarəetməsi</Text>
      </Hero>

      <View style={styles.section}>
        <LinearGradient
          colors={gradients.brand as unknown as [string, string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.balanceCard, { marginTop: -spacing.xxxl }]}>
          <Text style={styles.balanceLabel}>İyul maaş fondu · 412 əməkdaş</Text>
          <Text style={styles.balanceValue}>{AZN(984_500)}</Text>
          <View style={styles.balanceRow}>
            <Badge label="Təsdiq gözləyir" color="#7A4E00" bg="rgba(255,255,255,0.6)" icon="hourglass" />
            <Text style={styles.balanceSmallLabel}>Son tarix: 14 İyul</Text>
          </View>
        </LinearGradient>

        <View style={styles.linkGrid}>
          {[
            { key: 'runs', label: 'Hesablamalar', icon: 'calculator', tint: '#0EA5E9', bg: '#E0F2FE', route: '/finance/runs' },
            { key: 'employees', label: 'Əməkdaşlar', icon: 'people', tint: '#3D4ED6', bg: '#E5E8FF', route: '/hr/employees' },
            { key: 'bonuses', label: 'Premyalar', icon: 'gift', tint: '#7C3AED', bg: '#EDE9FE', route: '/finance/bonuses' },
            { key: 'exports', label: 'İxraclar', icon: 'download', tint: '#0E9F6E', bg: '#DEF7EC', route: '/module/exports' },
          ].map((l) => (
            <Pressable
              key={l.key}
              onPress={() => router.push(l.route as never)}
              style={({ pressed }) => [styles.linkCard, pressed && styles.pressed]}>
              <IconChip icon={l.icon as never} color={l.tint} bg={l.bg} size={44} />
              <Text style={styles.linkLabel}>{l.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Xatırlatmalar" />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {reminders.map((r, i) => (
              <View key={r.id}>
                <View style={styles.reminderRow}>
                  <View style={[styles.reminderDot, { backgroundColor: r.urgent ? colors.danger : colors.info }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reminderTitle}>{r.title}</Text>
                    <Text style={styles.reminderDue}>Son tarix: {r.due}</Text>
                  </View>
                  {r.urgent ? <Badge label="Təcili" color={colors.danger} bg="#FDE8E8" /> : null}
                </View>
                {i < reminders.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </Card>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Son hesablamalar" actionLabel="Hamısı" onAction={() => router.push('/finance/runs')} />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {payrollRuns.slice(0, 3).map((r, i) => {
              const meta = runStatusMeta[r.status];
              return (
                <View key={r.id}>
                  <Pressable
                    onPress={() => router.push('/finance/runs')}
                    style={({ pressed }) => [styles.runRow, pressed && { opacity: 0.7 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.runPeriod}>{r.period}</Text>
                      <Text style={styles.runMeta}>{r.employees} əməkdaş · {r.createdAt}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.runTotal}>{AZN(r.total)}</Text>
                      <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                    </View>
                  </Pressable>
                  {i < 2 ? <View style={styles.divider} /> : null}
                </View>
              );
            })}
          </Card>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Son premyalar" actionLabel="Hamısı" onAction={() => router.push('/finance/bonuses')} />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {bonuses.map((b, i) => (
              <View key={b.id}>
                <View style={styles.runRow}>
                  <IconChip icon="gift" color="#7C3AED" bg="#EDE9FE" size={38} />
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.runPeriod}>{b.reason}</Text>
                    <Text style={styles.runMeta}>{b.employee} · {b.date}</Text>
                  </View>
                  <Text style={[styles.runTotal, { color: colors.success }]}>+{AZN(b.amount)}</Text>
                </View>
                {i < bonuses.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </Card>
        </View>
      </View>
    </Screen>
  );
}

// ── HR role: recruitment (vacancies + applications) ──────────────────────────
function HrRecruitment() {
  const router = useRouter();
  const openVacancies = vacancies.filter((v) => v.status === 'open');
  const recentApps = applications.slice(0, 3);

  return (
    <Screen>
      <Hero>
        <Text style={styles.eyebrow}>İŞƏ QƏBUL · RECRUITMENT</Text>
        <Text style={styles.title}>İşə qəbul</Text>
      </Hero>

      <View style={styles.section}>
        <Pressable onPress={() => router.push('/hr/vacancies')}>
          <LinearGradient
            colors={gradients.brand as unknown as [string, string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.balanceCard, { marginTop: -spacing.xxxl }]}>
            <View style={styles.balanceTop}>
              <Text style={styles.balanceLabel}>Açıq vakansiyalar</Text>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.9)" />
            </View>
            <Text style={styles.balanceValue}>{hrStats.openVacancies}</Text>
            <View style={styles.balanceRow}>
              <Badge label={`${hrStats.applications} müraciət`} color="#1B2559" bg="rgba(255,255,255,0.7)" icon="documents" />
              <Text style={styles.balanceSmallLabel}>{hrStats.onboarding} qəbul prosesində</Text>
            </View>
          </LinearGradient>
        </Pressable>

        <View style={styles.linkGrid}>
          {[
            { key: 'vacancies', label: 'Vakansiyalar', icon: 'briefcase', tint: '#E02424', bg: '#FDE8E8', route: '/hr/vacancies' },
            { key: 'applications', label: 'Müraciətlər', icon: 'documents', tint: '#3D4ED6', bg: '#E5E8FF', route: '/hr/applications' },
            { key: 'emails', label: 'E-poçt jurnalı', icon: 'mail', tint: '#0EA5E9', bg: '#E0F2FE', route: '/hr/emails' },
            { key: 'templates', label: 'Şablonlar', icon: 'copy', tint: '#7C3AED', bg: '#EDE9FE', route: '/hr/templates' },
          ].map((l) => (
            <Pressable
              key={l.key}
              onPress={() => router.push(l.route as never)}
              style={({ pressed }) => [styles.linkCard, pressed && styles.pressed]}>
              <IconChip icon={l.icon as never} color={l.tint} bg={l.bg} size={44} />
              <Text style={styles.linkLabel}>{l.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Açıq vakansiyalar" actionLabel="Hamısı" onAction={() => router.push('/hr/vacancies')} />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {openVacancies.map((v, i) => {
              const meta = vacancyStatusMeta[v.status];
              return (
                <View key={v.id}>
                  <Pressable
                    onPress={() => router.push(`/hr/vacancies/${v.id}` as never)}
                    style={({ pressed }) => [styles.runRow, pressed && { opacity: 0.7 }]}>
                    <IconChip icon="briefcase" color="#E02424" bg="#FDE8E8" size={38} />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.runPeriod} numberOfLines={1}>{v.jobTitle}</Text>
                      <Text style={styles.runMeta} numberOfLines={1}>
                        {jobTypeLabel[v.jobType]} · {v.applicants} müraciət
                      </Text>
                    </View>
                    <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                  </Pressable>
                  {i < openVacancies.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              );
            })}
          </Card>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeader title="Son müraciətlər" actionLabel="Hamısı" onAction={() => router.push('/hr/applications')} />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {recentApps.map((a, i) => {
              const meta = appStatusMeta[a.status];
              return (
                <View key={a.id}>
                  <Pressable
                    onPress={() => router.push(`/hr/applications/${a.id}` as never)}
                    style={({ pressed }) => [styles.runRow, pressed && { opacity: 0.7 }]}>
                    <View style={[styles.hrAvatar, { backgroundColor: meta.bg }]}>
                      <Text style={[styles.hrAvatarText, { color: meta.color }]}>{initialsOf(a)}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.runPeriod} numberOfLines={1}>{fullName(a)}</Text>
                      <Text style={styles.runMeta} numberOfLines={1}>{a.vacancyTitle}</Text>
                    </View>
                    <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                  </Pressable>
                  {i < recentApps.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              );
            })}
          </Card>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { ...typography.overline, color: 'rgba(255,255,255,0.7)', marginTop: spacing.sm },
  title: { ...typography.h1, color: '#fff', marginTop: 6, marginBottom: spacing.sm },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },

  balanceCard: { borderRadius: radius.xl, padding: spacing.xl, ...shadow.card },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { ...typography.small, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  balanceValue: { fontSize: 36, fontWeight: '800', color: '#fff', marginTop: spacing.sm, letterSpacing: -1 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
  balanceSmallLabel: { ...typography.caption, color: 'rgba(255,255,255,0.85)' },

  linkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.lg },
  linkCard: {
    width: '47.5%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.soft,
  },
  linkLabel: { ...typography.small, color: colors.text, fontWeight: '700', flex: 1 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  reminderRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.md },
  reminderDot: { width: 10, height: 10, borderRadius: 5 },
  reminderTitle: { ...typography.bodyStrong, color: colors.text },
  reminderDue: { ...typography.small, color: colors.textMuted, marginTop: 2 },

  runRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  hrAvatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  hrAvatarText: { ...typography.bodyStrong },
  runPeriod: { ...typography.bodyStrong, color: colors.text },
  runMeta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  runTotal: { ...typography.title, color: colors.text },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: spacing.md },
});
