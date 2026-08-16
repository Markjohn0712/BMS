import { Pressable, StyleSheet, View } from 'react-native';

import { AppIconName } from '@/components/app-icon';
import { IconChip } from '@/components/icon-chip';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ActionCardProps = {
  icon: AppIconName;
  variant?: 'blue' | 'amber';
  title: string;
  description: string;
  onPress?: () => void;
};

export function ActionCard({ icon, variant = 'blue', title, description, onPress }: ActionCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [pressed && styles.pressed, styles.flexItem]}>
      <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.cardBorder }]}>
        <IconChip name={icon} variant={variant} size={48} />
        <ThemedText type="smallBold" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {description}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flexItem: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 100,
  },
  card: {
    flex: 1,
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
  title: {
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
