import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ActionCard } from '@/components/action-card';
import { HeroBanner } from '@/components/hero-banner';
import { Sidebar } from '@/components/sidebar';
import { StatCard } from '@/components/stat-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { Brand, MaxContentWidth, Spacing, TabletLandscapeContentWidth } from '@/constants/theme';

const TABLET_LANDSCAPE_BREAKPOINT = 900;

export default function DashboardScreen() {
  const router = useRouter();
  const { name, username } = useLocalSearchParams<{ name?: string; username?: string }>();
  const displayName = name?.trim() || 'User';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { width } = useWindowDimensions();
  const contentMaxWidth = width >= TABLET_LANDSCAPE_BREAKPOINT ? TabletLandscapeContentWidth : MaxContentWidth;

  return (
    <ThemedView style={styles.root}>
      <TopBar onMenuPress={() => setSidebarOpen(true)} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.inner, { maxWidth: contentMaxWidth }]}>
          <HeroBanner />
          <View style={styles.content}>
            <ThemedText type="subtitle" style={[styles.welcome, { color: Brand.orange }]}>
              Welcome, {displayName}!
            </ThemedText>
            <ThemedText style={styles.roleLine}>
              {displayName} · Department of Public Works and Highways
            </ThemedText>

            <View style={styles.statsRow}>
              <StatCard value={0} label="Total Bridges" />
              <StatCard value={0} label="Completed" />
              <StatCard value={0} label="In Progress" />
            </View>

            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Quick Actions
            </ThemedText>

            <View style={styles.actionsRow}>
              <ActionCard
                icon="add-circle"
                variant="blue"
                title="Start Bridge Inspection"
                description="Begin a new DPWH bridge inspection"
              />
              <ActionCard
                icon="document"
                variant="amber"
                title="Inspection Reports"
                description="View DPWH inspection reports"
              />
              <ActionCard
                icon="building"
                variant="blue"
                title="Bridge Database"
                description="Access bridge information"
                onPress={() => router.push('/file-explorer')}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        displayName={displayName}
        username={username?.trim() || 'user'}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    alignItems: 'stretch',
  },
  welcome: {
    textAlign: 'left',
  },
  roleLine: {
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    alignSelf: 'stretch',
    marginTop: Spacing.two,
  },
  sectionTitle: {
    marginTop: Spacing.four,
    textAlign: 'center',
    fontSize: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
});
