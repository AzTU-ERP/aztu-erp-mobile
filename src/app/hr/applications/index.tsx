// Müraciətlər — CV screening list with a status filter. Mirrors the web table.
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { FilterChips } from '@/components/hr-ui';
import { Badge, Card } from '@/components/ui';
import { appStatusMeta, applications, fullName, initialsOf, type AppStatus } from '@/data/hr';
import { colors, spacing, typography } from '@/theme';

const STATUS_OPTIONS = (Object.keys(appStatusMeta) as AppStatus[]).map((s) => ({
  value: s,
  label: appStatusMeta[s].label,
}));

export default function ApplicationsList() {
  const router = useRouter();
  const [status, setStatus] = useState('');

  const list = useMemo(
    () => (status ? applications.filter((a) => a.status === status) : applications),
    [status],
  );

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Müraciətlər" subtitle="CV seçimi" />

      <View style={styles.filters}>
        <FilterChips options={STATUS_OPTIONS} value={status} onChange={setStatus} />
      </View>

      <View style={styles.section}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="documents-outline" size={40} color={colors.textFaint} />
            <Text style={styles.emptyTitle}>Müraciət tapılmadı</Text>
          </View>
        ) : (
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {list.map((a, i) => {
              const meta = appStatusMeta[a.status];
              return (
                <View key={a.id}>
                  <Card padded={false} onPress={() => router.push(`/hr/applications/${a.id}` as never)}>
                    <View style={styles.row}>
                      <View style={[styles.avatar, { backgroundColor: meta.bg }]}>
                        <Text style={[styles.avatarText, { color: meta.color }]}>{initialsOf(a)}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <Text style={styles.name}>{fullName(a)}</Text>
                        <Text style={styles.meta} numberOfLines={1}>{a.vacancyTitle}</Text>
                        <View style={styles.subRow}>
                          <Ionicons name="time-outline" size={13} color={colors.textFaint} />
                          <Text style={styles.time}>{a.submittedAt}</Text>
                        </View>
                      </View>
                      <View style={styles.right}>
                        <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                        {a.cv ? <Ionicons name="document-attach-outline" size={16} color={colors.textFaint} style={{ marginTop: 8 }} /> : null}
                      </View>
                    </View>
                  </Card>
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
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { ...typography.bodyStrong },
  name: { ...typography.bodyStrong, color: colors.text },
  meta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  subRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  time: { ...typography.caption, color: colors.textFaint },
  right: { alignItems: 'flex-end' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 68 },

  empty: { alignItems: 'center', paddingTop: spacing.xxxl },
  emptyTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md },
});
