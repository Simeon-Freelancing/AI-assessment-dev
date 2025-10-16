import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAssessment } from '../contexts/AssessmentContext';
import { calculateOverallScore, calculateDomainScore } from '../utils/scoring';
import { DOMAINS } from '../data/domains';

export default function AIAssistant() {
  const { responses } = useAssessment();
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Readiness Assistant powered by ChatGPT. I can help you understand your assessment results, provide recommendations, and answer questions about AI adoption. How can I help you today?'
    }
  ]);

  const overallScore = calculateOverallScore(responses);

  const generateResponse = (userQuestion) => {
    const lowerQ = userQuestion.toLowerCase();
    
    // Contextual responses based on assessment data
    if (lowerQ.includes('score') || lowerQ.includes('readiness')) {
      if (overallScore === 0) {
        return 'You haven\'t completed any assessment questions yet. Start your assessment to get personalized insights about your AI readiness!';
      }
      return `Your current AI readiness score is ${overallScore.toFixed(1)}/5.0. ${
        overallScore >= 4.1 ? 'Excellent! You\'re well-positioned for AI adoption.' :
        overallScore >= 3.1 ? 'Good progress! Focus on strengthening weaker domains.' :
        overallScore >= 2.1 ? 'You\'re developing. Prioritize foundational improvements.' :
        'You\'re at the beginning. Focus on building AI awareness and basic capabilities.'
      }`;
    }

    if (lowerQ.includes('improve') || lowerQ.includes('recommendation')) {
      const weakestDomain = DOMAINS.map(d => ({
        ...d,
        score: calculateDomainScore(responses, d.id)
      })).filter(d => d.score > 0).sort((a, b) => a.score - b.score)[0];

      if (!weakestDomain) {
        return 'Complete more assessment questions to get specific recommendations.';
      }

      return `Your weakest area is ${weakestDomain.name} (${weakestDomain.score.toFixed(1)}/5.0). I recommend:\n\n1. Conduct a detailed audit of this domain\n2. Allocate resources for improvement\n3. Set specific 90-day goals\n4. Measure progress monthly\n\nWould you like specific strategies for this domain?`;
    }

    if (lowerQ.includes('data') || lowerQ.includes('governance')) {
      return 'Data governance is crucial for AI success. Key steps:\n\n1. Establish data quality standards\n2. Implement access controls\n3. Create data catalogs\n4. Ensure compliance (GDPR, etc.)\n5. Build data pipelines\n\nStrong data foundations enable better AI outcomes.';
    }

    if (lowerQ.includes('talent') || lowerQ.includes('skills')) {
      return 'Building AI talent involves:\n\n1. Upskilling existing teams\n2. Hiring specialized roles (data scientists, ML engineers)\n3. Creating learning paths\n4. Partnering with universities\n5. Fostering a learning culture\n\nConsider starting with online courses and certifications.';
    }

    // Default response
    return 'That\'s a great question! For AI readiness, focus on: strategic alignment, data quality, technical infrastructure, skilled talent, and strong governance. Would you like me to elaborate on any of these areas?';
  };

  const handleSend = () => {
    if (!question.trim()) return;

    const userMessage = { role: 'user', content: question };
    const aiResponse = { role: 'assistant', content: generateResponse(question) };

    setConversation([...conversation, userMessage, aiResponse]);
    setQuestion('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {conversation.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.assistantBubble
            ]}
          >
            <Text style={styles.roleLabel}>
              {msg.role === 'user' ? '👤 You' : '🤖 AI Assistant'}
            </Text>
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="Ask me anything about AI readiness..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0891b2',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    color: '#64748b',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1e293b',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#0891b2',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
