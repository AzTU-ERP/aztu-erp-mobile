import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Button, Card, ProgressBar } from '@/components/ui';
import { AttStatus, attStatusMeta, attendanceSession } from '@/data';
import { colors, radius, spacing, typography } from '@/theme';

export default function AttendanceScreen() {
  const s = attendanceSession;
  const [records, setRecords] = useState(s.students);

  const counts = records.reduce(
    (acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }),
    {} as Record<AttStatus, number>,
  );
  const presentCount = (counts.present ?? 0) + (counts.late ?? 0);
  const pct = Math.round((presentCount / records.length) * 100);

  const cycle = (id: string) => {
    const order: AttStatus[] = ['present', 'late', 'excused', 'absent'];
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: order[(order.indexOf(r.status) + 1) % order.length] } : r,
      ),
    );
  };

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Davamiyyət" subtitle={`${s.code} · Qrup ${s.group}`} />

      <View style={styles.section}>
        {/* Session card */}
        <Card>
          <Text style={styles.course}>{s.course}</Text>
          <Text style={styles.topic}>{s.topic}</Text>
          <View style={styles.metaRow}>
            <Meta icon="calendar-outline" text={s.date} />
            <Meta icon="time-outline" text={s.time} />
          </View>
          <View style={styles.metaRow}>
            <Meta icon="location-outline" text={s.room} />
            <Meta icon="people-outline" text={`${records.length} tələbə`} />
          </View>

          <View style={styles.progressWrap}>
            <View style={styles.progressHead}>
              <Text style={styles.progressLabel}>İştirak</Text>
              <Text style={styles.progressValue}>
                {presentCount}/{records.length} · {pct}%
              </Text>
            </View>
            <ProgressBar value={pct} color={colors.success} height={10} />
          </View>

          {/* check-in methods */}
          <View style={styles.methods}>
            <Button label="QR yoxlama" icon="qr-code-outline" variant="primary" style={{ flex: 1 }} />
            <Button label="Üz tanıma" icon="scan-outline" variant="ghost" style={{ flex: 1 }} />
          </View>
        </Card>

        {/* status summary chips */}
        <View style={styles.summary}>
          {(Object.keys(attStatusMeta) as AttStatus[]).map((k) => (
            <View key={k} style={[styles.sumChip, { backgroundColor: attStatusMeta[k].bg }]}>
              <Text style={[styles.sumNum, { color: attStatusMeta[k].color }]}>{counts[k] ?? 0}</Text>
              <Text style={[styles.sumLabel, { color: attStatusMeta[k].color }]}>{attStatusMeta[k].label}</Text>
            </View>
          ))}
        </View>

        {/* student list */}
        <Text style={styles.listTitle}>Tələbələr</Text>
        <Text style={styles.listHint}>Statusu dəyişmək üçün toxunun</Text>
        <Card padded={false} style={{ overflow: 'hidden', marginTop: spacing.sm }}>
          {records.map((r, i) => {
            const meta = attStatusMeta[r.status];
            return (
              <View key={r.id}>
                <Pressable
                  onPress={() => cycle(r.id)}
                  style={({ pressed }) => [styles.stuRow, pressed && { opacity: 0.7 }]}>
                  <View style={[styles.stuAvatar, { backgroundColor: meta.bg }]}>
                    <Text style={[styles.stuInitials, { color: meta.color }]}>
                      {r.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.stuName}>{r.name}</Text>
                    <Text style={styles.stuNo}>№ {r.studentNo}</Text>
                  </View>
                  <Badge label={meta.label} color={meta.color} bg={meta.bg} />
                </Pressable>
                {i < records.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </Card>

        <Button label="Davamiyyəti yadda saxla" icon="checkmark-circle" style={{ marginTop: spacing.lg }} />
      </View>
    </Screen>
  );
}

function Meta({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.meta}>
      <Ionicons name={icon as never} size={15} color={colors.textMuted} />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  course: { ...typography.h3, color: colors.text },
  topic: { ...typography.small, color: colors.textMuted, marginTop: 4 },
  metaRow: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  metaText: { ...typography.small, color: colors.textMuted },
  progressWrap: { marginTop: spacing.lg },
  progressHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { ...typography.small, color: colors.textMuted, fontWeight: '600' },
  progressValue: { ...typography.small, color: colors.text, fontWeight: '700' },
  methods: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },

  summary: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  sumChip: { flex: 1, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  sumNum: { ...typography.h2 },
  sumLabel: { ...typography.caption, marginTop: 2 },

  listTitle: { ...typography.h3, color: colors.text, marginTop: spacing.xl },
  listHint: { ...typography.small, color: colors.textFaint, marginTop: 2 },
  stuRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  stuAvatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  stuInitials: { ...typography.bodyStrong },
  stuName: { ...typography.bodyStrong, color: colors.text },
  stuNo: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 68 },
});
