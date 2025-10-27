import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAssessment } from "../contexts/AssessmentContext";
import Theme from "../styles/theme";

export default function Home() {
  const router = useRouter();
  const { startAssessment } = useAssessment();

  const handleStartAssessment = () => {
    startAssessment();
    router.push("/details");
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://d64gsuwffb70l.cloudfront.net/68e62841fcfbb0441502bbc7_1759914103380_1a932241.webp",
        }}
        style={styles.heroImage}
      />

      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>Measure Your AI Future</Text>
        <Text style={styles.heroSubtitle}>
          Comprehensive AI readiness evaluation across 10 critical domains
        </Text>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleStartAssessment}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaText}>Start Assessment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/dashboard")}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryText}>View Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { marginTop: 8 }]}
          onPress={() => router.push("/ai-assistant")}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryText}>🤖 AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>What You'll Get</Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📊</Text>
          <Text style={styles.featureTitle}>Comprehensive Scoring</Text>
          <Text style={styles.featureText}>
            100 questions across 10 domains with detailed scoring guidance
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureTitle}>AI-Powered Insights</Text>
          <Text style={styles.featureText}>
            ChatGPT-driven recommendations tailored to your results
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📈</Text>
          <Text style={styles.featureTitle}>Actionable Reports</Text>
          <Text style={styles.featureText}>
            Detailed analysis with short, medium, and long-term action plans
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🎯</Text>
          <Text style={styles.featureTitle}>Progress Tracking</Text>
          <Text style={styles.featureText}>
            Monitor improvement over time with historical comparisons
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 AI Readiness Evaluation Platform
        </Text>
      </View>
    </ScrollView>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.card,
  },
  heroImage: {
    width: "100%",
    height: 200,
  },
  heroContent: {
    padding: SIZES.large,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.primaryDark,
    textAlign: "center",
    marginBottom: SIZES.small,
  },
  heroSubtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: SIZES.medium,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.small,
    width: "100%",
    ...SHADOW.lifted,
  },
  ctaText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.h6,
    fontWeight: "800",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    width: "100%",
    marginBottom: SIZES.small,
    ...SHADOW.soft,
  },
  secondaryText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.h6,
    fontWeight: "700",
    textAlign: "center",
  },
  featuresSection: {
    padding: SIZES.large,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  featureCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.medium,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.medium,
    ...SHADOW.soft,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: SIZES.small,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.h6,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  featureText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.muted,
    lineHeight: 20,
  },
  footer: {
    padding: SIZES.large,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
