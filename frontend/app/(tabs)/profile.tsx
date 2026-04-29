import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { LineChart } from "@/components/LineChart";
import { performanceLabels, performanceValues } from "@/constants/demoData";
import { colors, spacing } from "@/constants/theme";
import { useAuth } from "@/store/auth";

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const athleteName = user?.name || "Athlete";
  const sport = user?.sport || "Sport";
  const country = user?.country || "Country";

  return (
    <View style={styles.screen}>
      <View style={styles.topHeader}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="pencil-outline" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfoRow}>
          <Avatar name={athleteName} uri={user?.avatar} size={74} />
          <View style={styles.profileTextInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name} numberOfLines={1}>
                {athleteName}
              </Text>
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={styles.checkIcon} />
            </View>
            <Text style={styles.subName} numberOfLines={1}>
              - {sport} - {country}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Global Rank</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tournaments</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user?.following?.length || 86}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <View style={styles.chartCard}>
          <LineChart values={performanceValues} labels={performanceLabels} height={150} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.panel,
    flex: 1,
  },
  topHeader: {
    backgroundColor: colors.accent,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingBottom: 34,
    paddingHorizontal: spacing.lg,
    paddingTop: 70,
  },
  headerTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontFamily: "serif",
    fontSize: 32,
    fontWeight: "900",
  },
  profileInfoRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  profileTextInfo: {
    flex: 1,
    marginLeft: 18,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    color: "#FFFFFF",
    flexShrink: 1,
    fontFamily: "serif",
    fontSize: 24,
    fontWeight: "800",
  },
  checkIcon: {
    marginLeft: 6,
  },
  subName: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 112,
    paddingTop: 20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 72,
    padding: 10,
  },
  statValue: {
    color: colors.darkText,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  sectionTitle: {
    color: colors.darkText,
    fontFamily: "serif",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 14,
  },
  chartCard: {
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 28,
    padding: 18,
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    minHeight: 48,
    justifyContent: "center",
  },
  logoutButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: "800",
  },
});
