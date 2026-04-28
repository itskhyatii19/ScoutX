import { router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";
import { useAuth } from "@/store/auth";

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sport, setSport] = useState("Football");
  const [country, setCountry] = useState("India");
  const [role, setRole] = useState("athlete");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    try {
      setSubmitting(true);
      await signUp({ name, email: email.trim(), password, sport, country, role });
    } catch (error) {
      Alert.alert("Signup failed", error instanceof Error ? error.message : "Try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>ScoutX</Text>
        <Text style={styles.title}>Build your player profile</Text>
        <Text style={styles.copy}>Join athletes, clubs, and scouts sharing match clips and performance notes.</Text>

        <View style={styles.form}>
          <TextInput placeholder="Full name" placeholderTextColor={colors.muted} value={name} onChangeText={setName} style={styles.input} />
          <TextInput autoCapitalize="none" keyboardType="email-address" placeholder="Email" placeholderTextColor={colors.muted} value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Password" placeholderTextColor={colors.muted} secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
          <View style={styles.row}>
            <TextInput placeholder="Sport" placeholderTextColor={colors.muted} value={sport} onChangeText={setSport} style={[styles.input, styles.half]} />
            <TextInput placeholder="Country" placeholderTextColor={colors.muted} value={country} onChangeText={setCountry} style={[styles.input, styles.half]} />
          </View>
          <View style={styles.segment}>
            {["athlete", "scout", "club"].map((item) => (
              <TouchableOpacity key={item} style={[styles.segmentItem, role === item && styles.segmentActive]} onPress={() => setRole(item)}>
                <Text style={[styles.segmentText, role === item && styles.segmentTextActive]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity disabled={submitting} style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryText}>{submitting ? "Creating..." : "Create account"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => router.push("/login")}>
            <Text style={styles.linkText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.panel,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "900",
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
    marginBottom: 28,
  },
  form: {
    gap: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
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
  segment: {
    flexDirection: "row",
    gap: 8,
  },
  segmentItem: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  segmentActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  segmentText: {
    color: colors.muted,
    textTransform: "capitalize",
    fontWeight: "800",
  },
  segmentTextActive: {
    color: colors.panelSoft,
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
