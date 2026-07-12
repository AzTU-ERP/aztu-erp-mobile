// ─────────────────────────────────────────────────────────────────────────────
// İnsan resursları — HR hub. Mirrors the web HR dashboard: KPI tiles across the
// hiring lifecycle, section navigation, and a recent-applications preview.
// ─────────────────────────────────────────────────────────────────────────────
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HeaderIconButton, Hero, Screen } from '@/components/layout';
import { KpiTile } from '@/components/hr-ui';
import { Badge, Card, IconChip } from '@/components/ui';
import { notifications } from '@/data';
import {
  appStatusMeta,
  applications,
  fullName,
  hrStats,
  initialsOf,
} from '@/data/hr';
import { colors, spacing, typography } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

const KPIS = [
  { key: 'openVacancies', label: 'Açıq vakansiyalar', icon: 'briefcase', grad: ['#E02424', '#F05252'], wash: '#FDE8E8', route: '/hr/vacancies' },
  { key: 'applications', label: 'Müraciətlər', icon: 'file-tray-full', grad: ['#3D4ED6', '#5566F0'], wash: '#E5E8FF', route: '/hr/applications' },
  { key: 'activeEmployees', label: 'Aktiv işçilər', icon: 'people', grad: ['#0E9F6E', '#31C48D'], wash: '#DEF7EC', route: '/hr/employees' },
  { key: 'onboarding', label: 'Qəbul prosesində', icon: 'person-add', grad: ['#F5A524', '#F7B84B'], wash: '#FDEFD3', route: '/hr/employees' },
  { key: 'failedEmails', label: 'Uğursuz e-poçtlar', icon: 'mail-unread', grad: ['#0EA5E9', '#38BDF8'], wash: '#E0F2FE', route: '/hr/emails' },
] as const;

const SECTIONS: { key: string; title: string; sub: string; icon: IconName; tint: string; bg: string; route: string }[] = [
  { key: 'vacancies', title: 'Vakansiyalar', sub: 'Açıq və bağlı vəzifələr', icon: 'briefcase-outline', tint: '#E02424', bg: '#FDE8E8', route: '/hr/vacancies' },
  { key: 'applications', title: 'Müraciətlər', sub: 'CV seçimi və baxış', icon: 'documents-outline', tint: '#3D4ED6', bg: '#E5E8FF', route: '/hr/applications' },
  { key: 'employees', title: 'İşçilər', sub: 'Kadr uçotu və sənədlər', icon: 'people-outline', tint: '#0E9F6E', bg: '#DEF7EC', route: '/hr/employees' },
  { key: 'templates', title: 'E-poçt şablonları', sub: 'Avtomatik məktublar', icon: 'copy-outline', tint: '#7C3AED', bg: '#EDE9FE', route: '/hr/templates' },
  { key: 'emails', title: 'E-poçt jurnalı', sub: 'Çatdırılma tarixçəsi', icon: 'mail-outline', tint: '#0EA5E9', bg: '#E0F2FE', route: '/hr/emails' },
];

export default function HrHub() {
  const router = useRouter();
  const unread = notifications.filter((n) => n.unread).length;
  const go = (route: string) => router.push(route as never);
  const recent = applications.slice(0, 4);

  return (
    <Screen>
      <Hero>
        <View style={styles.heroTop}>
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="people" size={22} color="#fff" />
            </View>
            <View style={{ marginLeft: spacing.md }}>
              <Text style={styles.brandTitle}>İnsan resursları</Text>
              <Text style={styles.brandSub}>İşə qəbul dövrünə ümumi baxış</Text>
            </View>
          </View>
          <HeaderIconButton icon="notifications" badge={unread > 0} onPress={() => go('/notifications')} />
        </View>

        <Pressable onPress={() => go('/hr/vacancies')} style={styles.newBtn}>
          <Ionicons name="add" size={18} color={colors.primary} />
          <Text style={styles.newBtnText}>Yeni vakansiya</Text>
        </Pressable>
      </Hero>

      {/* KPI tiles */}
      <View style={styles.kpiGrid}>
        {KPIS.map((k) => (
          <KpiTile
            key={k.key}
            label={k.label}
            value={hrStats[k.key as keyof typeof hrStats]}
            icon={k.icon as IconName}
            grad={k.grad as unknown as [string, string]}
            wash={k.wash}
            onPress={() => go(k.route)}
          />
        ))}
      </View>

      {/* Section navigation */}
      <View style={styles.section}>
        <Text style={styles.groupTitle}>Bölmələr</Text>
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {SECTIONS.map((s, i) => (
            <View key={s.key}>
              <Pressable
                onPress={() => go(s.route)}
                style={({ pressed }) => [styles.navRow, pressed && styles.pressed]}>
                <IconChip icon={s.icon} color={s.tint} bg={s.bg} size={44} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.navTitle}>{s.title}</Text>
                  <Text style={styles.navSub}>{s.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
              </Pressable>
              {i < SECTIONS.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </Card>
      </View>

      {/* Recent applications */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.groupTitle}>Son müraciətlər</Text>
          <Pressable onPress={() => go('/hr/applications')} hitSlop={8}>
            <Text style={styles.link}>Hamısı</Text>
          </Pressable>
        </View>
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {recent.map((a, i) => {
            const meta = appStatusMeta[a.status];
            return (
              <View key={a.id}>
                <Pressable
                  onPress={() => go(`/hr/applications/${a.id}`)}
                  style={({ pressed }) => [styles.appRow, pressed && styles.pressed]}>
                  <View style={[styles.avatar, { backgroundColor: meta.bg }]}>
                    <Text style={[styles.avatarText, { color: meta.color }]}>{initialsOf(a)}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.navTitle}>{fullName(a)}</Text>
                    <Text style={styles.navSub} numberOfLines={1}>{a.vacancyTitle}</Text>
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

const styles = StyleSheet.create({
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: { ...typography.h2, color: '#fff' },
  brandSub: { ...typography.small, color: 'rgba(255,255,255,0.7)', marginTop: 2 },

  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginTop: spacing.xl,
  },
  newBtnText: { ...typography.title, color: colors.primary },

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginBottom: spacing.md, marginLeft: spacing.xs },
  link: { ...typography.small, color: colors.accent, fontWeight: '700', marginBottom: spacing.md },

  navRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  navTitle: { ...typography.bodyStrong, color: colors.text },
  navSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },

  appRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  avatarText: { ...typography.bodyStrong },

  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 68 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
