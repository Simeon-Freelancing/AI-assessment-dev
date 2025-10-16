import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAssessment } from '../contexts/AssessmentContext';

export default function Home() {
  const router = useRouter();
  const { startAssessment } = useAssessment();

  const handleStartAssessment = () => {
    startAssessment();
    router.push('/assessment/1');
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/68e62841fcfbb0441502bbc7_1759914103380_1a932241.webp' }}
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
          onPress={() => router.push('/dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryText}>View Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.secondaryButton, { marginTop: 8 }]}
          onPress={() => router.push('/ai-assistant')}
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
          <Text style={styles.featureText}>100 questions across 10 domains with detailed scoring guidance</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureTitle}>AI-Powered Insights</Text>
          <Text style={styles.featureText}>ChatGPT-driven recommendations tailored to your results</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📈</Text>
          <Text style={styles.featureTitle}>Actionable Reports</Text>
          <Text style={styles.featureText}>Detailed analysis with short, medium, and long-term action plans</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🎯</Text>
          <Text style={styles.featureTitle}>Progress Tracking</Text>
          <Text style={styles.featureText}>Monitor improvement over time with historical comparisons</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 AI Readiness Evaluation Platform</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroContent: {
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0891b2',
    width: '100%',
    marginBottom: 8,
  },
  secondaryText: {
    color: '#0891b2',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  featuresSection: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
