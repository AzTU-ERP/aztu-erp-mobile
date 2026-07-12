import { Tabs } from 'expo-router/js-tabs';

import { CustomTabBar } from '@/components/tab-bar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="services" />
      <Tabs.Screen name="lms" />
      <Tabs.Screen name="finance" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
