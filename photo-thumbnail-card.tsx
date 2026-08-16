import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { PhotoEntry } from '@/constants/bridge-files';
import { FileExplorer, Spacing } from '@/constants/theme';

type PhotoThumbnailCardProps = {
  photo: PhotoEntry;
  selected: boolean;
  onToggleSelected: () => void;
};

export function PhotoThumbnailCard({ photo, selected, onToggleSelected }: PhotoThumbnailCardProps) {
  return (
    <View style={styles.flexItem}>
      <View style={styles.card}>
        <View style={styles.thumbnail}>
          <AppIcon name="image" size={30} color={FileExplorer.textSecondary} />
          <Pressable
            onPress={onToggleSelected}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={`Select ${photo.filename}`}
            hitSlop={6}
            style={[styles.checkbox, selected && styles.checkboxSelected]}>
            {selected && <AppIcon name="checkbox" size={14} color="#ffffff" />}
          </Pressable>
        </View>

        <View style={styles.info}>
          <Text style={styles.filename} numberOfLines={1}>
            {photo.filename}
          </Text>
          <Text style={styles.caption} numberOfLines={1}>
            {photo.caption}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{photo.date}</Text>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{photo.categoryTitle}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexItem: {
    flexBasis: '25%',
    minWidth: 220,
    padding: Spacing.two,
  },
  card: {
    backgroundColor: FileExplorer.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: FileExplorer.deepNavy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  thumbnail: {
    aspectRatio: 4 / 3,
    backgroundColor: FileExplorer.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.two,
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(23,43,104,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: FileExplorer.primaryBlue,
    borderColor: FileExplorer.primaryBlue,
  },
  info: {
    padding: Spacing.three,
    gap: 2,
  },
  filename: {
    fontSize: 12.5,
    fontWeight: '700',
    color: FileExplorer.text,
  },
  caption: {
    fontSize: 12.5,
    color: FileExplorer.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  meta: {
    fontSize: 11,
    color: FileExplorer.textSecondary,
  },
  categoryTag: {
    backgroundColor: FileExplorer.lightOrange,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 999,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: FileExplorer.orange,
  },
});
