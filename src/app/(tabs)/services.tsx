// ─────────────────────────────────────────────────────────────────────────────
// Xidmətlər — the services hub. One shared screen for every role that surfaces
// all ERP modules as a 2-column grid of cards, each with a glossy 3D-style icon.
// Includes a live search filter and a grid ⇄ list view toggle.
// ─────────────────────────────────────────────────────────────────────────────
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { HeaderIconButton, Hero, Screen } from '@/components/layout';
import { Card } from '@/components/ui';
import { notifications } from '@/data';
import { serviceGroups, type Service } from '@/data/services';
import { colors, radius, shadow, spacing, typography } from '@/theme';

type ViewMode = 'grid' | 'list';

// Glossy 3D-style icon tile: gradient squircle + top sheen + coloured lift.
function ServiceIcon({ svc, size = 58, rad = 18 }: { svc: Service; size?: number; rad?: number }) {
  return (
    <View style={[styles.iconShadow, { shadowColor: svc.grad[1] }]}>
      <LinearGradient
        colors={svc.grad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.iconTile, { width: size, height: size, borderRadius: rad }]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.42)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Ionicons name={svc.icon as never} size={Math.round(size * 0.46)} color="#fff" />
      </LinearGradient>
    </View>
  );
}

function ServiceCard({ svc, onPress }: { svc: Service; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <LinearGradient
        colors={['#FFFFFF', svc.wash]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {svc.title}
      </Text>
      <View style={styles.cardIcon}>
        <ServiceIcon svc={svc} />
      </View>
    </Pressable>
  );
}

export default function Services() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewMode>('grid');
  const unread = notifications.filter((n) => n.unread).length;

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return serviceGroups;
    return serviceGroups
      .map((g) => ({ ...g, items: g.items.filter((s) => `${s.title} ${s.subtitle}`.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const go = (route: string) => router.push(route as never);

  return (
    <Screen>
      <Hero>
        <View style={styles.heroTop}>
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Image
                source={require('@/assets/images/aztu-logo-white.png')}
                style={{ width: 24, height: 32 }}
                contentFit="contain"
              />
            </View>
            <View style={{ marginLeft: spacing.md }}>
              <Text style={styles.brandTitle}>Xidmətlər</Text>
              <Text style={styles.brandSub}>Bütün modullar bir yerdə</Text>
            </View>
          </View>
          <HeaderIconButton icon="notifications" badge={unread > 0} onPress={() => go('/notifications')} />
        </View>

        {/* search + view toggle */}
        <View style={styles.searchRow}>
          <View style={styles.search}>
            <Ionicons name="search" size={18} color={colors.textFaint} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Xidmət axtar…"
              placeholderTextColor={colors.textFaint}
              style={styles.searchInput}
              returnKeyType="search"
              autoCorrect={false}
            />
            {query.length > 0 ? (
              <Pressable onPress={() => setQuery('')} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color={colors.textFaint} />
              </Pressable>
            ) : null}
          </View>
          <View style={styles.toggle}>
            <Pressable onPress={() => setView('grid')} style={[styles.toggleBtn, view === 'grid' && styles.toggleActive]}>
              <Ionicons name="grid" size={17} color={view === 'grid' ? colors.primary : 'rgba(255,255,255,0.85)'} />
            </Pressable>
            <Pressable onPress={() => setView('list')} style={[styles.toggleBtn, view === 'list' && styles.toggleActive]}>
              <Ionicons name="list" size={19} color={view === 'list' ? colors.primary : 'rgba(255,255,255,0.85)'} />
            </Pressable>
          </View>
        </View>
      </Hero>

      {groups.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="search-outline" size={40} color={colors.textFaint} />
          <Text style={styles.emptyTitle}>Nəticə tapılmadı</Text>
          <Text style={styles.emptySub}>Başqa açar söz ilə yoxlayın</Text>
        </View>
      ) : (
        groups.map((g) => (
          <View key={g.key} style={styles.section}>
            <Text style={styles.groupTitle}>{g.title}</Text>

            {view === 'grid' ? (
              <View style={styles.grid}>
                {g.items.map((s) => (
                  <ServiceCard key={s.key} svc={s} onPress={() => go(s.route)} />
                ))}
              </View>
            ) : (
              <Card padded={false} style={{ overflow: 'hidden' }}>
                {g.items.map((s, i) => (
                  <View key={s.key}>
                    <Pressable
                      onPress={() => go(s.route)}
                      style={({ pressed }) => [styles.listRow, pressed && styles.pressed]}>
                      <ServiceIcon svc={s} size={44} rad={13} />
                      <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <Text style={styles.listTitle}>{s.title}</Text>
                        <Text style={styles.listSub}>{s.subtitle}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
                    </Pressable>
                    {i < g.items.length - 1 ? <View style={styles.divider} /> : null}
                  </View>
                ))}
              </Card>
            )}
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: { ...typography.h2, color: '#fff' },
  brandSub: { ...typography.small, color: 'rgba(255,255,255,0.7)', marginTop: 2 },

  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 46,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    ...shadow.soft,
  },
  searchInput: { flex: 1, ...typography.body, color: colors.text, padding: 0 },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 46,
    padding: 4,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  toggleBtn: { width: 38, height: 38, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  toggleActive: { backgroundColor: '#fff' },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  groupTitle: {
    ...typography.overline,
    color: colors.textFaint,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  card: {
    flexGrow: 1,
    flexBasis: '47%',
    height: 126,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...shadow.card,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.lg,
    marginLeft: spacing.lg,
    marginRight: spacing.md,
    maxWidth: '82%',
  },
  cardIcon: { position: 'absolute', right: 14, bottom: 14 },

  iconShadow: { shadowOpacity: 0.4, shadowRadius: 9, shadowOffset: { width: 0, height: 6 }, elevation: 6 },
  iconTile: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },

  listRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  listTitle: { ...typography.bodyStrong, color: colors.text },
  listSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 68 },

  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },

  empty: { alignItems: 'center', paddingTop: spacing.xxxl, paddingHorizontal: spacing.xl },
  emptyTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md },
  emptySub: { ...typography.small, color: colors.textMuted, marginTop: 4 },
});
