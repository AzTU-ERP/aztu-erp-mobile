import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Card, IconChip } from '@/components/ui';
import { Activity, notifications } from '@/data';
import { colors, radius, spacing, typography } from '@/theme';

const FILTERS: { key: 'all' | Activity['type']; label: string }[] = [
  { key: 'all', label: 'Hamısı' },
  { key: 'security', label: 'Təhlükəsizlik' },
  { key: 'finance', label: 'Maliyyə' },
  { key: 'attendance', label: 'Davamiyyət' },
  { key: 'exam', label: 'İmtahan' },
];

const META: Record<Activity['type'], { icon: string; color: string; bg: string }> = {
  security: { icon: 'shield-checkmark', color: '#E02424', bg: '#FDE8E8' },
  finance: { icon: 'wallet', color: '#F5A524', bg: '#FDEFD3' },
  attendance: { icon: 'checkmark-done', color: '#0E9F6E', bg: '#DEF7EC' },
  exam: { icon: 'document-text', color: '#3D4ED6', bg: '#E5E8FF' },
  system: { icon: 'sync', color: '#0EA5E9', bg: '#E0F2FE' },
};

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | Activity['type']>('all');
  const unread = notifications.filter((n) => n.unread).length;
  const list = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter);

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Bildirişlər" subtitle={`${unread} yeni · ${notifications.length} ümumi`} />

      {/* filter chips */}
      <View style={styles.chipsWrap}>
        <View style={styles.chips}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        {list.map((n) => {
          const m = META[n.type];
          return (
            <Card key={n.id} style={styles.item} onPress={() => {}}>
              <IconChip icon={m.icon as never} color={m.color} bg={m.bg} size={42} />
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <View style={styles.itemHead}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {n.title}
                  </Text>
                  {n.unread ? <View style={styles.unreadDot} /> : null}
                </View>
                <Text style={styles.itemDetail}>{n.detail}</Text>
                <Text style={styles.itemTime}>{n.time}</Text>
              </View>
            </Card>
          );
        })}
        {list.length === 0 ? (
          <View style={styles.empty}>
            <IconChip icon="notifications-off-outline" color={colors.textFaint} bg={colors.surfaceAlt} size={56} />
            <Text style={styles.emptyText}>Bu kateqoriyada bildiriş yoxdur</Text>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.h1, color: '#fff', marginTop: spacing.sm },
  sub: { ...typography.small, color: 'rgba(255,255,255,0.75)', marginTop: 4 },

  chipsWrap: { marginTop: spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.lg },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.small, color: colors.textMuted, fontWeight: '600' },
  chipTextActive: { color: '#fff' },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg, gap: spacing.md },
  item: { flexDirection: 'row', alignItems: 'flex-start' },
  itemHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemTitle: { ...typography.bodyStrong, color: colors.text, flex: 1 },
  unreadDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.accent, marginLeft: spacing.sm },
  itemDetail: { ...typography.small, color: colors.textMuted, marginTop: 4 },
  itemTime: { ...typography.caption, color: colors.textFaint, marginTop: 6 },

  empty: { alignItems: 'center', paddingVertical: spacing.xxxl, gap: spacing.md },
  emptyText: { ...typography.body, color: colors.textMuted },
});
