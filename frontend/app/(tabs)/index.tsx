import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { PostCard } from "@/components/PostCard";
import { colors } from "@/constants/theme";
import { api, Post } from "@/services/api";

const fallbackPosts: Post[] = [
  {
    _id: "demo-1",
    author: {
      _id: "u1",
      name: "Arjun Mehta",
      email: "arjun@scoutx.app",
      role: "athlete",
      sport: "Football",
      country: "India",
      city: "Mumbai",
      rating: 86,
      position: "Winger",
      club: "West Coast Academy",
    },
    caption: "U19 showcase: two progressive carries, one assist, and a clean weak-foot finish from the left channel.",
    sport: "Football",
    location: "Mumbai",
    tags: ["u19", "winger", "matchclip"],
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-2",
    author: {
      _id: "u2",
      name: "Maya Rao",
      email: "maya@scoutx.app",
      role: "scout",
      sport: "Basketball",
      country: "India",
      city: "Bengaluru",
      rating: 91,
      position: "Scout",
      club: "Southern Hoops",
    },
    caption: "Player to monitor: 6'2 guard with high release point, quick help-side reads, and strong transition pace.",
    sport: "Basketball",
    location: "Bengaluru",
    tags: ["prospect", "guard", "report"],
    likes: ["u1"],
    comments: [],
    createdAt: new Date().toISOString(),
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = useCallback(async () => {
    try {
      const response = await api<{ posts: Post[] }>("/posts");
      setPosts(response.posts.length ? response.posts : fallbackPosts);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadFeed().catch(() => setLoading(false));
  }, [loadFeed]);

  async function handleLike(id: string) {
    if (id.startsWith("demo")) {
      return;
    }

    const response = await api<{ post: Post }>(`/posts/${id}/like`, { method: "POST" });
    setPosts((current) => current.map((post) => (post._id === id ? response.post : post)));
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={posts}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl tintColor={colors.accent} refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadFeed().catch(() => setRefreshing(false)); }} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.kicker}>Live board</Text>
          <Text style={styles.title}>ScoutX Feed</Text>
          <Text style={styles.subtitle}>Match clips, reports, and prospect signals from your network.</Text>
        </View>
      }
      renderItem={({ item }) => <PostCard post={item} onLike={handleLike} />}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ink,
  },
  header: {
    marginBottom: 22,
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
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
});
