// ─────────────────────────────────────────────────────────────────────────────
// HR-specific building blocks layered on top of the shared design system:
// a horizontal filter-chip row and a glossy KPI tile for the HR hub.
// ─────────────────────────────────────────────────────────────────────────────
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadow, spacing, typography } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;
export type ChipOption = { value: string; label: string };

/** Horizontally scrollable single-select filter chips. Empty value ('') = all. */
export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: ChipOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const all: ChipOption[] = [{ value: '', label: 'Hamısı' }, ...options];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipRow}>
      {all.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value || 'all'}
            onPress={() => onChange(o.value)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/** Glossy 3D-style KPI tile: gradient icon squircle + value + label. */
export function KpiTile({
  label,
  value,
  icon,
  grad,
  wash,
  onPress,
}: {
  label: string;
  value: string | number;
  icon: IconName;
  grad: [string, string];
  wash: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.kpi, pressed && styles.pressed]}>
      <LinearGradient
        colors={['#FFFFFF', wash]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.kpiIconShadow, { shadowColor: grad[1] }]}>
        <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.kpiIcon}>
          <LinearGradient
            colors={['rgba(255,255,255,0.42)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name={icon} size={20} color="#fff" />
        </LinearGradient>
      </View>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiLabel} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chipRow: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: 2 },
  chip: {
    paddingHorizontal: spacing.lg,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.small, color: colors.textMuted, fontWeight: '600' },
  chipTextActive: { color: '#fff' },

  kpi: {
    width: '47%',
    flexGrow: 1,
    height: 132,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    ...shadow.card,
  },
  kpiIconShadow: { shadowOpacity: 0.4, shadowRadius: 9, shadowOffset: { width: 0, height: 6 }, elevation: 6, alignSelf: 'flex-start' },
  kpiIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  kpiValue: { ...typography.h1, color: colors.text, marginTop: spacing.md },
  kpiLabel: { ...typography.small, color: colors.textMuted, marginTop: 2 },

  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});
