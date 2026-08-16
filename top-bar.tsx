import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon } from '@/components/app-icon';
import { ThemedText } from '@/components/themed-text';
import { Brand, Spacing } from '@/constants/theme';

type TopBarProps = {
  title: string;
};

export function TopBar({ title }: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingTop: insets.top + Spacing.two }]}>
      <StatusBar style="light" />
      <AppIcon name="menu" color="#ffffff" size={22} />
      <ThemedText
        type="smallBold"
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail">
        {title}
      </ThemedText>
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
    backgroundColor: Brand.navy,
  },
  title: {
    fontSize: 17,
    flexShrink: 1,
    color: '#ffffff',
  },
});
