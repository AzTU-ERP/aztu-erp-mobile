import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Card, Divider, IconChip } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';

function ToggleRow({
  icon,
  color,
  bg,
  title,
  subtitle,
  value,
  onChange,
}: {
  icon: string;
  color: string;
  bg: string;
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <IconChip icon={icon as never} color={color} bg={bg} size={40} />
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: colors.border }}
        thumbColor="#fff"
      />
    </View>
  );
}

function ValueRow({ icon, color, bg, title, value }: { icon: string; color: string; bg: string; title: string; value: string }) {
  return (
    <View style={styles.row}>
      <IconChip icon={icon as never} color={color} bg={bg} size={40} />
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function Settings() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Parametrlər" subtitle="Tətbiq tənzimləmələri" />

      <View style={styles.section}>
        <Text style={styles.groupTitle}>Bildirişlər</Text>
        <Card padded={false} style={styles.group}>
          <ToggleRow icon="notifications" color="#3D4ED6" bg="#E5E8FF" title="Push bildirişlər" subtitle="Anlıq bildirişlər" value={push} onChange={setPush} />
          <Divider style={{ marginLeft: 64 }} />
          <ToggleRow icon="mail" color="#0EA5E9" bg="#E0F2FE" title="E-poçt bildirişləri" subtitle="Gündəlik xülasə" value={email} onChange={setEmail} />
        </Card>

        <Text style={styles.groupTitle}>Təhlükəsizlik</Text>
        <Card padded={false} style={styles.group}>
          <ToggleRow icon="finger-print" color="#0E9F6E" bg="#DEF7EC" title="Biometrik giriş" subtitle="Face ID / barmaq izi" value={biometric} onChange={setBiometric} />
        </Card>

        <Text style={styles.groupTitle}>Görünüş</Text>
        <Card padded={false} style={styles.group}>
          <ToggleRow icon="moon" color="#7C3AED" bg="#EDE9FE" title="Qaranlıq rejim" subtitle="Tünd mövzu" value={dark} onChange={setDark} />
          <Divider style={{ marginLeft: 64 }} />
          <ValueRow icon="language" color="#F5A524" bg="#FDEFD3" title="Dil" value="Azərbaycan" />
          <Divider style={{ marginLeft: 64 }} />
          <ValueRow icon="cash" color="#0E9F6E" bg="#DEF7EC" title="Valyuta" value="AZN ₼" />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginTop: spacing.xl, marginBottom: spacing.sm, marginLeft: spacing.xs },
  group: { paddingHorizontal: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  title: { ...typography.bodyStrong, color: colors.text },
  sub: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  value: { ...typography.bodyStrong, color: colors.textMuted },
});
