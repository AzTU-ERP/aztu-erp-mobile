import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Card } from '@/components/ui';
import { AZN, payrollRuns, runStatusMeta } from '@/data';
import { colors, radius, spacing, typography } from '@/theme';

export default function Runs() {
  const totalYtd = payrollRuns.reduce((s, r) => s + r.total, 0);

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Maaş hesablamaları" subtitle="Payroll runs" />

      <View style={styles.section}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Cəmi ödəniş (4 ay)</Text>
            <Text style={styles.summaryValue}>{AZN(totalYtd)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Orta əməkdaş</Text>
            <Text style={styles.summaryValue}>410</Text>
          </View>
        </View>

        {payrollRuns.map((r) => {
          const meta = runStatusMeta[r.status];
          return (
            <Card key={r.id} style={styles.card} onPress={() => {}}>
              <View style={styles.cardTop}>
                <View style={styles.iconBox}>
                  <Ionicons name="calculator" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.period}>{r.period}</Text>
                  <Text style={styles.meta}>Yaradılıb {r.createdAt}</Text>
                </View>
                <Badge label={meta.label} color={meta.color} bg={meta.bg} />
              </View>
              <View style={styles.cardBottom}>
                <View>
                  <Text style={styles.miniLabel}>Əməkdaş</Text>
                  <Text style={styles.miniValue}>{r.employees}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.miniLabel}>Ümumi məbləğ</Text>
                  <Text style={styles.total}>{AZN(r.total)}</Text>
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg, gap: spacing.md },
  summaryRow: { flexDirection: 'row', gap: spacing.md },
  summaryCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg },
  summaryLabel: { ...typography.caption, color: colors.textMuted },
  summaryValue: { ...typography.h3, color: colors.text, marginTop: 4 },
  card: {},
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: '#E5E8FF', alignItems: 'center', justifyContent: 'center' },
  period: { ...typography.h3, color: colors.text },
  meta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  miniLabel: { ...typography.caption, color: colors.textMuted },
  miniValue: { ...typography.title, color: colors.text, marginTop: 2 },
  total: { ...typography.h3, color: colors.primary, marginTop: 2 },
});
