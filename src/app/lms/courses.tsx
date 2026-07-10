import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Card, ProgressBar } from '@/components/ui';
import { courses } from '@/data';
import { colors, radius, spacing, typography } from '@/theme';

export default function Courses() {
  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Fənlər" subtitle={`${courses.length} aktiv fənn · 2026 Yaz`} />

      <View style={styles.section}>
        {courses.map((c) => (
          <Card key={c.id} style={styles.card}>
            <View style={styles.top}>
              <View style={[styles.codeBox, { backgroundColor: c.color + '1A' }]}>
                <Text style={[styles.code, { color: c.color }]}>{c.code.split('-')[1]}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.name} numberOfLines={2}>
                  {c.name}
                </Text>
                <Text style={styles.meta}>
                  {c.code} · Qrup {c.group}
                </Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <Stat icon="people-outline" value={`${c.students}`} label="Tələbə" />
              <Stat icon="ribbon-outline" value={`${c.credits}`} label="Kredit" />
              <Stat icon="checkmark-done-outline" value={`${c.attendance}%`} label="Davamiyyət" />
            </View>

            <View style={{ marginTop: spacing.md }}>
              <ProgressBar value={c.attendance} color={c.color} height={6} />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon as never} size={16} color={colors.textMuted} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg, gap: spacing.md },
  card: {},
  top: { flexDirection: 'row', alignItems: 'center' },
  codeBox: { width: 52, height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  code: { ...typography.h3, fontWeight: '800' },
  name: { ...typography.bodyStrong, color: colors.text },
  meta: { ...typography.small, color: colors.textMuted, marginTop: 3 },
  statsRow: { flexDirection: 'row', marginTop: spacing.lg, gap: spacing.md },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { ...typography.title, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textMuted },
});
