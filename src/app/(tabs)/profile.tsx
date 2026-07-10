import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Hero, Screen } from '@/components/layout';
import { Avatar, Card, Divider, ListRow } from '@/components/ui';
import { useRole } from '@/context/role';
import { roleMeta } from '@/data/roles';
import { colors, radius, spacing, typography } from '@/theme';

export default function Profile() {
  const router = useRouter();
  const { role, profile, openSwitcher } = useRole();

  const account = [
    { icon: 'person-circle-outline', title: 'Şəxsi məlumatlar', subtitle: profile.email, onPress: () => {} },
    { icon: 'shield-checkmark-outline', title: 'Təhlükəsizlik', subtitle: 'Sessiyalar və cihazlar', onPress: () => router.push('/security') },
    { icon: 'settings-outline', title: 'Parametrlər', subtitle: 'Bildiriş, dil, mövzu', onPress: () => router.push('/settings') },
  ] as const;

  const modules = [
    { icon: 'chatbubbles-outline', title: 'Mesajlar', subtitle: 'Söhbətlər', onPress: () => router.push('/messages') },
    { icon: 'library-outline', title: 'Kitabxana', subtitle: 'Kataloq, icarələr', onPress: () => router.push('/module/library') },
    { icon: 'scan-outline', title: 'Turnstile', subtitle: 'Keçid jurnalı, qapılar', onPress: () => router.push('/module/turnstile') },
  ] as const;

  const other = [
    { icon: 'help-circle-outline', title: 'Kömək və dəstək', subtitle: 'support@aztu.edu.az', onPress: () => {} },
    { icon: 'information-circle-outline', title: 'Tətbiq haqqında', subtitle: 'Versiya 1.0.0', onPress: () => {} },
  ] as const;

  return (
    <Screen>
      <Hero>
        <View style={styles.head}>
          <Avatar initials={profile.initials} size={72} gradient={profile.gradient} />
          <View style={{ flex: 1, marginLeft: spacing.lg }}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.role}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {profile.idLabel}: {profile.idValue}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.faculty}>{profile.faculty}</Text>
      </Hero>

      {/* Role switcher — prominent card */}
      <View style={styles.section}>
        <Pressable onPress={openSwitcher} style={({ pressed }) => [styles.roleCard, pressed && styles.pressed]}>
          <View style={styles.roleIcon}>
            <Ionicons name={roleMeta[role].icon as never} size={22} color="#fff" />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.roleTitle}>Aktiv rol: {roleMeta[role].label}</Text>
            <Text style={styles.roleSub}>Görünüşü dəyişmək üçün toxunun</Text>
          </View>
          <View style={styles.roleSwap}>
            <Ionicons name="swap-horizontal" size={16} color={colors.primary} />
            <Text style={styles.roleSwapText}>Dəyiş</Text>
          </View>
        </Pressable>
      </View>

      <Group title="Hesab" rows={account} />
      <Group title="Modullar" rows={modules} />
      <Group title="Digər" rows={other} />

      <View style={styles.section}>
        <Card padded={false} style={styles.group}>
          <View style={styles.rowPad}>
            <ListRow
              icon="log-out-outline"
              title="Çıxış"
              danger
              trailing={null}
              onPress={() =>
                Alert.alert('Çıxış', 'Hesabdan çıxmaq istədiyinizə əminsiniz?', [
                  { text: 'Ləğv et', style: 'cancel' },
                  { text: 'Çıxış', style: 'destructive' },
                ])
              }
            />
          </View>
        </Card>
      </View>
    </Screen>
  );
}

function Group({
  title,
  rows,
}: {
  title: string;
  rows: readonly { icon: string; title: string; subtitle: string; onPress: () => void }[];
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.groupTitle}>{title}</Text>
      <Card padded={false} style={styles.group}>
        {rows.map((r, i) => (
          <View key={r.title}>
            <View style={styles.rowPad}>
              <ListRow icon={r.icon as never} title={r.title} subtitle={r.subtitle} onPress={r.onPress} />
            </View>
            {i < rows.length - 1 ? <Divider style={{ marginLeft: 64 }} /> : null}
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  name: { ...typography.h2, color: '#fff' },
  role: { ...typography.small, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  badgeText: { ...typography.caption, color: '#fff' },
  faculty: { ...typography.small, color: 'rgba(255,255,255,0.75)', marginTop: spacing.lg },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E5E8FF',
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  roleIcon: { width: 46, height: 46, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  roleTitle: { ...typography.bodyStrong, color: colors.text },
  roleSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  roleSwap: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#EEF0FF', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 7 },
  roleSwapText: { ...typography.caption, color: colors.primary, fontWeight: '700' },

  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginBottom: spacing.sm, marginLeft: spacing.xs },
  group: { paddingHorizontal: spacing.md },
  rowPad: { paddingVertical: spacing.xs },
});
