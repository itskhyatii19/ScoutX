import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { colors } from "@/constants/theme";
import { api, User } from "@/services/api";

const demoProfiles: User[] = [
  { _id: "1", name: "Noah Fernandes", email: "noah@scoutx.app", role: "athlete", sport: "Football", country: "India", city: "Goa", rating: 84, position: "CM", club: "Salcete FC" },
  { _id: "2", name: "Isha Kapoor", email: "isha@scoutx.app", role: "athlete", sport: "Cricket", country: "India", city: "Delhi", rating: 88, position: "All-rounder", club: "North Zone Elite" },
  { _id: "3", name: "Dev Sharma", email: "dev@scoutx.app", role: "scout", sport: "Football", country: "India", city: "Pune", rating: 92, position: "Scout", club: "Deccan Prospects" },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState<User[]>(demoProfiles);

  useEffect(() => {
    const handle = setTimeout(async () => {
      try {
        const response = await api<{ users: User[] }>(`/profile/discover?q=${encodeURIComponent(query)}`);
        setProfiles(response.users.length ? response.users : demoProfiles);
      } catch (_error) {
        setProfiles(demoProfiles.filter((profile) => profile.name.toLowerCase().includes(query.toLowerCase()) || profile.sport.toLowerCase().includes(query.toLowerCase())));
      }
    }, 250);

    return () => clearTimeout(handle);
  }, [query]);

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>Discover</Text>
      <Text style={styles.title}>Find talent</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" color={colors.muted} size={20} />
        <TextInput
          placeholder="Search players, scouts, clubs"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
      </View>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.profile}>
            <Avatar name={item.name} uri={item.avatar} size={48} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.position || item.role} · {item.sport} · {item.city || item.country}</Text>
            </View>
            <View style={styles.score}>
              <Text style={styles.scoreText}>{item.rating}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ink,
    padding: 18,
    paddingTop: 58,
  },
  kicker: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 18,
  },
  searchBox: {
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  list: {
    paddingTop: 18,
    gap: 12,
    paddingBottom: 110,
  },
  profile: {
    backgroundColor: colors.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  meta: {
    color: colors.muted,
    marginTop: 4,
    textTransform: "capitalize",
  },
  score: {
    minWidth: 44,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    backgroundColor: colors.accent,
  },
  scoreText: {
    color: colors.darkText,
    fontWeight: "900",
  },
});
