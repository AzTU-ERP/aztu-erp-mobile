// Vakansiya təfərrüatı — vacancy detail with linked applications.
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Button, Card } from '@/components/ui';
import {
  AZNlite,
  appStatusMeta,
  applications,
  categoryLabel,
  fullName,
  getVacancy,
  initialsOf,
  jobTypeLabel,
  vacancyStatusMeta,
} from '@/data/hr';
import { colors, spacing, typography } from '@/theme';

export default function VacancyDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const v = getVacancy(id);

  if (!v) {
    return (
      <Screen tabBarSpace={false}>
        <PageHeader title="Vakansiya" />
        <View style={styles.missing}>
          <Ionicons name="alert-circle-outline" size={40} color={colors.textFaint} />
          <Text style={styles.missingText}>Vakansiya tapılmadı</Text>
        </View>
      </Screen>
    );
  }

  const meta = vacancyStatusMeta[v.status];
  const related = applications.filter((a) => a.vacancyId === v.id);

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Vakansiya" subtitle={v.department} />

      <View style={styles.section}>
        <Card>
          <View style={styles.headRow}>
            <Text style={styles.title}>{v.jobTitle}</Text>
            <Badge label={meta.label} color={meta.color} bg={meta.bg} />
          </View>

          <View style={styles.grid}>
            <Field label="İş növü" value={jobTypeLabel[v.jobType]} />
            <Field label="Kateqoriya" value={categoryLabel[v.category]} />
            <Field label="Maaş" value={AZNlite(v.salary)} />
            <Field label="Müraciət" value={`${v.applicants}`} />
            <Field label="Açılıb" value={v.openedAt} />
            <Field label="Bağlanma" value={v.closesAt ?? '—'} />
          </View>
        </Card>

        <Text style={styles.groupTitle}>Təsvir</Text>
        <Card>
          <Text style={styles.body}>{v.description}</Text>
        </Card>

        <View style={styles.headHint}>
          <Text style={styles.groupTitle}>Müraciətlər</Text>
          <Text style={styles.count}>{related.length}</Text>
        </View>
        {related.length === 0 ? (
          <Card>
            <Text style={styles.emptyRow}>Bu vakansiyaya hələ müraciət yoxdur</Text>
          </Card>
        ) : (
          <Card padded={false} style={{ overflow: 'hidden' }}>
            {related.map((a, i) => {
              const am = appStatusMeta[a.status];
              return (
                <View key={a.id}>
                  <Card
                    padded={false}
                    onPress={() => router.push(`/hr/applications/${a.id}` as never)}>
                    <View style={styles.appRow}>
                      <View style={[styles.avatar, { backgroundColor: am.bg }]}>
                        <Text style={[styles.avatarText, { color: am.color }]}>{initialsOf(a)}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <Text style={styles.appName}>{fullName(a)}</Text>
                        <Text style={styles.appMeta}>{a.email}</Text>
                      </View>
                      <Badge label={am.label} color={am.color} bg={am.bg} />
                    </View>
                  </Card>
                  {i < related.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              );
            })}
          </Card>
        )}

        {v.status === 'open' ? (
          <Button label="Vakansiyanı bağla" icon="lock-closed-outline" variant="ghost" style={{ marginTop: spacing.lg }} />
        ) : null}
      </View>
    </Screen>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  headRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.sm },
  title: { ...typography.h2, color: colors.text, flex: 1 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.lg },
  field: { width: '50%', marginBottom: spacing.lg },
  fieldLabel: { ...typography.caption, color: colors.textFaint, textTransform: 'uppercase' },
  fieldValue: { ...typography.bodyStrong, color: colors.text, marginTop: 3 },

  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginTop: spacing.xl, marginBottom: spacing.md, marginLeft: spacing.xs },
  headHint: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  count: { ...typography.small, color: colors.textMuted, fontWeight: '700' },
  body: { ...typography.body, color: colors.textMuted, lineHeight: 22 },

  appRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { ...typography.small, fontWeight: '700' },
  appName: { ...typography.bodyStrong, color: colors.text },
  appMeta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 64 },
  emptyRow: { ...typography.small, color: colors.textMuted, textAlign: 'center' },

  missing: { alignItems: 'center', paddingTop: spacing.xxxl },
  missingText: { ...typography.h3, color: colors.text, marginTop: spacing.md },
});
