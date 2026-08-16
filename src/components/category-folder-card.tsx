import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { FileCategory } from '@/constants/bridge-files';
import { FileExplorer, Spacing } from '@/constants/theme';

type CategoryFolderCardProps = {
  category: FileCategory;
  onPress: () => void;
};

export function CategoryFolderCard({ category, onPress }: CategoryFolderCardProps) {
  const statusLabel = category.status === 'complete' ? 'Complete' : `${category.missingCount} Missing`;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={category.title} style={styles.flexItem}>
      {({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => (
        <View style={[styles.card, hovered && styles.cardHovered, pressed && styles.cardPressed]}>
          <View style={styles.shape} />

          <View style={styles.iconChip}>
            <AppIcon name="folder" size={26} color={FileExplorer.primaryBlue} />
          </View>

          <Text style={styles.title}>{category.title}</Text>
          <Text style={styles.description}>{category.description}</Text>

          <View style={styles.footerRow}>
            <View>
              <Text style={styles.count}>
                {category.count} {category.unit}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  category.status === 'complete' ? styles.statusComplete : styles.statusMissing,
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    category.status === 'complete' ? styles.statusTextComplete : styles.statusTextMissing,
                  ]}>
                  {statusLabel}
                </Text>
              </View>
            </View>

            <View style={styles.arrowChip}>
              <AppIcon name="chevron-right" size={16} color={FileExplorer.textSecondary} />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flexItem: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 320,
  },
  card: {
    backgroundColor: FileExplorer.card,
    borderRadius: 22,
    padding: Spacing.four,
    gap: Spacing.one,
    overflow: 'hidden',
    shadowColor: FileExplorer.deepNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  cardHovered: {
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    transform: [{ translateY: -3 }],
  },
  cardPressed: {
    opacity: 0.92,
  },
  shape: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: FileExplorer.lightOrange,
    opacity: 0.6,
  },
  iconChip: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: FileExplorer.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: FileExplorer.text,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    color: FileExplorer.textSecondary,
    marginBottom: Spacing.two,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  count: {
    fontSize: 14,
    fontWeight: '700',
    color: FileExplorer.text,
    marginBottom: Spacing.one,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: 999,
  },
  statusComplete: {
    backgroundColor: '#E4F6EE',
  },
  statusMissing: {
    backgroundColor: '#FCF1DA',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextComplete: {
    color: FileExplorer.success,
  },
  statusTextMissing: {
    color: FileExplorer.warning,
  },
  arrowChip: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: FileExplorer.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
