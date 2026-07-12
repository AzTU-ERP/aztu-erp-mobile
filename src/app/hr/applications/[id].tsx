// Müraciət təfərrüatı — application detail with an interactive review workflow:
// move to screening / approve (assign salary) / reject (with reason), plus a
// review-history timeline. State is local (mock), mirroring the web screen.
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Button, Card } from '@/components/ui';
import {
  appStatusMeta,
  getApplication,
  initialsOf,
  type AppStatus,
  type ApplicationReview,
  type ReviewDecision,
} from '@/data/hr';
import { colors, gradients, radius, spacing, typography } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';

const DECISIONS: { value: ReviewDecision; label: string; icon: string; color: string }[] = [
  { value: 'screening', label: 'Baxışa keçir', icon: 'search-outline', color: '#C27803' },
  { value: 'approved', label: 'Təsdiqlə', icon: 'checkmark-circle-outline', color: '#0E9F6E' },
  { value: 'rejected', label: 'Rədd et', icon: 'close-circle-outline', color: '#E02424' },
];

export default function ApplicationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const app = getApplication(id);

  const [status, setStatus] = useState<AppStatus>(app?.status ?? 'submitted');
  const [reviews, setReviews] = useState<ApplicationReview[]>(app?.reviews ?? []);
  const [decision, setDecision] = useState<ReviewDecision>('screening');
  const [reason, setReason] = useState('');
  const [salary, setSalary] = useState('');

  if (!app) {
    return (
      <Screen tabBarSpace={false}>
        <PageHeader title="Müraciət" />
        <View style={styles.missing}>
          <Ionicons name="alert-circle-outline" size={40} color={colors.textFaint} />
          <Text style={styles.missingText}>Müraciət tapılmadı</Text>
        </View>
      </Screen>
    );
  }

  const meta = appStatusMeta[status];

  const submit = () => {
    if (decision === 'rejected' && !reason.trim()) {
      Alert.alert('Səbəb tələb olunur', 'Rədd üçün səbəb qeyd edin.');
      return;
    }
    const review: ApplicationReview = {
      id: `r-${reviews.length + 1}-${decision}`,
      decision,
      reason: reason.trim() || null,
      reviewedBy: 'HR şöbəsi',
      reviewedAt: 'İndi',
    };
    setReviews((prev) => [review, ...prev]);
    setStatus(decision === 'screening' ? 'screening' : decision === 'approved' ? 'approved' : 'rejected');
    setReason('');
    setSalary('');
    Alert.alert('Qərar qeyd edildi', DECISIONS.find((d) => d.value === decision)?.label ?? '');
  };

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Müraciət təfərrüatı" subtitle={app.vacancyTitle} />

      <View style={styles.section}>
        {/* Applicant hero card */}
        <LinearGradient
          colors={gradients.brand as unknown as [string, string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}>
          <View style={styles.heroRow}>
            <View style={styles.heroAvatar}>
              <Text style={styles.heroInitials}>{initialsOf(app)}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.heroName}>{app.name} {app.surname}</Text>
              <Text style={styles.heroSub} numberOfLines={1}>{app.vacancyTitle}</Text>
            </View>
            <Badge label={meta.label} color={meta.color} bg="rgba(255,255,255,0.92)" />
          </View>
          <View style={styles.heroMeta}>
            <HeroMeta icon="mail-outline" text={app.email} />
            <HeroMeta icon="call-outline" text={app.phone} />
            <HeroMeta icon="time-outline" text={app.submittedAt} />
          </View>
        </LinearGradient>

        {/* CV */}
        <Card style={styles.cvCard} onPress={() => app.cv && Alert.alert('CV', app.cv)}>
          <Ionicons name={app.cv ? 'document-text' : 'document-outline'} size={22} color={app.cv ? colors.primary : colors.textFaint} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.cvTitle}>{app.cv ?? 'CV əlavə edilməyib'}</Text>
            <Text style={styles.cvSub}>Mənbə: {app.source}</Text>
          </View>
          {app.cv ? <Ionicons name="eye-outline" size={20} color={colors.accent} /> : null}
        </Card>

        {/* Decision form */}
        <Text style={styles.groupTitle}>Qərar</Text>
        <Card>
          <View style={styles.decisionRow}>
            {DECISIONS.map((d) => {
              const active = decision === d.value;
              return (
                <Pressable
                  key={d.value}
                  onPress={() => setDecision(d.value)}
                  style={[styles.decision, active && { borderColor: d.color, backgroundColor: `${d.color}12` }]}>
                  <Ionicons name={d.icon as never} size={20} color={active ? d.color : colors.textFaint} />
                  <Text style={[styles.decisionText, active && { color: d.color }]}>{d.label}</Text>
                </Pressable>
              );
            })}
          </View>

          {decision === 'approved' ? (
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Təyin ediləcək maaş</Text>
              <TextInput
                value={salary}
                onChangeText={setSalary}
                keyboardType="numeric"
                placeholder="məs. 1800"
                placeholderTextColor={colors.textFaint}
                style={styles.input}
              />
            </View>
          ) : null}

          {decision === 'rejected' ? (
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Səbəb</Text>
              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Rədd səbəbini qeyd edin…"
                placeholderTextColor={colors.textFaint}
                multiline
                style={[styles.input, styles.textarea]}
              />
            </View>
          ) : null}

          <Button label="Qərarı təsdiqlə" icon="send" onPress={submit} style={{ marginTop: spacing.lg }} />
        </Card>

        {/* Review history */}
        <Text style={styles.groupTitle}>Baxış tarixçəsi</Text>
        <Card>
          {reviews.length === 0 ? (
            <Text style={styles.emptyRow}>Hələ qərar verilməyib</Text>
          ) : (
            reviews.map((r, i) => {
              const rm = appStatusMeta[r.decision as AppStatus];
              return (
                <View key={r.id}>
                  <View style={styles.timeline}>
                    <View style={styles.timelineLeft}>
                      <View style={[styles.dot, { backgroundColor: rm.color }]} />
                      {i < reviews.length - 1 ? <View style={styles.line} /> : null}
                    </View>
                    <View style={{ flex: 1, paddingBottom: i < reviews.length - 1 ? spacing.lg : 0 }}>
                      <View style={styles.timelineHead}>
                        <Badge label={rm.label} color={rm.color} bg={rm.bg} />
                        <Text style={styles.timelineTime}>{r.reviewedAt}</Text>
                      </View>
                      {r.reason ? <Text style={styles.timelineReason}>{r.reason}</Text> : null}
                      <Text style={styles.timelineBy}>{r.reviewedBy}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </Card>
      </View>
    </Screen>
  );
}

function HeroMeta({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.heroMetaItem}>
      <Ionicons name={icon as never} size={14} color="rgba(255,255,255,0.75)" />
      <Text style={styles.heroMetaText} numberOfLines={1}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },

  hero: { borderRadius: radius.xl, padding: spacing.lg },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' },
  heroInitials: { ...typography.h3, color: '#fff' },
  heroName: { ...typography.h3, color: '#fff' },
  heroSub: { ...typography.small, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  heroMeta: { marginTop: spacing.lg, gap: spacing.sm },
  heroMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroMetaText: { ...typography.small, color: 'rgba(255,255,255,0.9)', flex: 1 },

  cvCard: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg },
  cvTitle: { ...typography.bodyStrong, color: colors.text },
  cvSub: { ...typography.small, color: colors.textMuted, marginTop: 2 },

  groupTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginTop: spacing.xl, marginBottom: spacing.md, marginLeft: spacing.xs },

  decisionRow: { flexDirection: 'row', gap: spacing.sm },
  decision: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  decisionText: { ...typography.caption, color: colors.textMuted, textAlign: 'center' },

  inputWrap: { marginTop: spacing.lg },
  inputLabel: { ...typography.small, color: colors.textMuted, fontWeight: '600', marginBottom: spacing.sm },
  input: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textarea: { height: 96, paddingTop: spacing.md, textAlignVertical: 'top' },

  emptyRow: { ...typography.small, color: colors.textMuted, textAlign: 'center' },
  timeline: { flexDirection: 'row', gap: spacing.md },
  timelineLeft: { alignItems: 'center', width: 12 },
  dot: { width: 12, height: 12, borderRadius: 6, marginTop: 3 },
  line: { width: StyleSheet.hairlineWidth, flex: 1, backgroundColor: colors.border, marginTop: 4 },
  timelineHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timelineTime: { ...typography.caption, color: colors.textFaint },
  timelineReason: { ...typography.small, color: colors.textMuted, marginTop: 6, lineHeight: 19 },
  timelineBy: { ...typography.caption, color: colors.textFaint, marginTop: 4 },

  missing: { alignItems: 'center', paddingTop: spacing.xxxl },
  missingText: { ...typography.h3, color: colors.text, marginTop: spacing.md },
});
