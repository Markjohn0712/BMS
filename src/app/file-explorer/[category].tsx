import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Breadcrumb } from '@/components/breadcrumb';
import { FileExplorerHeader } from '@/components/file-explorer-header';
import { PhotoThumbnailCard } from '@/components/photo-thumbnail-card';
import { BRIDGE, getCategory, getPhotosForCategory } from '@/constants/bridge-files';
import { FileExplorer, MaxContentWidth, Spacing } from '@/constants/theme';

export default function CategoryGalleryScreen() {
  const router = useRouter();
  const { category: categoryKey } = useLocalSearchParams<{ category: string }>();
  const category = getCategory(categoryKey);

  const [query, setQuery] = useState('');
  const [sortDesc, setSortDesc] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const photos = useMemo(() => (category ? getPhotosForCategory(category) : []), [category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = photos;
    if (q) {
      list = list.filter(
        (photo) => photo.filename.toLowerCase().includes(q) || photo.caption.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) =>
      sortDesc ? b.filename.localeCompare(a.filename) : a.filename.localeCompare(b.filename)
    );
  }, [photos, query, sortDesc]);

  const allSelected = filtered.length > 0 && filtered.every((photo) => selected.has(photo.id));

  function toggleSelectAll() {
    setSelected((prev) => {
      if (allSelected) return new Set();
      const next = new Set(prev);
      filtered.forEach((photo) => next.add(photo.id));
      return next;
    });
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  if (!category) {
    return (
      <View style={styles.root}>
        <FileExplorerHeader />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Category not found.</Text>
          <Pressable onPress={() => router.replace('/file-explorer')} accessibilityRole="button">
            <Text style={styles.notFoundLink}>Back to File Explorer</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const hasSelection = selected.size > 0;

  return (
    <View style={styles.root}>
      <FileExplorerHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inner}>
          <Breadcrumb
            segments={[
              { label: 'Home', href: '/dashboard' },
              { label: `${BRIDGE.inspectionYear} Photos` },
              { label: BRIDGE.region },
              { label: BRIDGE.province },
              { label: BRIDGE.id, href: '/file-explorer' },
              { label: BRIDGE.name, href: '/file-explorer' },
              { label: category.title },
            ]}
          />

          <View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categorySubtitle}>
              {category.description} · {category.count} {category.unit}
            </Text>
          </View>

          <View style={styles.toolbar}>
            <View style={styles.searchBox}>
              <AppIcon name="search" size={16} color={FileExplorer.textSecondary} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search Photos..."
                placeholderTextColor={FileExplorer.textSecondary}
                style={styles.searchInput}
              />
            </View>

            <View style={styles.filterChip}>
              <AppIcon name="filter" size={14} color={FileExplorer.text} />
              <Text style={styles.filterChipText}>Category</Text>
            </View>
            <View style={styles.filterChip}>
              <AppIcon name="filter" size={14} color={FileExplorer.text} />
              <Text style={styles.filterChipText}>Date</Text>
            </View>
            <Pressable style={styles.filterChip} accessibilityRole="button" onPress={() => setSortDesc((v) => !v)}>
              <AppIcon name="sort" size={14} color={FileExplorer.text} />
              <Text style={styles.filterChipText}>Sort: {sortDesc ? 'Z–A' : 'A–Z'}</Text>
            </Pressable>
          </View>

          <View style={styles.actionsRow}>
            <Pressable style={styles.actionButtonGhost} onPress={toggleSelectAll} accessibilityRole="button">
              <AppIcon name="checkbox" size={16} color={FileExplorer.text} />
              <Text style={styles.actionGhostText}>{allSelected ? 'Deselect All' : 'Select All'}</Text>
            </Pressable>
            <Text style={styles.selectionCount}>{selected.size} selected</Text>
            <View style={styles.spacer} />
            <Pressable
              disabled={!hasSelection}
              style={[styles.actionButtonGhost, !hasSelection && styles.actionDisabled]}
              accessibilityRole="button"
              accessibilityState={{ disabled: !hasSelection }}>
              <AppIcon name="download" size={16} color={hasSelection ? FileExplorer.text : FileExplorer.textSecondary} />
              <Text style={[styles.actionGhostText, !hasSelection && styles.actionDisabledText]}>Download</Text>
            </Pressable>
            <Pressable
              disabled={!hasSelection}
              style={[styles.actionButtonPrimary, !hasSelection && styles.actionDisabledPrimary]}
              accessibilityRole="button"
              accessibilityState={{ disabled: !hasSelection }}>
              <AppIcon name="export" size={16} color="#ffffff" />
              <Text style={styles.actionPrimaryText}>Export</Text>
            </Pressable>
          </View>

          {filtered.length === 0 ? (
            <Text style={styles.emptyText}>No photos match &quot;{query}&quot;.</Text>
          ) : (
            <View style={styles.grid}>
              {filtered.map((photo) => (
                <PhotoThumbnailCard
                  key={photo.id}
                  photo={photo}
                  selected={selected.has(photo.id)}
                  onToggleSelected={() => toggleOne(photo.id)}
                />
              ))}
            </View>
          )}
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
    gap: Spacing.three,
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: FileExplorer.deepNavy,
    textTransform: 'uppercase',
  },
  categorySubtitle: {
    fontSize: 14,
    color: FileExplorer.textSecondary,
    marginTop: 2,
  },
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: FileExplorer.card,
    borderWidth: 1,
    borderColor: '#E5E8EF',
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    height: 42,
    flexGrow: 1,
    minWidth: 220,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: FileExplorer.text,
    height: '100%',
    outlineWidth: 0,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: FileExplorer.card,
    borderWidth: 1,
    borderColor: '#E5E8EF',
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    height: 42,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: FileExplorer.text,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    flexWrap: 'wrap',
  },
  spacer: {
    flexGrow: 1,
  },
  selectionCount: {
    fontSize: 13,
    color: FileExplorer.textSecondary,
  },
  actionButtonGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: '#E5E8EF',
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    height: 38,
    backgroundColor: FileExplorer.card,
  },
  actionGhostText: {
    fontSize: 13,
    fontWeight: '700',
    color: FileExplorer.text,
  },
  actionButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    height: 38,
    backgroundColor: FileExplorer.primaryBlue,
  },
  actionPrimaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionDisabled: {
    opacity: 0.5,
  },
  actionDisabledPrimary: {
    backgroundColor: '#AAB4C9',
  },
  actionDisabledText: {
    color: FileExplorer.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.two,
  },
  emptyText: {
    fontSize: 14,
    color: FileExplorer.textSecondary,
    paddingVertical: Spacing.five,
    textAlign: 'center',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  notFoundText: {
    fontSize: 16,
    color: FileExplorer.text,
  },
  notFoundLink: {
    fontSize: 14,
    fontWeight: '700',
    color: FileExplorer.primaryBlue,
  },
});
