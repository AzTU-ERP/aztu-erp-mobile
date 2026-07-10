import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Card, ProgressBar } from '@/components/ui';
import { Grade, transcript } from '@/data';
import { colors, radius, spacing, typography } from '@/theme';

const letterColor = (letter: string) => {
  if (letter === 'A') return { c: '#0E9F6E', b: '#DEF7EC' };
  if (letter === 'B') return { c: '#3D4ED6', b: '#E5E8FF' };
  if (letter === 'C') return { c: '#C27803', b: '#FDF6B2' };
  return { c: '#E02424', b: '#FDE8E8' };
};

export default function Transcript() {
  // group by semester
  const semesters = transcript.grades.reduce<Record<string, Grade[]>>((acc, g) => {
    (acc[g.semester] ??= []).push(g);
    return acc;
  }, {});

  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="Transkript" subtitle="Akademik nəticələr" />

      <View style={styles.section}>
        {/* GPA hero card */}
        <Card style={styles.gpaCard}>
          <View style={styles.gpaLeft}>
            <Text style={styles.gpaValue}>{transcript.gpa.toFixed(2)}</Text>
            <Text style={styles.gpaLabel}>Ümumi GPA</Text>
            <View style={styles.rankPill}>
              <Text style={styles.rankText}>Reytinq: {transcript.rank}</Text>
            </View>
          </View>
          <View style={styles.gpaRight}>
            <Text style={styles.creditLabel}>Kredit tamamlanması</Text>
            <Text style={styles.creditValue}>
              {transcript.completedCredits}/{transcript.totalCredits}
            </Text>
            <View style={{ marginTop: spacing.sm }}>
              <ProgressBar
                value={(transcript.completedCredits / transcript.totalCredits) * 100}
                color={colors.accent}
                height={8}
              />
            </View>
            <Text style={styles.creditHint}>
              {transcript.totalCredits - transcript.completedCredits} kredit qalıb
            </Text>
          </View>
        </Card>

        {Object.entries(semesters).map(([sem, grades]) => (
          <View key={sem} style={{ marginTop: spacing.xl }}>
            <Text style={styles.semTitle}>{sem}</Text>
            <Card padded={false} style={{ overflow: 'hidden', marginTop: spacing.sm }}>
              {grades.map((g, i) => {
                const lc = letterColor(g.letter);
                return (
                  <View key={g.id}>
                    <View style={styles.gradeRow}>
                      <View style={[styles.letterBox, { backgroundColor: lc.b }]}>
                        <Text style={[styles.letter, { color: lc.c }]}>{g.letter}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <Text style={styles.gradeCourse} numberOfLines={1}>
                          {g.course}
                        </Text>
                        <Text style={styles.gradeMeta}>
                          {g.code} · {g.credits} kredit
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.gradeScore}>{g.score}</Text>
                        <Text style={styles.gradeGpa}>{g.gpa.toFixed(1)} bal</Text>
                      </View>
                    </View>
                    {i < grades.length - 1 ? <View style={styles.divider} /> : null}
                  </View>
                );
              })}
            </Card>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  gpaCard: { flexDirection: 'row' },
  gpaLeft: { alignItems: 'center', paddingRight: spacing.lg, borderRightWidth: 1, borderRightColor: colors.border },
  gpaValue: { fontSize: 40, fontWeight: '800', color: colors.primary, letterSpacing: -1 },
  gpaLabel: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  rankPill: { backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4, marginTop: spacing.sm },
  rankText: { ...typography.caption, color: colors.primary },
  gpaRight: { flex: 1, paddingLeft: spacing.lg, justifyContent: 'center' },
  creditLabel: { ...typography.caption, color: colors.textMuted },
  creditValue: { ...typography.h2, color: colors.text, marginTop: 2 },
  creditHint: { ...typography.caption, color: colors.textFaint, marginTop: 6 },

  semTitle: { ...typography.overline, color: colors.textFaint, textTransform: 'uppercase', marginLeft: spacing.xs },
  gradeRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  letterBox: { width: 42, height: 42, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  letter: { ...typography.h3 },
  gradeCourse: { ...typography.bodyStrong, color: colors.text },
  gradeMeta: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  gradeScore: { ...typography.h3, color: colors.text },
  gradeGpa: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 68 },
});
