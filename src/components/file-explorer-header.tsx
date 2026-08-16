import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon } from '@/components/app-icon';
import { BRIDGE } from '@/constants/bridge-files';
import { FileExplorer, Spacing } from '@/constants/theme';

export function FileExplorerHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.bar, { paddingTop: insets.top + Spacing.two }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back to Geotagged"
          style={styles.backButton}>
          <AppIcon name="back" size={18} color={FileExplorer.orange} />
          <Text style={styles.backLabel}>Geotagged</Text>
        </Pressable>

        <Text style={styles.title} numberOfLines={1}>
          File Explorer
        </Text>

        <Text style={styles.yearLabel}>{BRIDGE.inspectionYear} Inspection</Text>
      </View>

      <View style={styles.infoBar}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Bridge ID</Text>
          <Text style={styles.infoValue}>{BRIDGE.id}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Bridge Name</Text>
          <Text style={styles.infoValue}>{BRIDGE.name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Survey Date</Text>
          <Text style={styles.infoValue}>{BRIDGE.surveyDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
    backgroundColor: FileExplorer.deepNavy,
    gap: Spacing.three,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  backLabel: {
    color: FileExplorer.orange,
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  yearLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '600',
  },
  infoBar: {
    flexDirection: 'row',
    backgroundColor: FileExplorer.card,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFF4',
  },
  infoItem: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: FileExplorer.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: FileExplorer.text,
  },
});
