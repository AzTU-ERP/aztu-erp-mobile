import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/ui';
import { ChatMessage, chatThreads, conversations, defaultThread } from '@/data/roles';
import { colors, gradients, radius, shadow, spacing, typography } from '@/theme';

const REPLIES = [
  'Aydındır, təşəkkür edirəm 👍',
  'Yaxşı, baxıram və qayıdıram.',
  'Bəli, düzdür.',
  'Sabah dəqiqləşdirərik.',
  'Qeyd etdim, problem yoxdur.',
];

export default function ChatThread() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const convo = conversations.find((c) => c.id === id);
  const [messages, setMessages] = useState<ChatMessage[]>(
    () => chatThreads[id ?? ''] ?? defaultThread,
  );
  const [text, setText] = useState('');

  const send = () => {
    const body = text.trim();
    if (!body) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const mine: ChatMessage = { id: `me-${messages.length}-${body.length}`, mine: true, text: body, time };
    setMessages((prev) => [...prev, mine]);
    setText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);

    // simulated reply
    setTimeout(() => {
      const reply = REPLIES[body.length % REPLIES.length];
      setMessages((prev) => [
        ...prev,
        { id: `them-${prev.length}-${reply.length}`, mine: false, text: reply, time },
      ]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }, 900);
  };

  return (
    <View style={styles.root}>
      {/* header */}
      <LinearGradient
        colors={gradients.brand as unknown as [string, string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
        <Avatar initials={convo?.initials ?? '??'} size={40} gradient={convo?.gradient ?? 'brand'} />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={styles.hName} numberOfLines={1}>
            {convo?.name ?? 'Söhbət'}
          </Text>
          <Text style={styles.hStatus}>
            {convo?.online ? '● Onlayn' : convo?.subtitle ?? ''}
          </Text>
        </View>
        <Pressable hitSlop={8} style={styles.hIcon}>
          <Ionicons name="call-outline" size={19} color="#fff" />
        </Pressable>
        <Pressable hitSlop={8} style={styles.hIcon}>
          <Ionicons name="ellipsis-vertical" size={19} color="#fff" />
        </Pressable>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messages}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
          <View style={styles.dayPill}>
            <Text style={styles.dayText}>Bu gün</Text>
          </View>
          {messages.map((m) => (
            <View key={m.id} style={[styles.bubbleRow, m.mine ? styles.rowMine : styles.rowThem]}>
              <View style={[styles.bubble, m.mine ? styles.bubbleMine : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, m.mine && { color: '#fff' }]}>{m.text}</Text>
                <Text style={[styles.bubbleTime, m.mine && { color: 'rgba(255,255,255,0.7)' }]}>{m.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* input bar */}
        <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <Pressable hitSlop={8} style={styles.attach}>
            <Ionicons name="add" size={24} color={colors.primary} />
          </Pressable>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Mesaj yazın…"
            placeholderTextColor={colors.textFaint}
            style={styles.input}
            multiline
            onSubmitEditing={send}
          />
          <Pressable onPress={send} style={[styles.send, !text.trim() && { opacity: 0.4 }]}>
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  back: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', marginRight: spacing.xs },
  hName: { ...typography.h3, color: '#fff' },
  hStatus: { ...typography.caption, color: 'rgba(255,255,255,0.8)', marginTop: 1 },
  hIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  messages: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.sm },
  dayPill: { alignSelf: 'center', backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 5, marginBottom: spacing.sm },
  dayText: { ...typography.caption, color: colors.textMuted },

  bubbleRow: { flexDirection: 'row' },
  rowMine: { justifyContent: 'flex-end' },
  rowThem: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', borderRadius: radius.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, ...shadow.soft },
  bubbleMine: { backgroundColor: colors.primary, borderBottomRightRadius: 6 },
  bubbleThem: { backgroundColor: colors.surface, borderBottomLeftRadius: 6 },
  bubbleText: { ...typography.body, color: colors.text },
  bubbleTime: { ...typography.caption, color: colors.textFaint, marginTop: 4, alignSelf: 'flex-end', fontSize: 10 },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  attach: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingTop: Platform.OS === 'ios' ? 10 : 6,
    paddingBottom: Platform.OS === 'ios' ? 10 : 6,
    ...typography.body,
    color: colors.text,
  },
  send: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
