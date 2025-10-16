import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAssessment } from '../contexts/AssessmentContext';
import { DOMAINS } from '../data/domains';
import DomainCard from '../components/DomainCard';
import ScoreGauge from '../components/ScoreGauge';
import { calculateDomainScore, calculateOverallScore, getReadinessLevel } from '../utils/scoring';

export default function Dashboard() {
  const router = useRouter();
  const { responses, startAssessment } = useAssessment();

  const overallScore = calculateOverallScore(responses);
  const readinessLevel = getReadinessLevel(overallScore);
  const hasResponses = Object.keys(responses).length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Readiness Dashboard</Text>
        
        {hasResponses ? (
          <View style={styles.scoreSection}>
            <ScoreGauge score={overallScore} size={140} />
            <View style={styles.scoreInfo}>
              <Text style={styles.readinessLabel}>Readiness Level</Text>
              <Text style={[styles.readinessLevel, { color: readinessLevel.color }]}>
                {readinessLevel.level}
              </Text>
              <Text style={styles.scoreDescription}>
                Based on {Object.keys(responses).length} answered questions
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Assessment Data</Text>
            <Text style={styles.emptyText}>
              Start your AI readiness assessment to see your dashboard
            </Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => {
                startAssessment();
                router.push('/assessment/1');
              }}
            >
              <Text style={styles.startButtonText}>Start Assessment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {hasResponses && (
        <View style={styles.domainsSection}>
          <Text style={styles.sectionTitle}>Domain Scores</Text>
          {DOMAINS.map(domain => (
            <DomainCard
              key={domain.id}
              domain={domain}
              score={calculateDomainScore(responses, domain.id)}
              onPress={() => router.push(`/assessment/${domain.id}`)}
            />
          ))}
        </View>
      )}

      {hasResponses && (
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/results')}
          >
            <Text style={styles.actionButtonText}>View Detailed Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryAction]}
            onPress={() => router.push('/assessment/1')}
          >
            <Text style={[styles.actionButtonText, styles.secondaryActionText]}>
              Continue Assessment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryAction]}
            onPress={() => router.push('/ai-assistant')}
          >
            <Text style={[styles.actionButtonText, styles.secondaryActionText]}>
              🤖 AI Assistant
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', color: '#1a365d', marginBottom: 20 },
  scoreSection: { alignItems: 'center', paddingVertical: 20 },
  scoreInfo: { alignItems: 'center', marginTop: 20 },
  readinessLabel: { fontSize: 14, color: '#64748b', marginBottom: 4 },
  readinessLevel: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  scoreDescription: { fontSize: 12, color: '#94a3b8' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: '#1e293b', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 24 },
  startButton: { backgroundColor: '#0891b2', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 8 },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  domainsSection: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginBottom: 16 },
  actionsSection: { padding: 16, paddingBottom: 32 },
  actionButton: { backgroundColor: '#0891b2', paddingVertical: 16, borderRadius: 8, marginBottom: 12 },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  secondaryAction: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#0891b2' },
  secondaryActionText: { color: '#0891b2' },
});
