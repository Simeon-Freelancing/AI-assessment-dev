import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'in progress':
      return '#f59e0b';
    case 'submitted':
      return '#10b981';
    case 'not started':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

const AssessmentCard = ({ report, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{report.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
            <Text style={styles.statusText}>{report.status}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Completed:</Text>
            <Text style={styles.value}>{report.completedDate || 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Score:</Text>
            <Text style={styles.value}>{report.score || 'Not available'}</Text>
          </View>

          {report.additionalDetails && (
            <Text style={styles.details}>{report.additionalDetails}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ...existing styles...
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a365d',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#64748b',
    fontSize: 14,
    marginRight: 8,
  },
  value: {
    color: '#0f172a',
    fontSize: 14,
  },
  details: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 8,
  }
});

export default AssessmentCard;
