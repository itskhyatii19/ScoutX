import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/store/auth";
import { colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.ink} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.ink },
        }}
      />
    </AuthProvider>
  );
}
