// Screen scaffolding: safe-area aware scroll container + brand gradient headers.
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, gradients, radius, spacing, typography } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

/** Plain scroll screen with the app background and bottom padding for the tab bar. */
export function Screen({
  children,
  scroll = true,
  contentStyle,
  tabBarSpace = true,
}: {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  tabBarSpace?: boolean;
}) {
  const pad = tabBarSpace ? 120 : spacing.xxl;
  if (!scroll) {
    return <View style={[styles.screen, { paddingBottom: pad }, contentStyle]}>{children}</View>;
  }
  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: pad }, contentStyle]}>
        {children}
      </ScrollView>
    </View>
  );
}

/**
 * Rich brand gradient hero used on the tab roots. Rounded bottom corners,
 * optional avatar/title/subtitle and trailing action.
 */
export function Hero({
  children,
  height,
}: {
  children: ReactNode;
  height?: number;
}) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={gradients.brand as unknown as [string, string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.hero, { paddingTop: insets.top + spacing.md, minHeight: height }]}>
      <StatusBar barStyle="light-content" />
      {/* decorative circles */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      {children}
    </LinearGradient>
  );
}

/** Compact page header with back button, for pushed detail screens. */
export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={gradients.brand as unknown as [string, string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.pageHeader, { paddingTop: insets.top + spacing.sm }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.blob2} />
      <View style={styles.pageHeaderRow}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={styles.pageTitle} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.pageSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right}
      </View>
    </LinearGradient>
  );
}

export function HeaderIconButton({ icon, onPress, badge }: { icon: IconName; onPress?: () => void; badge?: boolean }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={styles.headerIcon}>
      <Ionicons name={icon} size={20} color="#fff" />
      {badge ? <View style={styles.dot} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xl + 6,
    borderBottomRightRadius: radius.xl + 6,
    overflow: 'hidden',
  },
  pageHeader: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    overflow: 'hidden',
  },
  pageHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: { ...typography.h2, color: '#fff' },
  pageSubtitle: { ...typography.small, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.gold,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  blob1: {
    position: 'absolute',
    top: -60,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  blob2: {
    position: 'absolute',
    bottom: -50,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});
