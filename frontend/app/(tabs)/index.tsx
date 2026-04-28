import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <View style={styles.nameRow}>
              <Text style={styles.name}>Athlete</Text>
              <Ionicons name="checkmark-circle" size={20} color={colors.accent} style={{ marginLeft: 6, marginTop: 4 }} />
            </View>
          </View>
          <View style={styles.rankBadge}>
            <Text style={styles.rankNumber}>#4</Text>
            <Text style={styles.rankLabel}>Global</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="pulse" size={24} color={colors.accent} />
            <Text style={styles.statValue}>24h</Text>
            <Text style={styles.statLabel}>Training</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="ribbon-outline" size={24} color={colors.accent} />
            <Text style={styles.statValue}>78%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={24} color={colors.accent} />
            <Text style={styles.statValue}>+12</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Insight of the Day */}
        <Text style={styles.sectionTitle}>Insight of the Day</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Ionicons name="flash" size={20} color={colors.accent} />
          </View>
          <Text style={styles.insightText}>
            Your sprint mechanics show a 5% improvement in the first 10 meters compared to last month.
          </Text>
        </View>

        {/* Recommended for you */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendedScroll}>
          <View style={styles.recommendedCard}>
            <View style={[styles.recommendedImage, { backgroundColor: "#E0A96D" }]} />
            <View style={styles.recommendedInfo}>
              <Text style={styles.recommendedCategory}>Tennis</Text>
              <Text style={styles.recommendedTitle}>Global Tennis Open</Text>
              <Text style={styles.recommendedSubtitle}>Oct 15-20, 2025 • France</Text>
            </View>
          </View>
          <View style={styles.recommendedCard}>
            <View style={[styles.recommendedImage, { backgroundColor: "#8A3324" }]} />
            <View style={styles.recommendedInfo}>
              <Text style={styles.recommendedCategory}>Athletics</Text>
              <Text style={styles.recommendedTitle}>International Track...</Text>
              <Text style={styles.recommendedSubtitle}>Nov 2-5, 2025 • Germany</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
      </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  greeting: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: colors.darkText,
    fontSize: 32,
    fontWeight: "900",
    fontFamily: "serif", // Matching the bold serif from screenshot
  },
  rankBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.panel,
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.darkText,
  },
  rankLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.darkText,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.darkText,
    fontFamily: "serif",
  },
  seeAll: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  insightCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  insightIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.panel,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: colors.darkText,
    lineHeight: 22,
    fontWeight: "500",
  },
  recommendedScroll: {
    paddingRight: 20,
  },
  recommendedCard: {
    width: 280,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  recommendedImage: {
    height: 140,
    width: "100%",
  },
  recommendedInfo: {
    padding: 16,
  },
  recommendedCategory: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.darkText,
    marginBottom: 6,
    fontFamily: "serif",
  },
  recommendedSubtitle: {
    fontSize: 13,
    color: colors.muted,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
