import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import QuestionCard from "../../components/QuestionCard";
import { QUESTIONS } from "../../data/questions";
import { DOMAINS } from "../../data/domains";
import { getResponses, createResponse, updateResponse } from "../../lib/api";
import { useAssessment } from "../../contexts/AssessmentContext";
import Theme from '../../styles/theme';

export default function DomainAssessment() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const domainIdRaw = params?.domainId;
  const domainIndex = Number(domainIdRaw); // numeric domain index
  const assessmentId = params?.assessmentId
    ? Number(params.assessmentId)
    : null;
  const domain = DOMAINS.find((d) => d.id === domainIndex);

  const { responses, comments, updateResponse, updateComment } =
    useAssessment();

  const [loadingSave, setLoadingSave] = useState(false);

  // Load persisted responses for this assessment into context (one-time / when assessmentId changes)
  useEffect(() => {
    const load = async () => {
      if (!assessmentId) return;
      try {
        const { data } = await getResponses(assessmentId);
        if (data && Array.isArray(data)) {
          // populate context responses/comments
          data.forEach((r) => {
            // r.question_id and r.score expected
            if (r.question_id != null) {
              updateResponse(r.question_id, r.score != null ? r.score : null);
            }
            if (r.question_id != null && r.comments != null) {
              updateComment(r.question_id, r.comments);
            }
          });
        }
      } catch (err) {
        console.warn("Failed to load responses:", err);
      }
    };
    load();
  }, [assessmentId]);

  // Save (upsert) all responses for this domain
  const handleSaveChanges = async () => {
    if (!assessmentId) {
      Alert.alert("Save failed", "No assessmentId provided.");
      return;
    }
    setLoadingSave(true);
    try {
      const { data: existing = [] } = await getResponses(assessmentId);
      const existingByQuestion = {};
      existing.forEach((r) => {
        existingByQuestion[r.question_id] = r;
      });

      const domainQuestions = QUESTIONS[domainIndex] || [];

      const ops = domainQuestions.map((q) => {
        const qid = q.id;
        const score = responses[qid] != null ? responses[qid] : null;
        const comment = comments[qid] || "";
        const existingRow = existingByQuestion[qid];

        if (existingRow) {
          // update existing row
          return updateResponse(existingRow.id, { score, comments: comment });
        } else {
          // create new row
          return createResponse({
            assessment_id: assessmentId,
            question_id: qid,
            domain_id: domainIndex,
            score,
            comments: comment,
          });
        }
      });

      await Promise.all(ops);
      // reload and sync context
      const { data: refreshed = [] } = await getResponses(assessmentId);
      refreshed.forEach((r) => {
        if (r.question_id != null)
          updateResponse(r.question_id, r.score != null ? r.score : null);
        if (r.question_id != null && r.comments != null)
          updateComment(r.question_id, r.comments);
      });

      Alert.alert("Saved", "Responses saved successfully.");
    } catch (err) {
      console.warn("Save error:", err);
      Alert.alert("Save failed", "An error occurred while saving.");
    } finally {
      setLoadingSave(false);
    }
  };

  const handlePrevDomain = () => {
    const prev = domainIndex - 1;
    if (prev >= 1) {
      router.push(
        `assessment/${prev}${assessmentId ? `?assessmentId=${assessmentId}` : ""}`
      );
    }
  };

  const handleNextDomain = () => {
    const next = domainIndex + 1;
    // If there is a next domain, navigate. You may want to check DOMAINS length if available.
    router.push(
      `assessment/${next}${assessmentId ? `?assessmentId=${assessmentId}` : ""}`
    );
  };

  const questions = QUESTIONS[domainIndex] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{domain?.name}</Text>
      <ScrollView style={styles.questionsContainer}>
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            currentScore={responses[question.id]}
            currentComment={comments[question.id]}
            onScoreChange={(score) => updateResponse(question.id, score)}
            onCommentChange={(text) => updateComment(question.id, text)}
          />
        ))}
        <TouchableOpacity
          style={[styles.saveButton]}
          onPress={handleSaveChanges}
          disabled={loadingSave}
        >
          <Text style={styles.saveButtonText}>
            {loadingSave ? "Saving..." : "Save changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton]}
          onPress={handlePrevDomain}
          disabled={domainIndex <= 1}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNextDomain}
        >
          <Text style={[styles.navButtonText, styles.nextButtonText]}>
            Next →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { COLORS, SIZES, TYPOGRAPHY, SHADOW } = Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.large,
    backgroundColor: COLORS.card,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginBottom: SIZES.medium,
  },
  questionsContainer: {
    flex: 1,
    marginBottom: SIZES.medium,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.medium,
    paddingVertical: SIZES.small,
  },
  navButton: {
    flex: 1,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    marginHorizontal: 6,
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.soft,
  },
  prevButton: {},
  nextButton: {
    backgroundColor: COLORS.primary,
  },
  navButtonText: {
    fontSize: TYPOGRAPHY.bodyStrong,
    fontWeight: "700",
    color: COLORS.text,
  },
  nextButtonText: {
    color: COLORS.surface,
  },
  saveButton: {
    flex: 1,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    marginHorizontal: 6,
    alignItems: "center",
    backgroundColor: COLORS.accent,
    ...SHADOW.lifted,
  },
  saveButtonText: {
    color: COLORS.surface,
    fontWeight: "800",
  },
});
