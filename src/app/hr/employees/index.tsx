// İşçilər — employees list with a status filter. Mirrors the web table.
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { FilterChips } from '@/components/hr-ui';
import { Badge, Card } from '@/components/ui';
import { AZNlite, empStatusMeta, employees, fullName, initialsOf, type EmpStatus } from '@/data/hr';
import { colors, spacing, typography } from '@/theme';

const STATUS_OPTIONS = (Object.keys(empStatusMeta) as EmpStatus[]).map((s) => ({
  value: s,
  label: empStatusMeta[s].label,
}));

export default function EmployeesList() {
  const router = useRouter();
  const [status, setStatus] = useState('');

  const list = useMemo(
    () => (status ? employees.filter((e) => e.status === status) : employees),
    [status],
  );

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="İşçilər" subtitle={`${employees.length} əməkdaş`} />

      <View style={styles.filters}>
        <FilterChips options={STATUS_OPTIONS} value={status} onChange={setStatus} />
      </View>

      <View style={styles.section}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={40} color={colors.textFaint} />
            <Text style={styles.emptyTitle}>İşçi tapılmadı</Text>
          </View>
        ) : (
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {list.map((e, i) => {
              const meta = empStatusMeta[e.status];
              return (
                <View key={e.id}>
                  <Card padded={false} onPress={() => router.push(`/hr/employees/${e.id}` as never)}>
                    <View style={styles.row}>
                      <View style={[styles.avatar, { backgroundColor: meta.bg }]}>
                        <Text style={[styles.avatarText, { color: meta.color }]}>{initialsOf(e)}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <Text style={styles.name}>{fullName(e)}</Text>
                        <Text style={styles.meta} numberOfLines={1}>{e.jobTitle} · {e.department}</Text>
                      </View>
                      <View style={styles.right}>
                        <Text style={styles.salary}>{AZNlite(e.salary)}</Text>
                        <Badge label={meta.label} color={meta.color} bg={meta.bg} />
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
  right: { alignItems: 'flex-end', gap: 6 },
  salary: { ...typography.bodyStrong, color: colors.text },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 68 },

  empty: { alignItems: 'center', paddingTop: spacing.xxxl },
  emptyTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md },
});
