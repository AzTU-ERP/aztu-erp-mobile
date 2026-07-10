import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Button, Card, Divider } from '@/components/ui';
import { AZN, payslip } from '@/data';
import { colors, gradients, radius, spacing, typography } from '@/theme';

export default function Payslip() {
  const totalEarnings = payslip.earnings.reduce((s, e) => s + e.amount, 0);
  const totalDeductions = payslip.deductions.reduce((s, d) => s + d.amount, 0);

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Maaş vərəqi" subtitle={payslip.period} />

      <View style={styles.section}>
        {/* net card */}
        <LinearGradient
          colors={gradients.brand as unknown as [string, string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.netCard}>
          <Text style={styles.netLabel}>Xalis əməkhaqqı</Text>
          <Text style={styles.netValue}>{AZN(payslip.net)}</Text>
          <View style={styles.netRow}>
            <Badge label="Təsdiqlənib" color="#0E9F6E" bg="rgba(255,255,255,0.9)" icon="checkmark-circle" />
            <Text style={styles.netDate}>Ödəniş: {payslip.payDate}</Text>
          </View>
        </LinearGradient>

        {/* earnings */}
        <Text style={styles.groupTitle}>Hesablamalar</Text>
        <Card>
          {payslip.earnings.map((e, i) => (
            <View key={e.id}>
              <Row label={e.name} value={AZN(e.amount)} />
              {i < payslip.earnings.length - 1 ? <Divider style={{ marginVertical: 4 }} /> : null}
            </View>
          ))}
          <Divider style={{ marginVertical: spacing.sm }} />
          <Row label="Cəmi hesablama" value={AZN(totalEarnings)} strong color={colors.success} />
        </Card>

        {/* deductions */}
        <Text style={styles.groupTitle}>Tutulmalar</Text>
        <Card>
          {payslip.deductions.map((d, i) => (
            <View key={d.id}>
              <Row label={d.name} value={`− ${AZN(d.amount)}`} valueColor={colors.danger} />
              {i < payslip.deductions.length - 1 ? <Divider style={{ marginVertical: 4 }} /> : null}
            </View>
          ))}
          <Divider style={{ marginVertical: spacing.sm }} />
          <Row label="Cəmi tutulma" value={`− ${AZN(totalDeductions)}`} strong color={colors.danger} />
        </Card>

        {/* summary */}
        <Card style={{ marginTop: spacing.lg }}>
          <Row label="Ümumi (brutto)" value={AZN(payslip.gross)} />
          <Divider style={{ marginVertical: spacing.sm }} />
          <Row label="Tutulmalar" value={`− ${AZN(totalDeductions)}`} valueColor={colors.danger} />
          <Divider style={{ marginVertical: spacing.sm }} />
          <Row label="Xalis (netto)" value={AZN(payslip.net)} strong color={colors.primary} />
        </Card>

        <Button label="PDF olaraq yüklə" icon="download-outline" variant="gold" style={{ marginTop: spacing.lg }} />
      </View>
    </Screen>
  );
}

function Row({
  label,
  value,
  strong,
  color,
  valueColor,
}: {
  label: string;
  value: string;
  strong?: boolean;
  color?: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, strong && { fontWeight: '700', color: color ?? colors.text }]}>{label}</Text>
      <Text style={[styles.rowValue, strong && { fontWeight: '800' }, { color: valueColor ?? color ?? colors.text }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  netCard: { borderRadius: radius.xl, padding: spacing.xl },
  netLabel: { ...typography.small, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  netValue: { fontSize: 36, fontWeight: '800', color: '#fff', marginTop: 4, letterSpacing: -1 },
  netRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.lg },
  netDate: { ...typography.small, color: 'rgba(255,255,255,0.85)' },
  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginTop: spacing.xl, marginBottom: spacing.sm, marginLeft: spacing.xs },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  rowLabel: { ...typography.body, color: colors.textMuted },
  rowValue: { ...typography.bodyStrong, color: colors.text },
});
