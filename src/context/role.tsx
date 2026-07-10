import { Ionicons } from '@expo/vector-icons';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/ui';
import { Role, roleMeta, roleProfiles, RoleProfile } from '@/data/roles';
import { colors, radius, shadow, spacing, typography } from '@/theme';

type RoleContextValue = {
  role: Role;
  profile: RoleProfile;
  setRole: (r: Role) => void;
  openSwitcher: () => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);
const ROLES: Role[] = ['student', 'teacher', 'finance'];

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('teacher');
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const value = useMemo<RoleContextValue>(
    () => ({ role, profile: roleProfiles[role], setRole, openSwitcher: () => setOpen(true) }),
    [role],
  );

  return (
    <RoleContext.Provider value={value}>
      {children}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]} onPress={() => {}}>
            <View style={styles.handle} />
            <Text style={styles.title}>Rol seçin</Text>
            <Text style={styles.subtitle}>Fərqli istifadəçi görünüşünü sınayın</Text>

            <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
              {ROLES.map((r) => {
                const p = roleProfiles[r];
                const active = r === role;
                return (
                  <Pressable
                    key={r}
                    onPress={() => {
                      setRole(r);
                      setOpen(false);
                    }}
                    style={[styles.option, active && styles.optionActive]}>
                    <Avatar initials={p.initials} size={46} gradient={p.gradient} />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.optName}>{p.name}</Text>
                      <Text style={styles.optRole}>
                        {roleMeta[r].label} · {p.role}
                      </Text>
                    </View>
                    <View style={[styles.radio, active && styles.radioActive]}>
                      {active ? <Ionicons name="checkmark" size={15} color="#fff" /> : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(12,18,53,0.55)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl + 6,
    borderTopRightRadius: radius.xl + 6,
    padding: spacing.xl,
    ...shadow.floating,
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: spacing.lg },
  title: { ...typography.h2, color: colors.text },
  subtitle: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionActive: { borderColor: colors.primary, backgroundColor: '#F1F3FF' },
  optName: { ...typography.bodyStrong, color: colors.text },
  optRole: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
});
