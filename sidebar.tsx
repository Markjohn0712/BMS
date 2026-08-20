import { Feather, type FeatherIconName } from '@react-native-vector-icons/feather/static';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

type NavItem = {
  key: string;
  label: string;
  icon: FeatherIconName;
  href?: '/dashboard';
};

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'home', href: '/dashboard' },
  { key: 'inventory', label: 'Inventory', icon: 'archive' },
  { key: 'condition', label: 'Condition', icon: 'activity' },
  { key: 'geotagged-photos', label: 'Geotagged Photos', icon: 'camera' },
  { key: 'sketches', label: 'Sketches', icon: 'edit-3' },
  { key: 'inspection-forms', label: 'Inspection Forms', icon: 'clipboard' },
  { key: 'export-bic', label: 'Export BIC', icon: 'upload' },
  { key: 'gis', label: 'GIS', icon: 'map' },
  { key: 'direct-sync', label: 'Direct Sync', icon: 'refresh-cw' },
];

const HEADER_SUBTITLE = '#B8C6FF';
const ACTIVE_BG = '#1E88F0';
const INACTIVE_TEXT = '#5B6B82';
const FOOTER_BG = '#F5F6F8';
const DIVIDER = '#E5E7EB';
const ICON_DARK = '#1F2937';

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  displayName: string;
  username: string;
};

export function Sidebar({ visible, onClose, displayName, username }: SidebarProps) {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState('dashboard');

  if (!visible) return null;

  function handleItemPress(item: NavItem) {
    setActiveKey(item.key);
    if (item.href) {
      router.replace(item.href);
      onClose();
    }
  }

  function handleLogout() {
    router.replace('/sign-in');
    onClose();
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.backdrop]}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close menu"
      />

      <View style={styles.panel}>
        <LinearGradient
          colors={[Brand.orange, '#E0530A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}>
          <Image source={require('@/assets/images/bms-logo.png')} style={styles.logo} contentFit="contain" />
          <View style={styles.headerTextGroup}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              DPWH Bridge Inspector
            </Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              Department of Public Works and Highways
            </Text>
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={styles.navList}>
          {NAV_ITEMS.map((item) => {
            const active = item.key === activeKey;
            return (
              <Pressable
                key={item.key}
                onPress={() => handleItemPress(item)}
                accessibilityRole="button"
                style={[styles.navItem, active && styles.navItemActive]}>
                <Feather name={item.icon} size={20} color={active ? '#ffffff' : INACTIVE_TEXT} />
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Feather name="user" size={22} color={ICON_DARK} />
          <View style={styles.footerTextGroup}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userRole}>{username}</Text>
          </View>
          <Pressable
            onPress={handleLogout}
            accessibilityRole="button"
            accessibilityLabel="Log out"
            hitSlop={8}>
            <Feather name="log-out" size={20} color={ICON_DARK} />
          </Pressable>
        </View>

        <View style={styles.versionBlock}>
          <Text style={styles.versionText}>Version 1.1.0</Text>
          <Text style={styles.versionText}>Developed by javagee</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    paddingTop: Spacing.five,
  },
  logo: {
    width: 48,
    aspectRatio: 396 / 402,
  },
  headerTextGroup: {
    flexShrink: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 9,
    fontWeight: '700',
    color: HEADER_SUBTITLE,
    marginTop: 5,
  },
  navList: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.half,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
  },
  navItemActive: {
    backgroundColor: ACTIVE_BG,
  },
  navLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: INACTIVE_TEXT,
  },
  navLabelActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: DIVIDER,
    backgroundColor: FOOTER_BG,
  },
  footerTextGroup: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#151A2D',
  },
  userRole: {
    fontSize: 13,
    color: '#6B7280',
  },
  versionBlock: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: DIVIDER,
    backgroundColor: FOOTER_BG,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA0A8',
  },
});
