import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RoleProvider } from '@/context/role';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RoleProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F6F7FB' } }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="notifications" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="messages/[id]" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="lms/attendance" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="lms/transcript" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="lms/courses" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="lms/exams" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="finance/runs" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="finance/payslip" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="finance/bonuses" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="security" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="module/[slug]" options={{ animation: 'slide_from_right' }} />
          </Stack>
        </RoleProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
