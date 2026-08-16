import { StyleSheet, View } from 'react-native';

export function HillsBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[StyleSheet.absoluteFill, styles.sky]} />
      <View style={[styles.hill, styles.hillBack]} />
      <View style={[styles.hill, styles.hillMid]} />
      <View style={[styles.hill, styles.hillFront]} />
      <View style={[styles.treeCluster, { left: '12%', bottom: '20%' }]} />
      <View style={[styles.treeCluster, { left: '68%', bottom: '27%', width: 26, height: 26 }]} />
      <View style={[styles.treeCluster, { left: '40%', bottom: '13%', width: 18, height: 18 }]} />
      <View style={[styles.treeCluster, { left: '85%', bottom: '16%', width: 16, height: 16 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  sky: {
    backgroundColor: '#8FCBEF',
    experimental_backgroundImage: 'linear-gradient(180deg, #6FB8EA 0%, #BFE4F7 100%)',
  },
  hill: {
    position: 'absolute',
    borderRadius: 9999,
  },
  hillBack: {
    width: '90%',
    height: '60%',
    left: '-10%',
    bottom: '-30%',
    backgroundColor: '#3E7A46',
  },
  hillMid: {
    width: '100%',
    height: '55%',
    left: '20%',
    bottom: '-33%',
    backgroundColor: '#4C8F4F',
  },
  hillFront: {
    width: '120%',
    height: '50%',
    left: '-30%',
    bottom: '-35%',
    backgroundColor: '#5EA357',
  },
  treeCluster: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#356B3C',
    opacity: 0.5,
  },
});
