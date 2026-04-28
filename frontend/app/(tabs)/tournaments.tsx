import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/constants/theme";

const CATEGORIES = ["All", "Tennis", "Athletics", "Basketball", "Swimming"];

const TOURNAMENTS = [
  {
    id: "1",
    category: "Tennis",
    title: "Global Tennis Open",
    dates: "Oct 15-20, 2025",
    location: "France",
    badge: "Elite",
    color: "#E0A96D",
  },
  {
    id: "2",
    category: "Athletics",
    title: "International Track Meet",
    dates: "Nov 2-5, 2025",
    location: "Germany",
    badge: "Pro",
    color: "#8A3324",
  },
];

export default function TournamentsScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.headerTitle}>Tournaments</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, locations..."
            placeholderTextColor={colors.muted}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryChipText, activeCategory === cat && styles.categoryChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tournament Cards */}
        <View style={styles.list}>
          {TOURNAMENTS.map((t) => (
            <View key={t.id} style={styles.card}>
              <View style={[styles.cardImage, { backgroundColor: t.color }]} />
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.category}>{t.category}</Text>
                  <Text style={styles.badge}>{t.badge}</Text>
                </View>
                <Text style={styles.title}>{t.title}</Text>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={14} color={colors.muted} />
                  <Text style={styles.detailText}>{t.dates}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={14} color={colors.muted} />
                  <Text style={styles.detailText}>{t.location}</Text>
                </View>
              </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.darkText,
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  categoryChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryChipText: {
    color: colors.darkText,
    fontSize: 14,
    fontWeight: "600",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  list: {
    gap: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  cardImage: {
    height: 160,
    width: "100%",
  },
  cardInfo: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  category: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "700",
  },
  badge: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.darkText,
    fontFamily: "serif",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    color: colors.muted,
    fontSize: 14,
    marginLeft: 6,
  },
});
