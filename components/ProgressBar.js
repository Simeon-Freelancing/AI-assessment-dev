import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBar({ percentage }) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Assessment Progress</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  percentage: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '700',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#0891b2',
    borderRadius: 4,
  },
});
