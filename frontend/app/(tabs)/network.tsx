import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { networkUsers } from "@/constants/demoData";
import { colors, spacing } from "@/constants/theme";
import { api, User } from "@/services/api";

const TABS = ["Discover", "Connections", "Messages"];

export default function NetworkScreen() {
  const [activeTab, setActiveTab] = useState("Discover");
  const [profiles, setProfiles] = useState<User[]>(networkUsers);

  useEffect(() => {
    let mounted = true;

    api<{ users: User[] }>("/profile/discover")
      .then((response) => {
        if (mounted && response.users.length) {
          setProfiles(response.users);
        }
      })
      .catch(() => {
        if (mounted) {
          setProfiles(networkUsers);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visibleProfiles = activeTab === "Discover" ? profiles : networkUsers.slice(0, 3);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Network</Text>

        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.list}>
          {visibleProfiles.map((user) => (
            <View key={user._id} style={styles.userCard}>
              <Avatar name={user.name} uri={user.avatar} size={48} />
              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user.name}
                </Text>
                <Text style={styles.userDetails} numberOfLines={1}>
                  {user.position || user.role} - {user.sport}
                </Text>
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
    backgroundColor: colors.panel,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 112,
    paddingTop: 70,
  },
  headerTitle: {
    color: colors.darkText,
    fontFamily: "serif",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 18,
  },
  tabContainer: {
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 16,
    padding: 4,
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 6,
    flex: 1,
    paddingVertical: 9,
  },
  activeTabButton: {
    backgroundColor: colors.panel,
  },
  tabText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: colors.darkText,
    fontWeight: "800",
  },
  list: {
    gap: 14,
  },
  userCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 72,
    padding: 14,
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 10,
  },
  userName: {
    color: colors.darkText,
    fontFamily: "serif",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  userDetails: {
    color: colors.muted,
    fontSize: 13,
    textTransform: "capitalize",
  },
  followButton: {
    backgroundColor: colors.accent,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
