import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Card, IconChip } from '@/components/ui';
import { AZN, bonuses } from '@/data';
import { colors, spacing, typography } from '@/theme';

export default function Bonuses() {
  const total = bonuses.reduce((s, b) => s + b.amount, 0);

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Premyalar" subtitle="Mükafat və əlavələr" />

      <View style={styles.section}>
        <View style={styles.banner}>
          <IconChip icon="gift" color="#7C3AED" bg="rgba(255,255,255,0.25)" size={48} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.bannerLabel}>Bu ay ümumi premya</Text>
            <Text style={styles.bannerValue}>{AZN(total)}</Text>
          </View>
        </View>

        {bonuses.map((b) => (
          <Card key={b.id} style={styles.card}>
            <IconChip icon="ribbon" color="#7C3AED" bg="#EDE9FE" size={44} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.reason}>{b.reason}</Text>
              <Text style={styles.meta}>{b.employee} · {b.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 6 }}>
              <Text style={styles.amount}>+{AZN(b.amount)}</Text>
              <Badge
                label={b.status === 'approved' ? 'Təsdiqlənib' : 'Gözləyir'}
                color={b.status === 'approved' ? colors.success : colors.warning}
                bg={b.status === 'approved' ? '#DEF7EC' : '#FDF6B2'}
              />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg, gap: spacing.md },
  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7C3AED', borderRadius: 20, padding: spacing.lg },
  bannerLabel: { ...typography.small, color: 'rgba(255,255,255,0.85)' },
  bannerValue: { ...typography.h1, color: '#fff', marginTop: 2 },
  card: { flexDirection: 'row', alignItems: 'center' },
  reason: { ...typography.bodyStrong, color: colors.text },
  meta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  amount: { ...typography.title, color: colors.success },
});
