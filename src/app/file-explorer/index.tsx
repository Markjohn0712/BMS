import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Breadcrumb } from '@/components/breadcrumb';
import { CategoryFolderCard } from '@/components/category-folder-card';
import { FileExplorerHeader } from '@/components/file-explorer-header';
import { BRIDGE, FILE_CATEGORIES } from '@/constants/bridge-files';
import { FileExplorer, MaxContentWidth, Spacing } from '@/constants/theme';

export default function FileExplorerScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <FileExplorerHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inner}>
          <View style={styles.breadcrumbRow}>
            <Breadcrumb
              segments={[
                { label: 'Home', href: '/dashboard' },
                { label: `${BRIDGE.inspectionYear} Photos` },
                { label: BRIDGE.region },
                { label: BRIDGE.province },
                { label: BRIDGE.id },
                { label: BRIDGE.name },
              ]}
            />
          </View>

          <View style={styles.hero}>
            <View style={[styles.heroShape, styles.heroShapeOne]} />
            <View style={[styles.heroShape, styles.heroShapeTwo]} />

            <Text style={styles.heroTitle}>{BRIDGE.fullName}</Text>
            <Text style={styles.heroSubtitle}>
              Bridge ID: {BRIDGE.id} • {BRIDGE.inspectionYear} Inspection
            </Text>
            <Text style={styles.heroCaption}>Bridge Inspection Photo Library</Text>
          </View>

          <View style={styles.grid}>
            {FILE_CATEGORIES.map((category) => (
              <CategoryFolderCard
                key={category.key}
                category={category}
                onPress={() =>
                  router.push({ pathname: '/file-explorer/[category]', params: { category: category.key } })
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: FileExplorer.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth * 1.7,
    alignSelf: 'center',
    padding: Spacing.four,
    gap: Spacing.four,
  },
  breadcrumbRow: {
    paddingTop: Spacing.one,
  },
  hero: {
    borderRadius: 24,
    backgroundColor: FileExplorer.card,
    padding: Spacing.five,
    overflow: 'hidden',
    gap: 4,
    shadowColor: FileExplorer.deepNavy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },
  heroShape: {
    position: 'absolute',
    borderRadius: 999,
  },
  heroShapeOne: {
    width: 260,
    height: 260,
    right: -80,
    top: -100,
    backgroundColor: FileExplorer.lightOrange,
    opacity: 0.6,
  },
  heroShapeTwo: {
    width: 180,
    height: 180,
    right: 60,
    bottom: -90,
    backgroundColor: FileExplorer.primaryBlue,
    opacity: 0.06,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: FileExplorer.deepNavy,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: FileExplorer.orange,
  },
  heroCaption: {
    fontSize: 14,
    color: FileExplorer.textSecondary,
    marginTop: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.four,
  },
});
