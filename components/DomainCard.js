import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../styles/theme';

export default function DomainCard({ domain, score, onPress }) {
  const getScoreColor = (s) => {
    if (s >= 4.1) return Theme.COLORS.success;
    if (s >= 3.1) return Theme.COLORS.primary;
    if (s >= 2.1) return Theme.COLORS.accent;
    if (s > 0) return '#ef4444';
    return Theme.COLORS.border;
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

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.soft,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.medium,
  },
  icon: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: TYPOGRAPHY.h6,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  description: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 22,
    fontWeight: '800',
  },
  maxScore: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
