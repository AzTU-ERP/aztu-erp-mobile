// ─────────────────────────────────────────────────────────────────────────────
// Shared UI primitives for the AzTU ERP app. Everything is themed from
// src/theme so screens stay declarative and consistent.
// ─────────────────────────────────────────────────────────────────────────────
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { colors, gradients, radius, shadow, spacing, typography } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({
  children,
  style,
  onPress,
  padded = true,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  padded?: boolean;
}) {
  const inner = (
    <View style={[styles.card, padded && { padding: spacing.lg }, style]}>{children}</View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        {inner}
      </Pressable>
    );
  }
  return inner;
}

// ── Section header ───────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

// ── Badge / status pill ──────────────────────────────────────────────────────
export function Badge({
  label,
  color,
  bg,
  icon,
}: {
  label: string;
  color: string;
  bg: string;
  icon?: IconName;
}) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {icon ? <Ionicons name={icon} size={12} color={color} style={{ marginRight: 4 }} /> : null}
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

// ── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({
  initials,
  size = 44,
  gradient = 'brand',
}: {
  initials: string;
  size?: number;
  gradient?: keyof typeof gradients;
}) {
  return (
    <LinearGradient
      colors={gradients[gradient] as unknown as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontWeight: '800', fontSize: size * 0.36 }}>{initials}</Text>
    </LinearGradient>
  );
}

// ── Icon chip (rounded square with tinted bg) ────────────────────────────────
export function IconChip({
  icon,
  color,
  bg,
  size = 44,
}: {
  icon: IconName;
  color: string;
  bg: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.md,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ionicons name={icon} size={size * 0.5} color={color} />
    </View>
  );
}

// ── Progress bar ─────────────────────────────────────────────────────────────
export function ProgressBar({
  value,
  color = colors.accent,
  track = colors.border,
  height = 8,
}: {
  value: number; // 0..100
  color?: string;
  track?: string;
  height?: number;
}) {
  return (
    <View style={{ height, borderRadius: height, backgroundColor: track, overflow: 'hidden' }}>
      <View
        style={{
          height,
          borderRadius: height,
          width: `${Math.max(0, Math.min(100, value))}%`,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

// ── List row (icon · title · subtitle · trailing) ────────────────────────────
export function ListRow({
  icon,
  iconColor = colors.primary,
  iconBg = colors.surfaceAlt,
  title,
  subtitle,
  trailing,
  onPress,
  danger,
}: {
  icon?: IconName;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && onPress ? styles.pressed : null]}>
      {icon ? <IconChip icon={icon} color={danger ? colors.danger : iconColor} bg={danger ? '#FDE8E8' : iconBg} size={40} /> : null}
      <View style={{ flex: 1, marginLeft: icon ? spacing.md : 0 }}>
        <Text style={[styles.rowTitle, danger && { color: colors.danger }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.rowSubtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing !== undefined ? (
        trailing
      ) : onPress ? (
        <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
      ) : null}
    </Pressable>
  );
}

// ── Button ───────────────────────────────────────────────────────────────────
export function Button({
  label,
  onPress,
  icon,
  variant = 'primary',
  style,
}: {
  label: string;
  onPress?: () => void;
  icon?: IconName;
  variant?: 'primary' | 'ghost' | 'gold';
  style?: StyleProp<ViewStyle>;
}) {
  if (variant === 'primary' || variant === 'gold') {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed, style]}>
        <LinearGradient
          colors={(variant === 'gold' ? gradients.gold : gradients.brandSoft) as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.btn}>
          {icon ? <Ionicons name={icon} size={18} color="#fff" style={{ marginRight: 8 }} /> : null}
          <Text style={styles.btnText}>{label}</Text>
        </LinearGradient>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, styles.btnGhost, pressed && styles.pressed, style]}>
      {icon ? <Ionicons name={icon} size={18} color={colors.primary} style={{ marginRight: 8 }} /> : null}
      <Text style={[styles.btnText, { color: colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  return <View style={[{ height: StyleSheet.hairlineWidth, backgroundColor: colors.border }, style]} />;
}

// ── Text helpers ─────────────────────────────────────────────────────────────
export function Overline({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.overline, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadow.card,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.985 }] },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: { ...typography.h3, color: colors.text },
  sectionAction: { ...typography.small, color: colors.accent, fontWeight: '700' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: { ...typography.caption },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  rowTitle: { ...typography.bodyStrong, color: colors.text },
  rowSubtitle: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  btn: {
    height: 52,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  btnGhost: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border },
  btnText: { color: '#fff', ...typography.title },
  overline: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase' },
});
