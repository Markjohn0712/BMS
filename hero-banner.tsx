import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

const HEIGHT = 260;

export function HeroBanner() {
  return (
    <Image
      source={require('@/assets/images/patapat-bridge.jpg')}
      style={styles.banner}
      contentFit="cover"
    />
  );
}

const styles = StyleSheet.create({
  banner: {
    height: HEIGHT,
    borderRadius: Spacing.four,
  },
});
