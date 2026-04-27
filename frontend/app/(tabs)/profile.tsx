import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { colors } from "@/constants/theme";
import { api, User } from "@/services/api";
import { useAuth } from "@/store/auth";

export default function ProfileScreen() {
  const { user, signOut, updateUser } = useAuth();
  const [bio, setBio] = useState(user?.bio || "");
  const [club, setClub] = useState(user?.club || "");
  const [position, setPosition] = useState(user?.position || "");
  const [saving, setSaving] = useState(false);

  async function saveProfile() {
    try {
      setSaving(true);
      const response = await api<{ user: User }>("/profile/me", {
        method: "PATCH",
        body: JSON.stringify({ bio, club, position }),
      });
      updateUser(response.user);
      Alert.alert("Saved", "Profile updated.");
    } catch (error) {
      Alert.alert("Save failed", error instanceof Error ? error.message : "Try again");
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Avatar name={user.name} uri={user.avatar} size={86} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.meta}>{user.position || user.role} · {user.sport} · {user.country}</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.followers?.length || 0}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.following?.length || 0}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Profile details</Text>
        <TextInput placeholder="Position" placeholderTextColor={colors.muted} value={position} onChangeText={setPosition} style={styles.input} />
        <TextInput placeholder="Club / academy" placeholderTextColor={colors.muted} value={club} onChangeText={setClub} style={styles.input} />
        <TextInput placeholder="Bio" placeholderTextColor={colors.muted} value={bio} onChangeText={setBio} multiline style={[styles.input, styles.bio]} />
        <TouchableOpacity disabled={saving} style={styles.primaryButton} onPress={saveProfile}>
          <Text style={styles.primaryText}>{saving ? "Saving..." : "Save profile"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout} onPress={signOut}>
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  content: {
    padding: 18,
    paddingTop: 58,
    paddingBottom: 110,
  },
  hero: {
    alignItems: "center",
    padding: 18,
    borderRadius: 8,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
  },
  name: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 14,
  },
  meta: {
    color: colors.muted,
    textTransform: "capitalize",
    marginTop: 6,
  },
  stats: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  stat: {
    flex: 1,
    minWidth: 88,
    borderRadius: 8,
    backgroundColor: colors.panelSoft,
    paddingVertical: 12,
    alignItems: "center",
  },
  statValue: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  panel: {
    marginTop: 16,
    gap: 12,
  },
  panelTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  input: {
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  bio: {
    minHeight: 112,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
  primaryText: {
    color: colors.darkText,
    fontSize: 16,
    fontWeight: "900",
  },
  logout: {
    marginTop: 18,
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.4)",
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "900",
  },
});
