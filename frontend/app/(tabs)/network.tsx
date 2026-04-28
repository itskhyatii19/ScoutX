import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/constants/theme";

const TABS = ["Discover", "Connections", "Messages"];

const NETWORK_USERS = [
  { id: "1", name: "Marcus Aurelius", role: "Coach", sport: "Basketball", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "2", name: "Serena Vance", role: "Athlete", sport: "Tennis", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: "3", name: "David Chen", role: "Scout", sport: "Football", image: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: "4", name: "Elena Rostova", role: "Athlete", sport: "Athletics", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: "5", name: "Michael Phelps Jr.", role: "Athlete", sport: "Swimming", image: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: "6", name: "James Harden", role: "Athlete", sport: "Basketball", image: "https://randomuser.me/api/portraits/men/11.jpg" },
];

export default function NetworkScreen() {
  const [activeTab, setActiveTab] = useState("Discover");

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.headerTitle}>Network</Text>

        {/* Custom Tabs */}
        <View style={styles.tabContainer}>
          {TABS.map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* User List */}
        <View style={styles.list}>
          {NETWORK_USERS.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <Image source={{ uri: user.image }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userDetails}>{user.role} • {user.sport}</Text>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.panel,
  },
  content: {
    padding: spacing.lg,
    paddingTop: 60,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.darkText,
    fontFamily: "serif",
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: colors.panel,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
  },
  activeTabText: {
    color: colors.darkText,
    fontWeight: "700",
  },
  list: {
    gap: 16,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E1E1E1",
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.darkText,
    fontFamily: "serif",
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 13,
    color: colors.muted,
  },
  followButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
