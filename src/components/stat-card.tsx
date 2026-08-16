import { StyleSheet, View } from 'react-native';

import { AppIconName } from '@/components/app-icon';
import { IconChip } from '@/components/icon-chip';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatCardProps = {
  icon: AppIconName;
  variant?: 'blue' | 'amber';
  value: number;
  label: string;
};

export function StatCard({ icon, variant = 'blue', value, label }: StatCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.cardBorder }]}>
      <IconChip name={icon} variant={variant} size={40} />
      <ThemedText type="title" style={styles.value}>
        {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 100,
    borderRadius: Spacing.three,
    borderWidth: 1,
    padding: Spacing.three,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  value: {
    fontSize: 26,
    lineHeight: 30,
  },
});
