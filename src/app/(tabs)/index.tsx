import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HeaderIconButton, Hero, Screen } from '@/components/layout';
import { Badge, Card, IconChip, ProgressBar, SectionHeader } from '@/components/ui';
import { useRole } from '@/context/role';
import { notifications, todaySchedule } from '@/data';
import { applications, fullName, hrStats } from '@/data/hr';
import { approvals, roleDashboard, roleMeta } from '@/data/roles';
import { colors, gradients, radius, shadow, spacing, typography } from '@/theme';

export default function Dashboard() {
  const router = useRouter();
  const { role, profile, openSwitcher } = useRole();
  const cfg = roleDashboard[role];
  const unread = notifications.filter((n) => n.unread).length;

  // HR role reuses the "approvals" focus slot to surface new applications.
  const hrPending = applications
    .filter((a) => a.status === 'submitted')
    .map((a) => ({ id: a.id, title: fullName(a), detail: a.vacancyTitle, urgent: false }));
  const focusList = role === 'hr' ? hrPending : approvals;

  return (
    <Screen>
      {/* ── Hero ── */}
      <Hero>
        <View style={styles.heroTop}>
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Image
                source={require('@/assets/images/aztu-logo-white.png')}
                style={{ width: 26, height: 34 }}
                contentFit="contain"
              />
            </View>
            <View style={{ marginLeft: spacing.md }}>
              <Text style={styles.brandTitle}>AzTU ERP</Text>
              <Text style={styles.brandSub}>İdarəetmə sistemi</Text>
            </View>
          </View>
          <View style={styles.heroActions}>
            <HeaderIconButton icon="notifications" badge={unread > 0} onPress={() => router.push('/notifications')} />
          </View>
        </View>

        <Text style={styles.greeting}>Xoş gəldiniz,</Text>
        <Text style={styles.userName}>{profile.name}</Text>

        {/* role switcher chip */}
        <Pressable onPress={openSwitcher} style={styles.roleChip}>
          <Ionicons name={roleMeta[role].icon as never} size={13} color="#fff" />
          <Text style={styles.roleChipText}>{profile.role}</Text>
          <View style={styles.roleChipDivider} />
          <Ionicons name="swap-horizontal" size={13} color="#fff" />
          <Text style={styles.roleChipSwap}>Rol dəyiş</Text>
        </Pressable>
      </Hero>

      {/* ── Floating stat grid (2×2) ── */}
      <View style={styles.statGrid}>
        {cfg.stats.map((s) => (
          <View key={s.key} style={styles.statCard}>
            <View style={styles.statTop}>
              <LinearGradient
                colors={gradients[s.gradient] as unknown as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statIcon}>
                <Ionicons name={s.icon as never} size={20} color="#fff" />
              </LinearGradient>
              {s.delta ? (
                <View style={[styles.deltaPill, s.up && styles.deltaPillUp]}>
                  {s.up ? <Ionicons name="trending-up" size={12} color={colors.success} /> : null}
                  <Text style={[styles.deltaText, s.up && { color: colors.success }]} numberOfLines={1}>
                    {s.delta}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>
              {s.value}
            </Text>
            <Text style={styles.statLabel} numberOfLines={1}>
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      {/* ── Quick actions ── */}
      <View style={styles.section}>
        <SectionHeader title="Sürətli keçidlər" />
        <View style={styles.actionGrid}>
          {cfg.actions.map((a) => (
            <Pressable
              key={a.key}
              onPress={() => router.push(a.route as never)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
              <IconChip icon={a.icon as never} color={a.tint} bg={a.bg} size={50} />
              <Text style={styles.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* ── Focus section: schedule (student/teacher) or approvals (finance) ── */}
      {cfg.focus === 'schedule' ? (
        <View style={styles.section}>
          <SectionHeader
            title={role === 'student' ? 'Bugünkü dərslərim' : 'Bugünkü dərslər'}
            actionLabel="Hamısı"
            onAction={() => router.push('/lms/courses')}
          />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {todaySchedule.map((it, i) => (
              <View key={it.id}>
                <View style={styles.schedRow}>
                  <View style={[styles.schedTime, it.now && { backgroundColor: colors.primary }]}>
                    <Text style={[styles.schedTimeText, it.now && { color: '#fff' }]}>{it.time}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.schedCourse}>{it.course}</Text>
                    <Text style={styles.schedMeta}>
                      {it.room} · Qrup {it.group}
                    </Text>
                  </View>
                  {it.now ? <Badge label="İndi" color={colors.success} bg="#DEF7EC" icon="ellipse" /> : null}
                </View>
                {i < todaySchedule.length - 1 ? <View style={styles.schedDivider} /> : null}
              </View>
            ))}
          </Card>
        </View>
      ) : (
        <View style={styles.section}>
          <SectionHeader
            title={role === 'hr' ? 'Yeni müraciətlər' : 'Təsdiq gözləyən'}
            actionLabel="Hamısı"
            onAction={() => router.push(role === 'hr' ? '/hr/applications' : '/finance/runs')}
          />
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {focusList.map((a, i) => (
              <View key={a.id}>
                <View style={styles.schedRow}>
                  <IconChip
                    icon={a.urgent ? 'alert-circle' : role === 'hr' ? 'document-text' : 'time'}
                    color={a.urgent ? colors.danger : role === 'hr' ? colors.primary : colors.info}
                    bg={a.urgent ? '#FDE8E8' : role === 'hr' ? '#E5E8FF' : '#E0F2FE'}
                    size={40}
                  />
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.schedCourse}>{a.title}</Text>
                    <Text style={styles.schedMeta}>{a.detail}</Text>
                  </View>
                  {a.urgent ? <Badge label="Təcili" color={colors.danger} bg="#FDE8E8" /> : null}
                </View>
                {i < focusList.length - 1 ? <View style={styles.schedDivider} /> : null}
              </View>
            ))}
          </Card>
        </View>
      )}

      {/* ── Attention / attendance summary ── */}
      <View style={styles.section}>
        <Card>
          <View style={styles.attHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.attTitle}>{cfg.attentionTitle}</Text>
              <Text style={styles.attSub}>
                {role === 'finance'
                  ? 'İyul 2026 · 412 əməkdaş'
                  : role === 'hr'
                    ? 'İşə qəbul dövrü · cari vəziyyət'
                    : '6 fənn üzrə orta göstərici'}
              </Text>
            </View>
            <Text style={styles.attPercent}>
              {role === 'finance' ? '984K ₼' : role === 'hr' ? String(hrStats.applications) : role === 'student' ? '94%' : '92%'}
            </Text>
          </View>
          {role === 'finance' ? (
            <View style={styles.attLegend}>
              <Legend color={colors.success} label="Ödənilib 98%" />
              <Legend color={colors.warning} label="Gözləyir 2%" />
            </View>
          ) : role === 'hr' ? (
            <View style={styles.attLegend}>
              <Legend color={colors.success} label={`Aktiv ${hrStats.activeEmployees}`} />
              <Legend color={colors.warning} label={`Qəbul ${hrStats.onboarding}`} />
              <Legend color={colors.danger} label={`Vakansiya ${hrStats.openVacancies}`} />
            </View>
          ) : (
            <>
              <ProgressBar value={role === 'student' ? 94 : 92} color={colors.success} height={10} />
              <View style={styles.attLegend}>
                <Legend color={colors.success} label={`İştirak ${role === 'student' ? 94 : 92}%`} />
                <Legend color={colors.warning} label="Gecikmə 5%" />
                <Legend color={colors.danger} label="Qayıb 3%" />
              </View>
            </>
          )}
        </Card>
      </View>

      {/* ── Recent activity ── */}
      <View style={styles.section}>
        <SectionHeader title="Son fəaliyyət" actionLabel="Hamısı" onAction={() => router.push('/notifications')} />
        <Card>
          {notifications.slice(0, 3).map((n, i) => (
            <View key={n.id}>
              <View style={styles.actRow}>
                <IconChip icon={ACT_ICON[n.type] as never} color={ACT_COLOR[n.type]} bg={ACT_BG[n.type]} size={38} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.actTitle} numberOfLines={1}>
                    {n.title}
                  </Text>
                  <Text style={styles.actDetail} numberOfLines={1}>
                    {n.detail}
                  </Text>
                </View>
                <Text style={styles.actTime}>{n.time}</Text>
              </View>
              {i < 2 ? <View style={styles.schedDivider} /> : null}
            </View>
          ))}
        </Card>
      </View>
    </Screen>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legend}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const ACT_ICON: Record<string, string> = {
  security: 'shield-checkmark',
  finance: 'wallet',
  attendance: 'checkmark-done',
  exam: 'document-text',
  system: 'sync',
};
const ACT_COLOR: Record<string, string> = {
  security: '#E02424',
  finance: '#F5A524',
  attendance: '#0E9F6E',
  exam: '#3D4ED6',
  system: '#0EA5E9',
};
const ACT_BG: Record<string, string> = {
  security: '#FDE8E8',
  finance: '#FDEFD3',
  attendance: '#DEF7EC',
  exam: '#E5E8FF',
  system: '#E0F2FE',
};

const styles = StyleSheet.create({
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroActions: { flexDirection: 'row', gap: spacing.sm },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: { ...typography.h3, color: '#fff' },
  brandSub: { ...typography.small, color: 'rgba(255,255,255,0.7)' },
  greeting: { ...typography.body, color: 'rgba(255,255,255,0.8)', marginTop: spacing.xl },
  userName: { ...typography.h1, color: '#fff', marginTop: 2 },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    marginTop: spacing.md,
  },
  roleChipText: { ...typography.caption, color: '#fff' },
  roleChipDivider: { width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 3 },
  roleChipSwap: { ...typography.caption, color: '#fff', fontWeight: '700' },

  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  statTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  deltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    maxWidth: '55%',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  deltaPillUp: { backgroundColor: '#DEF7EC' },
  deltaText: { ...typography.caption, color: colors.textMuted, fontSize: 10.5 },
  statValue: { ...typography.h1, color: colors.text, marginTop: spacing.md },
  statLabel: { ...typography.small, color: colors.textMuted, marginTop: 2 },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  action: { width: '22%', alignItems: 'center', flexGrow: 1, minWidth: 74 },
  actionLabel: { ...typography.caption, color: colors.text, marginTop: 6, textAlign: 'center' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.96 }] },

  schedRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  schedTime: {
    width: 54,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  schedTimeText: { ...typography.bodyStrong, color: colors.primary, fontSize: 13 },
  schedCourse: { ...typography.bodyStrong, color: colors.text },
  schedMeta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  schedDivider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: spacing.md },

  attHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  attTitle: { ...typography.h3, color: colors.text },
  attSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  attPercent: { ...typography.h1, color: colors.success },
  attLegend: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  legend: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { ...typography.caption, color: colors.textMuted },

  actRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  actTitle: { ...typography.bodyStrong, color: colors.text },
  actDetail: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  actTime: { ...typography.caption, color: colors.textFaint, marginLeft: spacing.sm },
});
