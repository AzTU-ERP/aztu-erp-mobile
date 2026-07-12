// E-poçt jurnalı — email delivery log with a status filter.
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { FilterChips } from '@/components/hr-ui';
import { Badge, Card } from '@/components/ui';
import { emailLogs, emailStatusMeta, type EmailStatus } from '@/data/hr';
import { colors, spacing, typography } from '@/theme';

const STATUS_OPTIONS = (Object.keys(emailStatusMeta) as EmailStatus[]).map((s) => ({
  value: s,
  label: emailStatusMeta[s].label,
}));

const STATUS_ICON: Record<EmailStatus, string> = {
  pending: 'time-outline',
  sent: 'checkmark-done-outline',
  failed: 'warning-outline',
};

export default function EmailsList() {
  const [status, setStatus] = useState('');

  const list = useMemo(
    () => (status ? emailLogs.filter((m) => m.status === status) : emailLogs),
    [status],
  );

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="E-poçt jurnalı" subtitle="Çatdırılma tarixçəsi" />

      <View style={styles.filters}>
        <FilterChips options={STATUS_OPTIONS} value={status} onChange={setStatus} />
      </View>

      <View style={styles.section}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="mail-outline" size={40} color={colors.textFaint} />
            <Text style={styles.emptyTitle}>Qeyd tapılmadı</Text>
          </View>
        ) : (
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {list.map((m, i) => {
              const meta = emailStatusMeta[m.status];
              return (
                <View key={m.id}>
                  <View style={styles.row}>
                    <View style={[styles.iconWrap, { backgroundColor: meta.bg }]}>
                      <Ionicons name={STATUS_ICON[m.status] as never} size={18} color={meta.color} />
                    </View>
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.subject} numberOfLines={1}>{m.subject}</Text>
                      <Text style={styles.to} numberOfLines={1}>{m.to}</Text>
                      <Text style={styles.time}>{m.sentAt ?? `Növbəyə alınıb: ${m.createdAt}`}</Text>
                    </View>
                    <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                  </View>
                  {i < list.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              );
            })}
          </Card>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { marginTop: spacing.lg },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.md },

  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  subject: { ...typography.bodyStrong, color: colors.text },
  to: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  time: { ...typography.caption, color: colors.textFaint, marginTop: 3 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 64 },

  empty: { alignItems: 'center', paddingTop: spacing.xxxl },
  emptyTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md },
});
