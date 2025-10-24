import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAssessment } from '../contexts/AssessmentContext';
import { DOMAINS } from '../data/domains';
import ScoreGauge from '../components/ScoreGauge';
import InsightCard from '../components/InsightCard';
import { calculateDomainScore, calculateOverallScore, getReadinessLevel } from '../utils/scoring';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function Results() {
  const router = useRouter();
  const { responses, resetAssessment, generateReport, buildReportPayload } = useAssessment();

  const overallScore = calculateOverallScore(responses);
  const readinessLevel = getReadinessLevel(overallScore);

  const domainScores = DOMAINS.map(domain => ({
    ...domain,
    score: calculateDomainScore(responses, domain.id)
  })).sort((a, b) => b.score - a.score);

  const strengths = domainScores.filter(d => d.score >= 4.0).slice(0, 3);
  const weaknesses = domainScores.filter(d => d.score < 3.0 && d.score > 0).slice(0, 3);

  const [generating, setGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const getRecommendations = () => {
    const recs = [];
    
    if (overallScore < 2.5) {
      recs.push({
        title: 'Establish AI Foundation',
        content: 'Focus on building basic AI awareness and creating a preliminary strategy. Start with leadership education and small pilot projects.',
        type: 'recommendation'
      });
    }
    
    if (weaknesses.length > 0) {
      recs.push({
        title: `Improve ${weaknesses[0].name}`,
        content: `This domain scored ${weaknesses[0].score.toFixed(1)}/5.0. Consider investing in training, infrastructure, or process improvements in this area.`,
        type: 'recommendation'
      });
    }

    recs.push({
      title: 'Develop Action Plan',
      content: 'Create a 90-day action plan focusing on quick wins in your weakest domains while maintaining strength areas.',
      type: 'recommendation'
    });

    return recs;
  };

  const handleGenerateReport = async () => {
    setErrorMsg(null);
    setGenerating(true);
    try {
      // Use context helper which builds payload and calls api.createReport
      const report = await generateReport();

      // Build a simple HTML representation for the PDF
      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, Roboto, 'Helvetica Neue', Arial; color: #0f172a; padding: 24px; }
              h1 { color: #1a365d; }
              .section { margin-top: 18px; }
              .domain { margin-top: 10px; padding: 10px; border: 1px solid #e6eef8; border-radius: 6px; background: #fff; }
              .small { color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <h1>AI Readiness Report</h1>
            <p class="small">Organization: ${report.organization_id || ''}</p>
            <h2>Executive Summary</h2>
            <p>${report.executive_summary || ''}</p>

            <div class="section">
              <h3>Overall</h3>
              <p>Score: ${report.overall_score || ''} — Level: ${report.readiness_level || ''}</p>
            </div>

            <div class="section">
              <h3>Domain Results</h3>
              ${ (report.domain_results || []).map(d => `
                <div class="domain">
                  <strong>${d.domain_name}</strong>
                  <p class="small">Average score: ${d.average_score}</p>
                  <p><strong>Strengths:</strong> ${(d.strengths || []).join(', ') || 'None'}</p>
                  <p><strong>Weaknesses:</strong> ${(d.weaknesses || []).join(', ') || 'None'}</p>
                  <p><strong>Recommendations:</strong> ${(d.recommendations || []).join('; ')}</p>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h3>Action Plan</h3>
              <p><strong>Short term:</strong> ${(report.action_plan?.short_term || []).join(', ')}</p>
              <p><strong>Medium term:</strong> ${(report.action_plan?.medium_term || []).join(', ')}</p>
              <p><strong>Long term:</strong> ${(report.action_plan?.long_term || []).join(', ')}</p>
            </div>
          </body>
        </html>
      `;

      // create PDF file
      const file = await Print.printToFileAsync({ html });
      // share / open the pdf
      await shareAsync(file.uri, { mimeType: 'application/pdf' });

    } catch (err) {
      console.warn('report generation error', err);
      setErrorMsg(err?.message || 'Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleRestart = () => {
    Alert.alert(
      'Restart Assessment',
      'Are you sure you want to start a new assessment? Current progress will be saved for comparison.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Restart', 
          onPress: () => {
            resetAssessment();
            router.push('/');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {errorMsg && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>Error: {errorMsg}</Text>
        </View>
      )}

      <View style={styles.scoreSection}>
        <Text style={styles.title}>Your AI Readiness Score</Text>
        <ScoreGauge score={overallScore} size={160} />
        <Text style={[styles.readinessLevel, { color: readinessLevel.color }]}>
          {readinessLevel.level}
        </Text>
        <Text style={styles.scoreDescription}>
          Based on {Object.keys(responses).length} questions across {DOMAINS.length} domains
        </Text>
      </View>

      {strengths.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💪 Strengths</Text>
          {strengths.map(domain => (
            <InsightCard
              key={domain.id}
              title={domain.name}
              content={`Strong performance with ${domain.score.toFixed(1)}/5.0. Continue leveraging this capability.`}
              type="strength"
            />
          ))}
        </View>
      )}

      {weaknesses.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Areas for Improvement</Text>
          {weaknesses.map(domain => (
            <InsightCard
              key={domain.id}
              title={domain.name}
              content={`Scored ${domain.score.toFixed(1)}/5.0. Prioritize development in this area for better AI readiness.`}
              type="weakness"
            />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 AI-Powered Recommendations</Text>
        {getRecommendations().map((rec, index) => (
          <InsightCard
            key={index}
            title={rec.title}
            content={rec.content}
            type={rec.type}
          />
        ))}
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleGenerateReport} disabled={generating}>
          {generating ? (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.primaryButtonText}>Generating report...</Text>
            </View>
          ) : (
            <Text style={styles.primaryButtonText}>📄 Generate Full Report</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/dashboard')}>
          <Text style={styles.secondaryButtonText}>View Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/ai-assistant')}>
          <Text style={styles.secondaryButtonText}>🤖 Ask AI Assistant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton} onPress={handleRestart}>
          <Text style={styles.tertiaryButtonText}>Start New Assessment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  errorCard: {
    backgroundColor: '#fee2e2',
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
    padding: 12,
    margin: 12,
    borderRadius: 6,
  },
  errorText: { color: '#991b1b', fontWeight: '700' },
  scoreSection: { backgroundColor: '#fff', padding: 24, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#1a365d', marginBottom: 20 },
  readinessLevel: { fontSize: 28, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  scoreDescription: { fontSize: 14, color: '#64748b', textAlign: 'center' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
  actionsSection: { padding: 16, paddingBottom: 32 },
  primaryButton: { backgroundColor: '#0891b2', paddingVertical: 16, borderRadius: 8, marginBottom: 12 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  secondaryButton: { backgroundColor: '#fff', paddingVertical: 16, borderRadius: 8, borderWidth: 2, borderColor: '#0891b2', marginBottom: 12 },
  secondaryButtonText: { color: '#0891b2', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  tertiaryButton: { paddingVertical: 12 },
  tertiaryButtonText: { color: '#64748b', fontSize: 14, fontWeight: '600', textAlign: 'center' },
});
