import { StyleSheet, View } from 'react-native';

const HEIGHT = 200;

export function HeroBanner() {
  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill, styles.sky]} />
      <View style={[styles.hill, styles.hillBack]} />
      <View style={[styles.hill, styles.hillMid]} />
      <View style={[styles.hill, styles.hillFront]} />
      <View style={[styles.treeCluster, { left: '18%', bottom: HEIGHT * 0.18 }]} />
      <View style={[styles.treeCluster, { left: '62%', bottom: HEIGHT * 0.24, width: 18, height: 18 }]} />
      <View style={[styles.treeCluster, { left: '40%', bottom: HEIGHT * 0.12, width: 14, height: 14 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    overflow: 'hidden',
  },
  sky: {
    backgroundColor: '#8FCBEF',
    experimental_backgroundImage: 'linear-gradient(180deg, #6FB8EA 0%, #BFE4F7 100%)',
  },
  hill: {
    position: 'absolute',
    borderRadius: 999,
  },
  hillBack: {
    width: '90%',
    height: HEIGHT * 0.9,
    left: '-15%',
    bottom: -HEIGHT * 0.55,
    backgroundColor: '#3E7A46',
  },
  hillMid: {
    width: '95%',
    height: HEIGHT * 0.85,
    left: '25%',
    bottom: -HEIGHT * 0.58,
    backgroundColor: '#4C8F4F',
  },
  hillFront: {
    width: '110%',
    height: HEIGHT * 0.8,
    left: '-25%',
    bottom: -HEIGHT * 0.62,
    backgroundColor: '#5EA357',
  },
  treeCluster: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#356B3C',
    opacity: 0.55,
  },
});
