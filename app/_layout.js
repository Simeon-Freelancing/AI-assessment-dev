import { Stack, router } from 'expo-router';
import { Button } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { AssessmentProvider } from '../contexts/AssessmentContext';

export default function RootLayout() {
  return (
    <AssessmentProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1a365d",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "AI Readiness Evaluation",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="assessment/[domainId]"
          options={{
            title: "Assessment",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerLeft: () => {
              return (
                <HeaderBackButton
                  tintColor="white" // or 'white' depending on your theme
                  onPress={() => router.replace("/")} // 👈 custom navigation
                />
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
      </Stack>
    </AssessmentProvider>
  );
}
