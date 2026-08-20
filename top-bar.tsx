import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon } from '@/components/app-icon';
import { Brand, Spacing } from '@/constants/theme';

const ICON_DARK = '#1F2937';
const PLACEHOLDER = '#9CA0A8';

type TopBarProps = {
  onMenuPress?: () => void;
};

export function TopBar({ onMenuPress }: TopBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingTop: insets.top + Spacing.two }]}>
      <StatusBar style="light" />

      <Pressable
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel="Menu"
        style={styles.circleButton}>
        <AppIcon name="menu" size={20} color={ICON_DARK} />
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        DPWH Bridge Inspector
      </Text>


      <Pressable
        onPress={() => router.replace('/sign-in')}
        accessibilityRole="button"
        accessibilityLabel="Logout"
        style={styles.circleButton}>
        <AppIcon name="logout" size={20} color={ICON_DARK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
    backgroundColor: Brand.headerBlue,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 15,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
 
});
