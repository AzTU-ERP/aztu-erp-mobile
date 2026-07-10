import { StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layout';
import { Badge, Card } from '@/components/ui';
import { exams } from '@/data';
import { colors, radius, spacing, typography } from '@/theme';

export default function Exams() {
  return (
    <Screen tabBarSpace={false}>
      <PageHeader title="İmtahanlar" subtitle="Yay sessiyası 2026" />

      <View style={styles.section}>
        <View style={styles.banner}>
          <Text style={styles.bannerNum}>{exams.length}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Planlaşdırılmış imtahan</Text>
            <Text style={styles.bannerSub}>Ən yaxını {exams[0].daysLeft} gün sonra</Text>
          </View>
        </View>

        {exams.map((e) => {
          const soon = e.daysLeft <= 10;
          return (
            <Card key={e.id} style={styles.card}>
              <View style={styles.dateBox}>
                <Text style={styles.dateDay}>{e.date.split(' ')[0]}</Text>
                <Text style={styles.dateMon}>{e.date.split(' ')[1]}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.course}>{e.course}</Text>
                <Text style={styles.meta}>
                  {e.code} · {e.time} · {e.room}
                </Text>
                <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
                  <Badge label={e.type} color={colors.accent} bg="#E5E8FF" />
                  <Badge
                    label={`${e.daysLeft} gün qalıb`}
                    color={soon ? colors.danger : colors.textMuted}
                    bg={soon ? '#FDE8E8' : colors.surfaceAlt}
                    icon="time-outline"
                  />
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg, gap: spacing.md },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#E5E8FF',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  bannerNum: { fontSize: 34, fontWeight: '800', color: colors.accent },
  bannerTitle: { ...typography.bodyStrong, color: colors.primary },
  bannerSub: { ...typography.small, color: colors.accent, marginTop: 2 },
  card: { flexDirection: 'row', alignItems: 'center' },
  dateBox: {
    width: 54,
    height: 58,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: { ...typography.h2, color: '#fff' },
  dateMon: { ...typography.caption, color: 'rgba(255,255,255,0.85)' },
  course: { ...typography.bodyStrong, color: colors.text },
  meta: { ...typography.small, color: colors.textMuted, marginTop: 3 },
});
