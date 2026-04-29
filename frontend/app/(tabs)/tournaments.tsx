import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { tournaments } from "@/constants/demoData";
import { colors, spacing } from "@/constants/theme";

const CATEGORIES = ["All", "Tennis", "Athletics", "Basketball", "Swimming", "Cricket"];

export default function TournamentsScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const visibleTournaments = useMemo(
    () =>
      tournaments.filter((tournament) => {
        const matchesCategory = activeCategory === "All" || tournament.category === activeCategory;
        const queryText = query.trim().toLowerCase();
        const matchesQuery =
          !queryText ||
          tournament.title.toLowerCase().includes(queryText) ||
          tournament.location.toLowerCase().includes(queryText) ||
          tournament.category.toLowerCase().includes(queryText);

        return matchesCategory && matchesQuery;
      }),
    [activeCategory, query]
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Tournaments</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={colors.muted} style={styles.searchIcon} />
          <TextInput
            placeholder="Search events, locations..."
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, activeCategory === category && styles.categoryChipActive]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[styles.categoryChipText, activeCategory === category && styles.categoryChipTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.list}>
          {visibleTournaments.map((tournament) => (
            <View key={tournament.id} style={styles.card}>
              <Image source={{ uri: tournament.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.category}>{tournament.category}</Text>
                  <Text style={styles.badge}>{tournament.badge}</Text>
                </View>
                <Text style={styles.title}>{tournament.title}</Text>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={15} color={colors.muted} />
                  <Text style={styles.detailText}>{tournament.dates}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={15} color={colors.muted} />
                  <Text style={styles.detailText}>{tournament.location}</Text>
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
    marginBottom: 20,
  },
  searchContainer: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    height: 48,
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    color: colors.darkText,
    flex: 1,
    fontSize: 16,
  },
  categoriesScroll: {
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryChipText: {
    color: colors.darkText,
    fontSize: 13,
    fontWeight: "600",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardImage: {
    height: 124,
    resizeMode: "cover",
    width: "100%",
  },
  cardInfo: {
    padding: 14,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  category: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
  },
  badge: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    color: colors.darkText,
    fontFamily: "serif",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 10,
  },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  detailText: {
    color: colors.muted,
    fontSize: 14,
    marginLeft: 6,
  },
});
