// ─────────────────────────────────────────────────────────────────────────────
// Custom floating bottom navigation for the AzTU ERP app.
// A rounded, elevated bar with an animated icon that lifts under the active tab.
// The two middle tabs (Təhsil / Maliyyə) relabel themselves per active role.
// ─────────────────────────────────────────────────────────────────────────────
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRole } from '@/context/role';
import { roleTabs } from '@/data/roles';
import { colors, gradients, radius, shadow, spacing, typography } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;
type TabMeta = { label: string; icon: IconName; iconActive: IconName };

function TabItem({
  meta,
  focused,
  onPress,
  onLongPress,
}: {
  meta: TabMeta;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const lift = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    lift.value = withSpring(focused ? 1 : 0, { damping: 14, stiffness: 160 });
  }, [focused, lift]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -6 * lift.value }, { scale: 1 + 0.06 * lift.value }],
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: withTiming(focused ? 1 : 0.55, { duration: 150 }),
  }));

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.item} hitSlop={6}>
      <Animated.View style={iconStyle}>
        {focused ? (
          <LinearGradient
            colors={gradients.brandSoft as unknown as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.activeIcon}>
            <Ionicons name={meta.iconActive} size={22} color="#fff" />
          </LinearGradient>
        ) : (
          <View style={styles.inactiveIcon}>
            <Ionicons name={meta.icon} size={22} color={colors.tabInactive} />
          </View>
        )}
      </Animated.View>
      <Animated.Text
        style={[styles.label, labelStyle, { color: focused ? colors.tabActive : colors.tabInactive }]}
        numberOfLines={1}>
        {meta.label}
      </Animated.Text>
    </Pressable>
  );
}

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { role } = useRole();

  const rt = roleTabs[role];
  const TABS: Record<string, TabMeta> = {
    index: { label: 'Əsas', icon: 'home-outline', iconActive: 'home' },
    services: { label: 'Xidmətlər', icon: 'grid-outline', iconActive: 'grid' },
    lms: { label: rt.lms.label, icon: rt.lms.icon as IconName, iconActive: rt.lms.iconActive as IconName },
    finance: { label: rt.finance.label, icon: rt.finance.icon as IconName, iconActive: rt.finance.iconActive as IconName },
    messages: { label: 'Mesajlar', icon: 'chatbubbles-outline', iconActive: 'chatbubbles' },
    profile: { label: 'Profil', icon: 'person-outline', iconActive: 'person' },
  };

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, spacing.md) }]} pointerEvents="box-none">
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const meta = TABS[route.name];
          if (!meta) return null;
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          const onLongPress = () => navigation.emit({ type: 'tabLongPress', target: route.key });

          return (
            <TabItem key={route.key} meta={meta} focused={focused} onPress={onPress} onLongPress={onLongPress} />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.xl + 4,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(27,37,89,0.06)',
    ...shadow.floating,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  activeIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  inactiveIcon: { width: 42, height: 42, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  label: { ...typography.caption, fontSize: 10.5, letterSpacing: 0, marginTop: 3 },
});
