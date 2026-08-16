import { StyleSheet, View } from 'react-native';

import { AppIcon, type AppIconName } from '@/components/app-icon';
import { Brand, Spacing } from '@/constants/theme';

type IconChipProps = {
  name: AppIconName;
  variant?: 'blue' | 'amber';
  size?: number;
};

export function IconChip({ name, variant = 'blue', size = 40 }: IconChipProps) {
  const background = variant === 'blue' ? Brand.iconBlueBg : Brand.iconAmberBg;
  const foreground = variant === 'blue' ? Brand.iconBlueFg : Brand.iconAmberFg;

  return (
    <View style={[styles.chip, { width: size, height: size, backgroundColor: background }]}>
      <AppIcon name={name} color={foreground} size={size * 0.55} />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: Spacing.two + Spacing.half,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
