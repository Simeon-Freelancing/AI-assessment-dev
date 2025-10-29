import { Stack, useLocalSearchParams, router } from 'expo-router';
import { TouchableOpacity, Text } from "react-native";
import { ThemeProvider } from 'styled-components/native';
import { AssessmentProvider } from '../contexts/AssessmentContext';
import Theme from '../styles/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={Theme}>
      <AssessmentProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Theme.COLORS.primary,
              ...Theme.SHADOW.subtle, // subtle elevation for header
            },
            headerTintColor: Theme.COLORS.surface,
            headerTitleStyle: {
              fontWeight: "700",
              fontFamily: Theme.TYPOGRAPHY.fontFamily,
              color: Theme.COLORS.surface,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home", // changed from "AI Readiness Evaluation"
              headerShown: true, // hide default header so index can render a custom admin header
            }}
          />
          <Stack.Screen
            name="assessment/[domainId]"
            options={{
              title: "Assessment",
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ paddingHorizontal: 12, paddingVertical: 6 }}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                  >
                    <Text style={{ color: Theme.COLORS.surface, fontSize: 20 }}>
                      ←
                    </Text>
                  </TouchableOpacity>
                );
              },
            }}
          />
          <Stack.Screen
            name="dashboard"
            options={{
              title: "Dashboard",
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => router.replace("/")}
                    style={{ paddingHorizontal: 12, paddingVertical: 6 }}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                  >
                    <Text style={{ color: Theme.COLORS.surface, fontSize: 20 }}>
                      ←
                    </Text>
                  </TouchableOpacity>
                );
              },
            }}
          />
          <Stack.Screen
            name="results"
            options={{
              title: "Results & Insights",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="ai-assistant"
            options={{
              title: "AI Assistant",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="details"
            options={{
              title: "Organization Details",
              headerShown: true,
            }}
          />
        </Stack>
      </AssessmentProvider>
    </ThemeProvider>
  );
}
