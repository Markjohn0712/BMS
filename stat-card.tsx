import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatCardProps = {
  value: number;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.cardBorder }]}>
      <ThemedText type="title" style={styles.value}>
        {value.toLocaleString()}
      </ThemedText>
      <ThemedText style={styles.label} themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 140,
    borderRadius: Spacing.three,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.one,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  value: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
  },
  label: {
    fontSize: 15,
  },
});
