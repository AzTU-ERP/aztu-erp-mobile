// Vakansiyalar — vacancies list with a status filter. Mirrors the web table.
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { FilterChips } from '@/components/hr-ui';
import { Badge, Card } from '@/components/ui';
import {
  AZNlite,
  categoryLabel,
  jobTypeLabel,
  vacancies,
  vacancyStatusMeta,
  type VacancyStatus,
} from '@/data/hr';
import { colors, spacing, typography } from '@/theme';

const STATUS_OPTIONS = (Object.keys(vacancyStatusMeta) as VacancyStatus[]).map((s) => ({
  value: s,
  label: vacancyStatusMeta[s].label,
}));

export default function VacanciesList() {
  const router = useRouter();
  const [status, setStatus] = useState('');

  const list = useMemo(
    () => (status ? vacancies.filter((v) => v.status === status) : vacancies),
    [status],
  );

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Vakansiyalar" subtitle={`${vacancies.length} vəzifə`} />

      <View style={styles.filters}>
        <FilterChips options={STATUS_OPTIONS} value={status} onChange={setStatus} />
      </View>

      <View style={styles.section}>
        {list.length === 0 ? (
          <Empty />
        ) : (
          list.map((v) => {
            const meta = vacancyStatusMeta[v.status];
            return (
              <Card
                key={v.id}
                style={styles.card}
                onPress={() => router.push(`/hr/vacancies/${v.id}` as never)}>
                <View style={styles.cardTop}>
                  <Text style={styles.jobTitle} numberOfLines={2}>{v.jobTitle}</Text>
                  <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                </View>
                <Text style={styles.dept} numberOfLines={1}>{v.department}</Text>
                <View style={styles.metaRow}>
                  <Chip icon="briefcase-outline" text={jobTypeLabel[v.jobType]} />
                  <Chip icon="pricetag-outline" text={categoryLabel[v.category]} />
                </View>
                <View style={styles.footer}>
                  <View style={styles.footerItem}>
                    <Ionicons name="cash-outline" size={15} color={colors.textMuted} />
                    <Text style={styles.footerText}>{AZNlite(v.salary)}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Ionicons name="people-outline" size={15} color={colors.textMuted} />
                    <Text style={styles.footerText}>{v.applicants} müraciət</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
                </View>
              </Card>
            );
          })
        )}
      </View>
    </Screen>
  );
}

function Chip({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon as never} size={14} color={colors.textMuted} />
      <Text style={styles.chipText}>{text}</Text>
    </View>
  );
}

function Empty() {
  return (
    <View style={styles.empty}>
      <Ionicons name="briefcase-outline" size={40} color={colors.textFaint} />
      <Text style={styles.emptyTitle}>Vakansiya tapılmadı</Text>
      <Text style={styles.emptySub}>Filtri dəyişib yenidən yoxlayın</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: { marginTop: spacing.lg },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.md, gap: spacing.md },

  card: { padding: spacing.lg },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.sm },
  jobTitle: { ...typography.h3, color: colors.text, flex: 1 },
  dept: { ...typography.small, color: colors.textMuted, marginTop: 4 },

  metaRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.surfaceAlt, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  chipText: { ...typography.caption, color: colors.textMuted },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  footerText: { ...typography.small, color: colors.textMuted, fontWeight: '600' },

  empty: { alignItems: 'center', paddingTop: spacing.xxxl },
  emptyTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md },
  emptySub: { ...typography.small, color: colors.textMuted, marginTop: 4 },
});
