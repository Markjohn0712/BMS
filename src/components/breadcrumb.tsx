import { Href, useRouter } from 'expo-router';
import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FileExplorer, Spacing } from '@/constants/theme';

export type BreadcrumbSegment = {
  label: string;
  href?: Href;
};

type BreadcrumbProps = {
  segments: BreadcrumbSegment[];
};

export function Breadcrumb({ segments }: BreadcrumbProps) {
  const router = useRouter();

  return (
    <View style={styles.row}>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        return (
          <Fragment key={`${segment.label}-${index}`}>
            {index > 0 && <Text style={styles.separator}>›</Text>}
            {segment.href && !isLast ? (
              <Pressable onPress={() => router.push(segment.href as Href)} accessibilityRole="button">
                {({ hovered }: { hovered?: boolean }) => (
                  <Text style={[styles.link, hovered && styles.linkHovered]}>{segment.label}</Text>
                )}
              </Pressable>
            ) : (
              <Text style={[styles.link, isLast && styles.current]} numberOfLines={1}>
                {segment.label}
              </Text>
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  separator: {
    fontSize: 13,
    color: FileExplorer.textSecondary,
    marginHorizontal: 2,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: FileExplorer.textSecondary,
  },
  linkHovered: {
    color: FileExplorer.primaryBlue,
    textDecorationLine: 'underline',
  },
  current: {
    color: FileExplorer.text,
    fontWeight: '700',
  },
});
