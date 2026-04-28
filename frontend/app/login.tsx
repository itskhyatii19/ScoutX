import { router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";
import { useAuth } from "@/store/auth";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    try {
      setSubmitting(true);
      await signIn(email.trim(), password);
    } catch (error) {
      Alert.alert("Login failed", error instanceof Error ? error.message : "Try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.logo}>ScoutX</Text>
        <Text style={styles.title}>Sign in to your scouting room</Text>
        <Text style={styles.copy}>Track athletes, publish reports, and follow talent movement in real time.</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity disabled={submitting} style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryText}>{submitting ? "Checking..." : "Login"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => router.push("/signup")}>
          <Text style={styles.linkText}>Create a ScoutX account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.panel,
    padding: 24,
    justifyContent: "center",
  },
  hero: {
    marginBottom: 34,
  },
  logo: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
  },
  copy: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  form: {
    gap: 14,
  },
  input: {
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.card,
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
  primaryText: {
    color: colors.panelSoft,
    fontSize: 16,
    fontWeight: "900",
  },
  linkButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  linkText: {
    color: colors.text,
    fontWeight: "700",
  },
});
