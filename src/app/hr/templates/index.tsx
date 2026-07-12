// E-poçt şablonları — email templates with a type filter and expandable preview.
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { FilterChips } from '@/components/hr-ui';
import { Badge, Card, IconChip } from '@/components/ui';
import { templateTypeLabel, templates, type TemplateType } from '@/data/hr';
import { colors, spacing, typography } from '@/theme';

const TYPE_OPTIONS = (Object.keys(templateTypeLabel) as TemplateType[]).map((t) => ({
  value: t,
  label: templateTypeLabel[t],
}));

const TYPE_ICON: Record<TemplateType, string> = {
  approval: 'checkmark-circle-outline',
  rejection: 'close-circle-outline',
  onboarding_step: 'person-add-outline',
  termination: 'exit-outline',
};

export default function TemplatesList() {
  const [type, setType] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(
    () => (type ? templates.filter((t) => t.type === type) : templates),
    [type],
  );

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="E-poçt şablonları" subtitle="Avtomatik məktublar" />

      <View style={styles.filters}>
        <FilterChips options={TYPE_OPTIONS} value={type} onChange={setType} />
      </View>

      <View style={styles.section}>
        {list.map((tpl) => {
          const expanded = open === tpl.id;
          return (
            <Card key={tpl.id} style={styles.card} onPress={() => setOpen(expanded ? null : tpl.id)}>
              <View style={styles.top}>
                <IconChip icon={TYPE_ICON[tpl.type] as never} color="#7C3AED" bg="#EDE9FE" size={44} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.name}>{tpl.name}</Text>
                  <Text style={styles.type}>{templateTypeLabel[tpl.type]}</Text>
                </View>
                <Badge
                  label={tpl.active ? 'Aktiv' : 'Qeyri-aktiv'}
                  color={tpl.active ? '#0E9F6E' : '#6B7390'}
                  bg={tpl.active ? '#DEF7EC' : '#EEF0F6'}
                />
              </View>

              <View style={styles.subjectRow}>
                <Text style={styles.subjectLabel}>Mövzu</Text>
                <Text style={styles.subject}>{tpl.subject}</Text>
              </View>

              {expanded ? (
                <View style={styles.bodyWrap}>
                  <Text style={styles.body}>{tpl.body}</Text>
                  <Text style={styles.updated}>Yenilənib: {tpl.updatedAt}</Text>
                </View>
              ) : null}

              <View style={styles.expandRow}>
                <Text style={styles.expandText}>{expanded ? 'Gizlət' : 'Mətnə bax'}</Text>
                <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={colors.accent} />
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { marginTop: spacing.lg },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.md, gap: spacing.md },

  card: { padding: spacing.lg },
  top: { flexDirection: 'row', alignItems: 'center' },
  name: { ...typography.bodyStrong, color: colors.text },
  type: { ...typography.small, color: colors.textMuted, marginTop: 2 },

  subjectRow: { marginTop: spacing.lg },
  subjectLabel: { ...typography.caption, color: colors.textFaint, textTransform: 'uppercase' },
  subject: { ...typography.body, color: colors.text, marginTop: 3 },

  bodyWrap: { marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  body: { ...typography.small, color: colors.textMuted, lineHeight: 20 },
  updated: { ...typography.caption, color: colors.textFaint, marginTop: spacing.md },

  expandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: spacing.md },
  expandText: { ...typography.small, color: colors.accent, fontWeight: '700' },
});
