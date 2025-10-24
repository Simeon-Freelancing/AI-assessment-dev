import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuestionCard({ question, currentScore, onScoreChange }) {
  const [showGuidance, setShowGuidance] = useState(false);
  
  const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
            activeOpacity={0.7}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
    lineHeight: 24,
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    flexWrap: "wrap",
    gap: 10,
  },
  scoreButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  scoreButtonActive: {
    backgroundColor: "#0891b2",
    borderColor: "#0e7490",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
  },
  scoreTextActive: {
    color: "#fff",
  },
  guidanceButton: {
    paddingVertical: 8,
  },
  guidanceButtonText: {
    fontSize: 14,
    color: "#0891b2",
    fontWeight: "600",
  },
  guidanceContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0891b2",
  },
  guidanceText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
});
