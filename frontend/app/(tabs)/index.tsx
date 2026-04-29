import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { tournaments } from "@/constants/demoData";
import { colors, spacing } from "@/constants/theme";
import { useAuth } from "@/store/auth";

export default function HomeScreen() {
  const { user } = useAuth();
  const athleteName = user?.name || "Athlete";

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerNameBlock}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <View style={styles.nameRow}>
              <Text style={styles.name} numberOfLines={1}>
                {athleteName}
              </Text>
              <Ionicons name="checkmark-circle" size={18} color={colors.accent} style={styles.checkIcon} />
            </View>
          </View>
          <View style={styles.rankBadge}>
            <Text style={styles.rankNumber}>#4</Text>
            <Text style={styles.rankLabel}>Global</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="pulse-outline" size={24} color={colors.accent} />
            <Text style={styles.statValue}>24h</Text>
            <Text style={styles.statLabel}>Training</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="ribbon-outline" size={24} color={colors.accent} />
            <Text style={styles.statValue}>78%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trending-up-outline" size={24} color={colors.accent} />
            <Text style={styles.statValue}>+12</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Insight of the Day</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Ionicons name="flash-outline" size={22} color={colors.accent} />
          </View>
          <Text style={styles.insightText}>
            Your sprint mechanics show a 5% improvement in the first 10 meters compared to last month.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendedScroll}>
          {tournaments.map((item) => (
            <View key={item.id} style={styles.recommendedCard}>
              <Image source={{ uri: item.image }} style={styles.recommendedImage} />
              <View style={styles.recommendedInfo}>
                <Text style={styles.recommendedCategory}>{item.category}</Text>
                <Text style={styles.recommendedTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.recommendedSubtitle} numberOfLines={1}>
                  {item.dates} - {item.location}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="chatbubble-outline" size={28} color="#FFFFFF" />
      </TouchableOpacity>
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
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerNameBlock: {
    flex: 1,
    paddingRight: 14,
  },
  greeting: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    color: colors.darkText,
    flexShrink: 1,
    fontFamily: "serif",
    fontSize: 30,
    fontWeight: "900",
  },
  checkIcon: {
    marginLeft: 6,
    marginTop: 3,
  },
  rankBadge: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.softBorder,
    borderRadius: 32,
    borderWidth: 1,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  rankNumber: {
    color: colors.darkText,
    fontSize: 18,
    fontWeight: "800",
  },
  rankLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    minHeight: 98,
    justifyContent: "center",
    padding: 12,
  },
  statValue: {
    color: colors.darkText,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
    marginTop: 8,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "500",
  },
  sectionHeader: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 30,
  },
  sectionTitle: {
    color: colors.darkText,
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "800",
  },
  seeAll: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  insightCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 16,
    minHeight: 84,
    padding: 14,
  },
  insightIconContainer: {
    alignItems: "center",
    backgroundColor: colors.successBackground,
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginRight: 16,
    width: 48,
  },
  insightText: {
    color: colors.darkText,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  recommendedScroll: {
    paddingRight: 20,
  },
  recommendedCard: {
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 16,
    overflow: "hidden",
    width: 232,
  },
  recommendedImage: {
    height: 108,
    resizeMode: "cover",
    width: "100%",
  },
  recommendedInfo: {
    padding: 14,
  },
  recommendedCategory: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  recommendedTitle: {
    color: colors.darkText,
    fontFamily: "serif",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  recommendedSubtitle: {
    color: colors.muted,
    fontSize: 12,
  },
  fab: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 30,
    bottom: 92,
    height: 60,
    justifyContent: "center",
    position: "absolute",
    right: 24,
    width: 60,
  },
});
