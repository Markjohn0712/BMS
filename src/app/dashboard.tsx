import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ActionCard } from '@/components/action-card';
import { HeroBanner } from '@/components/hero-banner';
import { StatCard } from '@/components/stat-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { Brand, MaxContentWidth, Spacing } from '@/constants/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name?: string }>();
  const displayName = name?.trim() || 'User';

  return (
    <ThemedView style={styles.root}>
      <TopBar title="DPWH Bridge Inspector – Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inner}>
          <HeroBanner />
          <View style={styles.content}>
            <ThemedText type="subtitle" style={[styles.welcome, { color: Brand.orange }]}>
              Welcome, {displayName}!
            </ThemedText>
            <ThemedText style={styles.roleLine}>
              {displayName} · Department of Public Works and Highways
            </ThemedText>

            <View style={styles.statsRow}>
              <StatCard icon="building" variant="blue" value={0} label="Total Bridges" />
              <StatCard icon="check-circle" variant="amber" value={0} label="Completed" />
              <StatCard icon="clock" variant="blue" value={0} label="In Progress" />
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
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    alignItems: 'center',
  },
  welcome: {
    textAlign: 'center',
  },
  roleLine: {
    textAlign: 'center',
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
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
});
