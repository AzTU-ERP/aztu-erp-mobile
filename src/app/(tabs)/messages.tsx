import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Hero, Screen } from '@/components/layout';
import { Avatar } from '@/components/ui';
import { conversations } from '@/data/roles';
import { colors, radius, spacing, typography } from '@/theme';

export default function Messages() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  const list = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Screen>
      <Hero>
        <View style={styles.headRow}>
          <View>
            <Text style={styles.title}>Mesajlar</Text>
            <Text style={styles.sub}>
              {totalUnread > 0 ? `${totalUnread} oxunmamış mesaj` : 'Bütün mesajlar oxunub'}
            </Text>
          </View>
          <Pressable style={styles.newBtn} hitSlop={8}>
            <Ionicons name="create-outline" size={20} color="#fff" />
          </Pressable>
        </View>

        {/* search */}
        <View style={styles.search}>
          <Ionicons name="search" size={17} color="rgba(255,255,255,0.7)" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Axtar…"
            placeholderTextColor="rgba(255,255,255,0.6)"
            style={styles.searchInput}
          />
        </View>
      </Hero>

      <View style={styles.section}>
        {list.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => router.push(`/messages/${c.id}`)}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <View>
              <Avatar initials={c.initials} size={52} gradient={c.gradient} />
              {c.online ? <View style={styles.online} /> : null}
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <View style={styles.rowTop}>
                <Text style={styles.name} numberOfLines={1}>
                  {c.name}
                </Text>
                <Text style={[styles.time, c.unread > 0 && { color: colors.accent, fontWeight: '700' }]}>
                  {c.time}
                </Text>
              </View>
              <View style={styles.rowBottom}>
                <Text style={[styles.last, c.unread > 0 && { color: colors.text, fontWeight: '600' }]} numberOfLines={1}>
                  {c.last}
                </Text>
                {c.unread > 0 ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{c.unread}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  title: { ...typography.h1, color: '#fff' },
  sub: { ...typography.small, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  newBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    marginTop: spacing.lg,
  },
  searchInput: { flex: 1, color: '#fff', ...typography.body, padding: 0 },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  pressed: { opacity: 0.7 },
  online: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
    borderWidth: 2.5,
    borderColor: colors.bg,
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { ...typography.bodyStrong, color: colors.text, flex: 1 },
  time: { ...typography.caption, color: colors.textFaint, marginLeft: spacing.sm },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 },
  last: { ...typography.small, color: colors.textMuted, flex: 1 },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginLeft: spacing.sm,
  },
  badgeText: { color: '#fff', ...typography.caption, fontSize: 11 },
});
