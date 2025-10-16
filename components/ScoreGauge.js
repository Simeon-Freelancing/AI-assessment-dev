import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScoreGauge({ score, size = 120 }) {
  const percentage = (score / 5) * 100;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getColor = () => {
    if (score >= 4.1) return '#10b981';
    if (score >= 3.1) return '#0891b2';
    if (score >= 2.1) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.circle}>
        <Text style={styles.scoreText}>{score.toFixed(1)}</Text>
        <Text style={styles.maxText}>/ 5.0</Text>
      </View>
      <View style={[styles.ring, { borderColor: getColor(), borderWidth: 8 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1e293b',
  },
  maxText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: -4,
  },
});
