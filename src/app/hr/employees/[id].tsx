// İşçi təfərrüatı — employee detail: profile, onboarding actions (assign salary,
// provision account), documents, working schedule, and termination. Actions use
// local state (mock), mirroring the web screen.
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Button, Card, Divider, IconChip } from '@/components/ui';
import {
  AZNlite,
  docTypeLabel,
  empStatusMeta,
  getEmployee,
  initialsOf,
  jobTypeLabel,
  type EmpStatus,
} from '@/data/hr';
import { colors, gradients, radius, spacing, typography } from '@/theme';

export default function EmployeeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const emp = getEmployee(id);

  const [status, setStatus] = useState<EmpStatus>(emp?.status ?? 'onboarding');
  const [salary, setSalary] = useState(emp?.salary ?? null);
  const [userId, setUserId] = useState(emp?.userId ?? null);
  const [salaryInput, setSalaryInput] = useState('');
  const [userInput, setUserInput] = useState('');

  if (!emp) {
    return (
      <Screen tabBarSpace={false}>
        <PageHeader title="İşçi" />
        <View style={styles.missing}>
          <Ionicons name="alert-circle-outline" size={40} color={colors.textFaint} />
          <Text style={styles.missingText}>İşçi tapılmadı</Text>
        </View>
      </Screen>
    );
  }

  const meta = empStatusMeta[status];
  const terminated = status === 'terminated';

  const assignSalary = () => {
    if (!salaryInput.trim()) return;
    setSalary(Number(salaryInput));
    setSalaryInput('');
    Alert.alert('Maaş təyin edildi', AZNlite(Number(salaryInput)));
  };
  const provision = () => {
    if (!userInput.trim()) return;
    setUserId(userInput.trim());
    setUserInput('');
    Alert.alert('Hesab yaradıldı', `İstifadəçi: ${userInput.trim()}`);
  };
  const terminate = () => {
    Alert.alert('İşçini işdən çıxar', `${emp.name} ${emp.surname} işdən çıxarılsın?`, [
      { text: 'Ləğv et', style: 'cancel' },
      { text: 'İşdən çıxar', style: 'destructive', onPress: () => setStatus('terminated') },
    ]);
  };

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="İşçi təfərrüatı" subtitle={emp.department} />

      <View style={styles.section}>
        {/* Hero */}
        <LinearGradient
          colors={gradients.success as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}>
          <View style={styles.heroRow}>
            <View style={styles.heroAvatar}>
              <Text style={styles.heroInitials}>{initialsOf(emp)}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.heroName}>{emp.name} {emp.surname}</Text>
              <Text style={styles.heroSub}>{emp.jobTitle}</Text>
            </View>
            <Badge label={meta.label} color={meta.color} bg="rgba(255,255,255,0.92)" />
          </View>
          <View style={styles.heroMeta}>
            <HeroMeta icon="business-outline" text={jobTypeLabel[emp.jobType]} />
            <HeroMeta icon="cash-outline" text={AZNlite(salary)} />
            <HeroMeta icon="mail-outline" text={emp.email} />
          </View>
        </LinearGradient>

        {/* Profile */}
        <Text style={styles.groupTitle}>Profil</Text>
        <Card>
          <Row label="Təsdiq tarixi" value={emp.approvedAt ?? '—'} />
          <Divider style={{ marginVertical: spacing.sm }} />
          <Row label="Rəsmiləşmə tarixi" value={emp.officialAt ?? '—'} />
          <Divider style={{ marginVertical: spacing.sm }} />
          <Row label="Auth istifadəçi ID" value={userId ?? '—'} />
          <Divider style={{ marginVertical: spacing.sm }} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Status</Text>
            <Badge label={meta.label} color={meta.color} bg={meta.bg} />
          </View>
        </Card>

        {/* Onboarding actions */}
        {!terminated ? (
          <>
            <Text style={styles.groupTitle}>Əməliyyatlar</Text>
            <Card>
              <Text style={styles.actionLabel}>Maaş təyin et</Text>
              <View style={styles.actionRow}>
                <TextInput
                  value={salaryInput}
                  onChangeText={setSalaryInput}
                  keyboardType="numeric"
                  placeholder="məs. 1800"
                  placeholderTextColor={colors.textFaint}
                  style={styles.input}
                />
                <Button label="Yadda saxla" onPress={assignSalary} style={styles.actionBtn} />
              </View>

              <Divider style={{ marginVertical: spacing.lg }} />

              <Text style={styles.actionLabel}>Hesab yarat</Text>
              <View style={styles.actionRow}>
                <TextInput
                  value={userInput}
                  onChangeText={setUserInput}
                  placeholder="Auth istifadəçi ID"
                  placeholderTextColor={colors.textFaint}
                  style={styles.input}
                />
                <Button label="Yadda saxla" onPress={provision} style={styles.actionBtn} />
              </View>
            </Card>
          </>
        ) : null}

        {/* Documents */}
        <Text style={styles.groupTitle}>Sənədlər</Text>
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {emp.documents.length === 0 ? (
            <View style={{ padding: spacing.lg }}>
              <Text style={styles.emptyRow}>Sənəd yüklənməyib</Text>
            </View>
          ) : (
            emp.documents.map((d, i) => (
              <View key={d.id}>
                <View style={styles.docRow}>
                  <IconChip icon="document-text-outline" color={colors.primary} bg="#E5E8FF" size={40} />
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.docName} numberOfLines={1}>{d.name}</Text>
                    <Text style={styles.docMeta}>{docTypeLabel[d.docType]} · {d.size} · {d.uploadedAt}</Text>
                  </View>
                  <Ionicons name="download-outline" size={20} color={colors.accent} />
                </View>
                {i < emp.documents.length - 1 ? <View style={styles.docDivider} /> : null}
              </View>
            ))
          )}
        </Card>
        {!terminated ? (
          <Button label="Sənəd yüklə" icon="cloud-upload-outline" variant="ghost" style={{ marginTop: spacing.md }} />
        ) : null}

        {/* Schedule */}
        <Text style={styles.groupTitle}>İş cədvəli</Text>
        <Card padded={false} style={{ overflow: 'hidden' }}>
          {emp.schedule.length === 0 ? (
            <View style={{ padding: spacing.lg }}>
              <Text style={styles.emptyRow}>Cədvəl əlavə edilməyib</Text>
            </View>
          ) : (
            emp.schedule.map((s, i) => (
              <View key={s.id}>
                <View style={styles.schedRow}>
                  <View style={styles.schedDay}>
                    <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
                    <Text style={styles.schedDayText}>{s.day}</Text>
                  </View>
                  <Text style={styles.schedTime}>{s.start}–{s.end}</Text>
                  <Text style={styles.schedHours}>{s.hours} saat</Text>
                </View>
                {i < emp.schedule.length - 1 ? <View style={styles.docDivider} /> : null}
              </View>
            ))
          )}
        </Card>

        {/* Terminate */}
        {terminated ? (
          <Card style={styles.terminatedNote}>
            <Ionicons name="information-circle-outline" size={18} color={colors.danger} />
            <Text style={styles.terminatedText}>Bu işçi işdən çıxarılıb.</Text>
          </Card>
        ) : (
          <Button label="İşçini işdən çıxar" icon="close-circle-outline" variant="ghost" onPress={terminate} style={styles.terminateBtn} />
        )}
      </View>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function HeroMeta({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.heroMetaItem}>
      <Ionicons name={icon as never} size={14} color="rgba(255,255,255,0.85)" />
      <Text style={styles.heroMetaText} numberOfLines={1}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },

  hero: { borderRadius: radius.xl, padding: spacing.lg },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  heroInitials: { ...typography.h3, color: '#fff' },
  heroName: { ...typography.h3, color: '#fff' },
  heroSub: { ...typography.small, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  heroMeta: { marginTop: spacing.lg, gap: spacing.sm },
  heroMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroMetaText: { ...typography.small, color: '#fff', flex: 1 },

  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginTop: spacing.xl, marginBottom: spacing.md, marginLeft: spacing.xs },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  rowLabel: { ...typography.body, color: colors.textMuted },
  rowValue: { ...typography.bodyStrong, color: colors.text },

  actionLabel: { ...typography.small, color: colors.textMuted, fontWeight: '600', marginBottom: spacing.sm },
  actionRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionBtn: { height: 48 },

  docRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  docName: { ...typography.bodyStrong, color: colors.text },
  docMeta: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  docDivider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 64 },

  schedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  schedDay: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  schedDayText: { ...typography.bodyStrong, color: colors.text },
  schedTime: { ...typography.small, color: colors.textMuted, width: 90, textAlign: 'center' },
  schedHours: { ...typography.small, color: colors.text, fontWeight: '700', width: 60, textAlign: 'right' },

  emptyRow: { ...typography.small, color: colors.textMuted, textAlign: 'center' },

  terminatedNote: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg, backgroundColor: '#FDE8E8' },
  terminatedText: { ...typography.small, color: colors.danger, fontWeight: '600' },
  terminateBtn: { marginTop: spacing.lg, borderColor: '#FBD5D5' },

  missing: { alignItems: 'center', paddingTop: spacing.xxxl },
  missingText: { ...typography.h3, color: colors.text, marginTop: spacing.md },
});
