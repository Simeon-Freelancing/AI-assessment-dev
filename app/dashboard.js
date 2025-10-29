import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getAssessment, getResponses, createAssessment } from '../lib/api';
import { DOMAINS } from '../data/domains';
import DomainCard from '../components/DomainCard';
import ScoreGauge from '../components/ScoreGauge';
import { calculateDomainScore, calculateOverallScore, getReadinessLevel } from '../utils/scoring';
import Theme from '../styles/theme';
import Typography from '../components/ui/Typography';
import Button from '../components/ui/Button';

export default function Dashboard({ route }) {
  const router = useRouter();
  const params = useLocalSearchParams(); // read query params
  const orgId = params?.orgId ? Number(params.orgId) : null;

  const [assessment, setAssessment] = React.useState(null);
  const [responses, setResponses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!orgId) {
        setLoading(false);
        return;
      }
      const { data: assessments } = await getAssessment(orgId, "in-progress");
      console.log("The assessments are: ", assessments[0]);
      if (assessments && assessments.length > 0) {
        setAssessment(assessments[0]);
        const { data: resp } = await getResponses(assessments[0].id);
        setResponses(resp || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [orgId]);

  const handleStartAssessment = async () => {
    if (!orgId) return;
    const { data, error } = await createAssessment({ org_id: orgId, status: "in-progress" });
    if (data) {
      setAssessment(data);
      setResponses([]);
      // navigate into first domain with assessmentId so user can start answering
      router.push(`/assessment/1?orgId=${orgId}&assessmentId=${data.id}`);
    }
  };
  
  console.log("The assessment is ", assessment);
  const hasStartedAssessment = assessment ? assessment.status : null
  const hasResponses = responses.length > 0;
  const overallScore = hasResponses ? calculateOverallScore(responses) : 0;
  const readinessLevel = getReadinessLevel(overallScore);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Typography.H1 style={styles.title}>AI Readiness Dashboard</Typography.H1>
        {loading ? (
          <Text>Loading...</Text>
        ) : hasStartedAssessment ? (
          <View style={styles.scoreSection}>
            <ScoreGauge score={overallScore} size={140} />
            <View style={styles.scoreInfo}>
              <Text style={styles.readinessLabel}>Readiness Level</Text>
                <Text
                  style={[styles.readinessLevel, { color: readinessLevel.color }]}
                >
                  {readinessLevel.level}
                </Text>
                <Text style={styles.scoreDescription}>
                  Based on {responses.length} answered questions
                </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Assessment Data</Text>
            <Text style={styles.emptyText}>
              Start your AI readiness assessment to see your dashboard
            </Text>
            <Button style={styles.startButton} onPress={handleStartAssessment}>Start Assessment</Button>
          </View>
        )}
      </View>

      {hasStartedAssessment && (
        <View style={styles.domainsSection}>
          <Typography.H2 style={styles.sectionTitle}>Domain Scores</Typography.H2>
          {DOMAINS.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              score={calculateDomainScore(responses, domain.id)}
              onPress={() =>
                router.push(
                  `/assessment/${domain.id}?orgId=${orgId}&assessmentId=${
                    assessment?.id ?? ""
                  }`
                )
              }
            />
          ))}
        </View>
      )}

      {hasStartedAssessment && (
        <View style={styles.actionsSection}>
          <Button style={[styles.actionButton, styles.secondaryAction]} onPress={() => router.push(`/assessment/1?orgId=${orgId}&assessmentId=${assessment?.id ?? ''}`)}>
            Continue Assessment
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.card },
  header: { padding: SIZES.large, backgroundColor: COLORS.surface, ...SHADOW.subtle },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.primaryDark, marginBottom: SIZES.large },
  scoreSection: { alignItems: 'center', paddingVertical: SIZES.medium },
  scoreInfo: { alignItems: 'center', marginTop: SIZES.medium },
  readinessLabel: { fontSize: TYPOGRAPHY.label, color: COLORS.muted, marginBottom: 6 },
  readinessLevel: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
  scoreDescription: { fontSize: TYPOGRAPHY.body, color: COLORS.muted },
  emptyState: { alignItems: 'center', paddingVertical: SIZES.large },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  emptyText: { fontSize: TYPOGRAPHY.body, color: COLORS.muted, textAlign: 'center', marginBottom: 24 },
  startButton: { backgroundColor: COLORS.primary, paddingVertical: SIZES.medium, paddingHorizontal: SIZES.xl, borderRadius: SIZES.small, ...SHADOW.elevated },
  startButtonText: { color: COLORS.surface, fontSize: TYPOGRAPHY.h6, fontWeight: '700' },
  domainsSection: { padding: SIZES.medium },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginBottom: SIZES.medium },
  actionsSection: { padding: SIZES.medium, paddingBottom: SIZES.xl },
  actionButton: { backgroundColor: COLORS.primary, paddingVertical: SIZES.medium, borderRadius: SIZES.small, marginBottom: 12, ...SHADOW.elevated },
  actionButtonText: { color: COLORS.surface, fontSize: TYPOGRAPHY.h6, fontWeight: '700', textAlign: 'center' },
  secondaryAction: { backgroundColor: COLORS.surface, borderWidth: 2, borderColor: COLORS.primary },
  secondaryActionText: { color: COLORS.primary },
});
