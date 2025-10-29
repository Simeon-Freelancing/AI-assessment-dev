import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../styles/theme';
import Typography from './ui/Typography';

const getStatusColor = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'in progress':
      return Theme.COLORS.accent;
    case 'submitted':
      return Theme.COLORS.success;
    case 'not started':
      return Theme.COLORS.danger;
    default:
      return Theme.COLORS.muted;
  }
};

const AssessmentCard = ({ report, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.card}>
        <View style={styles.header}>
            <Typography.H3 style={styles.title}>{report.title}</Typography.H3>
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
  // updated to use theme tokens
  card: {
    backgroundColor: Theme.COLORS.surface,
    borderRadius: Theme.SIZES.cardRadius,
    padding: Theme.SIZES.md,
    marginBottom: Theme.SIZES.sm,
    borderWidth: 1,
    borderColor: Theme.COLORS.border,
    ...Theme.SHADOW.subtle,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.SIZES.sm,
  },
  title: {
    fontSize: Theme.TYPOGRAPHY.h3,
    fontWeight: Theme.TYPOGRAPHY.weight.bold,
    color: Theme.COLORS.navy,
    flex: 1,
    marginRight: Theme.SIZES.sm,
  },
  statusBadge: {
    paddingHorizontal: Theme.SIZES.sm,
    paddingVertical: Theme.SIZES.xs,
    borderRadius: Theme.SIZES.radius,
  },
  statusText: {
    color: '#fff',
    fontSize: Theme.TYPOGRAPHY.small,
    fontWeight: Theme.TYPOGRAPHY.weight.medium,
  },
  content: {
    gap: Theme.SIZES.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Theme.COLORS.muted,
    fontSize: Theme.TYPOGRAPHY.small,
    marginRight: Theme.SIZES.sm,
  },
  value: {
    color: Theme.COLORS.text,
    fontSize: Theme.TYPOGRAPHY.body,
  },
  details: {
    color: Theme.COLORS.muted,
    fontSize: Theme.TYPOGRAPHY.small,
    marginTop: Theme.SIZES.sm,
  }
});

export default AssessmentCard;
