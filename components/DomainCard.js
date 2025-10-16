import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function DomainCard({ domain, score, onPress }) {
  const getScoreColor = (s) => {
    if (s >= 4.1) return '#10b981';
    if (s >= 3.1) return '#0891b2';
    if (s >= 2.1) return '#f59e0b';
    if (s > 0) return '#ef4444';
    return '#cbd5e1';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: domain.icon }} style={styles.icon} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{domain.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{domain.description}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { color: getScoreColor(score) }]}>
          {score > 0 ? score.toFixed(1) : '-'}
        </Text>
        <Text style={styles.maxScore}>/ 5.0</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#64748b',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 24,
    fontWeight: '700',
  },
  maxScore: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
