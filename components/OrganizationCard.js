import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OrganizationCard({ org, onEdit, onStartAssessment, onViewReport }) {
	const assessments = org.assessments || [];
	const latest = assessments.length > 0 ? assessments[0] : null;

	return (
		<View style={styles.card}>
			<View style={styles.leftAccent} />
			<View style={styles.content}>
				<View style={styles.rowTop}>
					<Text style={styles.name}>{org.name}</Text>
					<Text style={styles.meta}>ID: {org.id}</Text>
				</View>

				<View style={styles.rowMeta}>
					<Text style={styles.small}>Onboarded: {new Date(org.createdAt).toLocaleDateString()}</Text>
					<Text style={styles.small}>{assessments.length} assessments</Text>
				</View>

				{latest ? (
					<View style={styles.latest}>
						<View>
							<Text style={styles.sectionTitle}>Latest</Text>
							<Text style={styles.latestText}>
								{new Date(latest.takenAt).toLocaleDateString()} — {latest.status}
							</Text>
							{latest.reportSummary && <Text style={styles.snippet}>{latest.reportSummary}</Text>}
						</View>
						<View style={styles.scoreWrap}>
							<Text style={styles.scoreLabel}>Score</Text>
							<Text style={styles.scoreValue}>{latest.score != null ? `${latest.score}%` : '—'}</Text>
						</View>
					</View>
				) : (
					<View style={styles.noAssess}>
						<Text style={styles.noAssessText}>No assessments yet</Text>
					</View>
				)}

				<View style={styles.actions}>
					<TouchableOpacity style={styles.actionBtn} onPress={() => onEdit(org)}>
						<Text style={styles.actionText}>Edit</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.actionBtnPrimary} onPress={() => onStartAssessment(org)}>
						<Text style={styles.actionTextPrimary}>View Organization</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.actionBtn} onPress={() => onViewReport(org)}>
						<Text style={styles.actionText}>Reports</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 12,
		marginVertical: 8,
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowRadius: 8,
		elevation: 3,
		overflow: 'hidden',
	},
	leftAccent: {
		width: 6,
		backgroundColor: '#1a365d',
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
	content: {
		flex: 1,
		paddingHorizontal: 12,
	},
	rowTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	name: {
		fontSize: 16,
		fontWeight: '800',
		color: '#0f172a',
	},
	meta: {
		fontSize: 12,
		color: '#64748b',
	},
	rowMeta: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 12,
		marginTop: 6,
	},
	small: {
		color: '#6b7280',
		fontSize: 12,
		marginRight: 10,
	},
	sectionTitle: {
		fontSize: 13,
		fontWeight: '700',
		color: '#111827',
	},
	latest: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 8,
	},
	latestText: {
		color: '#374151',
		marginTop: 4,
	},
	snippet: {
		color: '#6b7280',
		marginTop: 6,
		fontSize: 12,
	},
	scoreWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	scoreLabel: {
		fontSize: 12,
		color: '#6b7280',
	},
	scoreValue: {
		marginTop: 4,
		fontSize: 18,
		fontWeight: '800',
		color: '#1a365d',
	},
	noAssess: {
		marginTop: 8,
	},
	noAssessText: {
		color: '#9ca3af',
		fontStyle: 'italic',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
	},
	actionBtn: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 6,
		backgroundColor: '#eef2ff',
		marginRight: 8,
	},
	actionText: {
		color: '#1a365d',
		fontWeight: '600',
	},
	actionBtnPrimary: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 6,
		backgroundColor: '#1a365d',
	},
	actionTextPrimary: {
		color: '#fff',
		fontWeight: '700',
	},
});
