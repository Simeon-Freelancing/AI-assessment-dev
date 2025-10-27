import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../styles/theme';

export default function QuestionCard({ question, currentScore, onScoreChange }) {
  const [showGuidance, setShowGuidance] = useState(false);
  
  const scores = [1,2,3,4,5,6,7,8,9,10];

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      <View style={styles.scoresContainer}>
        {scores.map((score) => (
          <TouchableOpacity
            key={score}
            style={[
              styles.scoreButton,
              currentScore === score && styles.scoreButtonActive
            ]}
            onPress={() => onScoreChange(score)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.scoreText,
              currentScore === score && styles.scoreTextActive
            ]}>
              {score}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        onPress={() => setShowGuidance(!showGuidance)}
        style={styles.guidanceButton}
        activeOpacity={0.8}
      >
        <Text style={styles.guidanceButtonText}>
          {showGuidance ? '▼ Hide Guidance' : '▶ Show Scoring Guidance'}
        </Text>
      </TouchableOpacity>

      {showGuidance && (
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceText}>{question.guidance}</Text>
        </View>
      )}
    </View>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.large,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.soft,
  },
  questionText: {
    fontSize: TYPOGRAPHY.h6,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.medium,
    lineHeight: 24,
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.medium,
    flexWrap: "wrap",
  },
  scoreButton: {
    width: SIZES.scoreButton,
    height: SIZES.scoreButton,
    borderRadius: SIZES.scoreButton / 2,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 10,
    marginBottom: 10,
    ...SHADOW.lifted,
  },
  scoreButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
    transform: [{ scale: 1.03 }],
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.muted,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  scoreTextActive: {
    color: '#fff',
  },
  guidanceButton: {
    paddingVertical: 6,
  },
  guidanceButtonText: {
    fontSize: TYPOGRAPHY.label,
    color: COLORS.primary,
    fontWeight: "700",
  },
  guidanceContainer: {
    marginTop: 12,
    padding: 14,
    backgroundColor: COLORS.guidanceBg,
    borderRadius: SIZES.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  guidanceText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.subtext,
    lineHeight: 20,
  },
});
