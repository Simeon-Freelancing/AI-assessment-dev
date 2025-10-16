import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAssessment } from "../../contexts/AssessmentContext";
import { DOMAINS } from "../../data/domains";
import { QUESTIONS } from "../../data/questions";
import QuestionCard from "../../components/QuestionCard";
import ProgressBar from "../../components/ProgressBar";
import { getCompletionPercentage } from "../../utils/scoring";

export default function DomainAssessment() {
  const router = useRouter();
  const { domainId } = useLocalSearchParams();
  const domainIndex = parseInt(domainId); // string → number
  console.log("The domain index ", domainId)
  const { responses, updateResponse } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const domain = DOMAINS.find(d => d.id === domainIndex);
  const questions = QUESTIONS[domainIndex] || [];
  const currentQuestion = questions[currentQuestionIndex];
  const completion = getCompletionPercentage(responses);

  const handleScoreChange = (score) => {
    updateResponse(currentQuestion.id, score);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (domainIndex < DOMAINS.length) {
      router.push(`/assessment/${domainIndex + 1}`);
    } else {
      router.push("/results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (domainIndex > 1) {
      router.push(`/assessment/${domainIndex - 1}`);
    }
  };
  console.log("The amount of responses", Object.keys(responses).length);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.domainName}>{domain?.name}</Text>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>

        <ProgressBar percentage={completion} />

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            currentScore={responses[currentQuestion.id]}
            onScoreChange={handleScoreChange}
          />
        )}

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={handlePrevious}
            disabled={domainIndex === 1 && currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>← Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={[styles.navButtonText, styles.nextButtonText]}>
              {domainIndex === DOMAINS.length &&
              currentQuestionIndex === questions.length - 1
                ? "View Results"
                : "Next →"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  domainName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a365d",
    marginBottom: 4,
  },
  questionNumber: {
    fontSize: 14,
    color: "#64748b",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 32,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  prevButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#cbd5e1",
  },
  nextButton: {
    backgroundColor: "#0891b2",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#64748b",
  },
  nextButtonText: {
    color: "#fff",
  },
});
