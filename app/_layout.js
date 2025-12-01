import React from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { ThemeProvider } from 'styled-components/native';
import { AssessmentProvider } from '../contexts/AssessmentContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Theme from '../styles/theme';

function RootLayoutNav() {
  const { isAuthenticated, isInitializingAuth } = useAuth();

  if (isInitializingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.COLORS.card }}>
        <ActivityIndicator size="large" color={Theme.COLORS.primary} />
      </View>
    );
  }

  // If not authenticated, show login and verify-token screens only
  if (!isAuthenticated) {
    return (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Theme.COLORS.primary,
            ...Theme.SHADOW.subtle,
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
          name="login"
          options={{
            title: "Sign In",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verify-token"
          options={{
            title: "Verify Email",
            headerShown: false,
          }}
        />
      </Stack>
    );
  }

  // If authenticated, show protected screens
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.COLORS.primary,
          ...Theme.SHADOW.subtle,
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
          title: "Home",
          headerShown: true,
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
        // name="details"
        options={{
          title: "Organization Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <AssessmentProvider>
          <RootLayoutNav />
        </AssessmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
