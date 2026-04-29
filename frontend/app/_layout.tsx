import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/store/auth";
import { colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.panel} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.panel },
        }}
      />
    </AuthProvider>
  );
}
