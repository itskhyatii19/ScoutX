import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { useAuth } from "@/store/auth";

export default function HomeScreen() {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/(tabs)" : "/login");
    }
  }, [loading, user]);

  return (
    <View style={styles.container}>
      <View style={styles.mark}>
        <Text style={styles.markText}>SX</Text>
      </View>
      <Text style={styles.logo}>ScoutX</Text>
      <Text style={styles.subtitle}>The scouting network for the next breakout player.</Text>
      <ActivityIndicator color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.panel,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  mark: {
    width: 92,
    height: 92,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    marginBottom: 20,
  },
  markText: {
    color: colors.panelSoft,
    fontSize: 34,
    fontWeight: "900",
  },
  logo: {
    fontSize: 44,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.muted,
    marginBottom: 30,
    maxWidth: 280,
  },
});
