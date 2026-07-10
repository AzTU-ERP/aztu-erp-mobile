import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Card, IconChip } from '@/components/ui';
import { colors, radius, spacing, typography } from '@/theme';

type Item = { title: string; sub: string; icon: string; badge?: string; badgeColor?: string; badgeBg?: string };
type ModuleDef = {
  title: string;
  subtitle: string;
  icon: string;
  tint: string;
  bg: string;
  stats: { label: string; value: string }[];
  sections: { title: string; items: Item[] }[];
};

const MODULES: Record<string, ModuleDef> = {
  hr: {
    title: 'HR',
    subtitle: 'İnsan resursları',
    icon: 'people',
    tint: '#3D4ED6',
    bg: '#E5E8FF',
    stats: [
      { label: 'Əməkdaş', value: '412' },
      { label: 'Məzuniyyətdə', value: '18' },
      { label: 'Vakansiya', value: '7' },
    ],
    sections: [
      {
        title: 'Sorğular',
        items: [
          { title: 'Məzuniyyət sorğuları', sub: '4 gözləyən təsdiq', icon: 'airplane-outline', badge: '4', badgeColor: '#C27803', badgeBg: '#FDF6B2' },
          { title: 'İş vaxtı hesabatı', sub: 'İyul 2026', icon: 'time-outline' },
          { title: 'Ezamiyyətlər', sub: '2 aktiv', icon: 'briefcase-outline' },
        ],
      },
      {
        title: 'Kafedra üzrə',
        items: [
          { title: 'İT kafedrası', sub: '32 əməkdaş', icon: 'business-outline' },
          { title: 'Riyaziyyat kafedrası', sub: '28 əməkdaş', icon: 'business-outline' },
        ],
      },
    ],
  },
  library: {
    title: 'Kitabxana',
    subtitle: 'Kataloq və icarələr',
    icon: 'library',
    tint: '#7C3AED',
    bg: '#EDE9FE',
    stats: [
      { label: 'Kitab', value: '48.2K' },
      { label: 'İcarədə', value: '312' },
      { label: 'Gecikmə', value: '9' },
    ],
    sections: [
      {
        title: 'Mənim icarələrim',
        items: [
          { title: 'Alqoritmlərə giriş (CLRS)', sub: 'Qaytarılma: 22 İyul', icon: 'book-outline', badge: '12 gün', badgeColor: '#0E9F6E', badgeBg: '#DEF7EC' },
          { title: 'Verilənlər bazası sistemləri', sub: 'Qaytarılma: 09 İyul', icon: 'book-outline', badge: 'Gecikmə', badgeColor: '#E02424', badgeBg: '#FDE8E8' },
        ],
      },
      {
        title: 'Kateqoriyalar',
        items: [
          { title: 'İnformatika', sub: '8 420 kitab', icon: 'code-slash-outline' },
          { title: 'Mühəndislik', sub: '11 250 kitab', icon: 'construct-outline' },
          { title: 'Riyaziyyat', sub: '6 180 kitab', icon: 'calculator-outline' },
        ],
      },
    ],
  },
  turnstile: {
    title: 'Turnstile',
    subtitle: 'Keçid nəzarəti',
    icon: 'scan',
    tint: '#E02424',
    bg: '#FDE8E8',
    stats: [
      { label: 'Bu gün keçid', value: '1 284' },
      { label: 'Aktiv qapı', value: '14' },
      { label: 'İcazə', value: '9 320' },
    ],
    sections: [
      {
        title: 'Son keçidlər',
        items: [
          { title: 'Əsas giriş — Blok A', sub: 'Bu gün 08:42 · Giriş', icon: 'log-in-outline', badge: 'İcazəli', badgeColor: '#0E9F6E', badgeBg: '#DEF7EC' },
          { title: 'Kitabxana girişi', sub: 'Bu gün 11:15 · Giriş', icon: 'log-in-outline', badge: 'İcazəli', badgeColor: '#0E9F6E', badgeBg: '#DEF7EC' },
          { title: 'İdarə binası — Blok C', sub: 'Bu gün 09:03 · Rədd edildi', icon: 'log-out-outline', badge: 'Rədd', badgeColor: '#E02424', badgeBg: '#FDE8E8' },
        ],
      },
      {
        title: 'Qapılar',
        items: [
          { title: 'Blok A — Əsas giriş', sub: 'Onlayn · 4 turniket', icon: 'hardware-chip-outline', badge: 'Onlayn', badgeColor: '#0E9F6E', badgeBg: '#DEF7EC' },
          { title: 'Blok B — Yan giriş', sub: 'Onlayn · 2 turniket', icon: 'hardware-chip-outline', badge: 'Onlayn', badgeColor: '#0E9F6E', badgeBg: '#DEF7EC' },
        ],
      },
    ],
  },
  exports: {
    title: 'İxraclar',
    subtitle: 'Hesabat və sənədlər',
    icon: 'download',
    tint: '#0E9F6E',
    bg: '#DEF7EC',
    stats: [
      { label: 'Hazır', value: '24' },
      { label: 'Emalda', value: '2' },
      { label: 'Bu ay', value: '31' },
    ],
    sections: [
      {
        title: 'Son ixraclar',
        items: [
          { title: 'Maaş hesabatı — İyul.xlsx', sub: '412 sətir · 2.1 MB', icon: 'document-outline', badge: 'Hazır', badgeColor: '#0E9F6E', badgeBg: '#DEF7EC' },
          { title: 'Ödəniş tarixçəsi.pdf', sub: 'İyun 2026 · 1.4 MB', icon: 'document-outline', badge: 'Hazır', badgeColor: '#0E9F6E', badgeBg: '#DEF7EC' },
          { title: 'Əməkdaş qazancları.csv', sub: 'Emal olunur…', icon: 'document-outline', badge: 'Emalda', badgeColor: '#0EA5E9', badgeBg: '#E0F2FE' },
        ],
      },
    ],
  },
};

export default function ModuleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const mod = MODULES[slug ?? ''] ?? MODULES.hr;

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title={mod.title} subtitle={mod.subtitle} />

      <View style={styles.section}>
        {/* stats */}
        <View style={styles.statsRow}>
          {mod.stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {mod.sections.map((sec) => (
          <View key={sec.title} style={{ marginTop: spacing.xl }}>
            <Text style={styles.groupTitle}>{sec.title}</Text>
            <Card padded={false} style={{ overflow: 'hidden' }}>
              {sec.items.map((it, i) => (
                <View key={it.title}>
                  <View style={styles.row}>
                    <IconChip icon={it.icon as never} color={mod.tint} bg={mod.bg} size={40} />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.rowTitle}>{it.title}</Text>
                      <Text style={styles.rowSub}>{it.sub}</Text>
                    </View>
                    {it.badge ? (
                      <Badge label={it.badge} color={it.badgeColor ?? colors.textMuted} bg={it.badgeBg ?? colors.surfaceAlt} />
                    ) : (
                      <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
                    )}
                  </View>
                  {i < sec.items.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              ))}
            </Card>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, alignItems: 'center' },
  statValue: { ...typography.h3, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginBottom: spacing.sm, marginLeft: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  rowTitle: { ...typography.bodyStrong, color: colors.text },
  rowSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 64 },
});
