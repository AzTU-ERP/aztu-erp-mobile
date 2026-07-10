import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Card, Divider, IconChip } from '@/components/ui';
import { sessions, trustedDevices } from '@/data';
import { colors, spacing, typography } from '@/theme';

export default function Security() {
  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Təhlükəsizlik" subtitle="Sessiyalar və cihazlar" />

      <View style={styles.section}>
        {/* status */}
        <Card style={styles.statusCard}>
          <IconChip icon="shield-checkmark" color={colors.success} bg="#DEF7EC" size={48} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.statusTitle}>Hesab qorunur</Text>
            <Text style={styles.statusSub}>İki mərhələli doğrulama aktivdir</Text>
          </View>
          <Badge label="Aktiv" color={colors.success} bg="#DEF7EC" />
        </Card>

        <Text style={styles.groupTitle}>Aktiv sessiyalar</Text>
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {sessions.map((s, i) => (
            <View key={s.id}>
              <View style={styles.row}>
                <IconChip
                  icon={s.device.includes('iPhone') ? 'phone-portrait-outline' : 'laptop-outline'}
                  color={s.current ? colors.success : colors.primary}
                  bg={s.current ? '#DEF7EC' : colors.surfaceAlt}
                  size={40}
                />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.rowTitle}>{s.device}</Text>
                  <Text style={styles.rowSub}>
                    {s.location} · {s.ip} · {s.at}
                  </Text>
                </View>
                {s.current ? (
                  <Badge label="Bu cihaz" color={colors.success} bg="#DEF7EC" />
                ) : (
                  <Ionicons name="close-circle-outline" size={22} color={colors.danger} />
                )}
              </View>
              {i < sessions.length - 1 ? <Divider style={{ marginLeft: 64 }} /> : null}
            </View>
          ))}
        </Card>

        <Text style={styles.groupTitle}>Etibarlı cihazlar</Text>
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {trustedDevices.map((d, i) => (
            <View key={d.id}>
              <View style={styles.row}>
                <IconChip icon="hardware-chip-outline" color={colors.primary} bg={colors.surfaceAlt} size={40} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.rowTitle}>{d.name}</Text>
                  <Text style={styles.rowSub}>Son aktivlik: {d.lastSeen}</Text>
                </View>
                <Badge
                  label={d.trusted ? 'Etibarlı' : 'Etibarsız'}
                  color={d.trusted ? colors.success : colors.textMuted}
                  bg={d.trusted ? '#DEF7EC' : colors.surfaceAlt}
                />
              </View>
              {i < trustedDevices.length - 1 ? <Divider style={{ marginLeft: 64 }} /> : null}
            </View>
          ))}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  statusCard: { flexDirection: 'row', alignItems: 'center' },
  statusTitle: { ...typography.bodyStrong, color: colors.text },
  statusSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginTop: spacing.xl, marginBottom: spacing.sm, marginLeft: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  rowTitle: { ...typography.bodyStrong, color: colors.text },
  rowSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },
});
