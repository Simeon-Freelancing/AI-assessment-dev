import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InsightCard({ title, content, type = 'info' }) {
  const getIcon = () => {
    switch (type) {
      case 'strength': return '✅';
      case 'weakness': return '⚠️';
      case 'recommendation': return '💡';
      default: return 'ℹ️';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'strength': return '#10b981';
      case 'weakness': return '#ef4444';
      case 'recommendation': return '#0891b2';
      default: return '#64748b';
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: getColor() }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  content: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
