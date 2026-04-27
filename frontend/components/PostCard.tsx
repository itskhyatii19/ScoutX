import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { colors } from "@/constants/theme";
import { mediaUrl, Post } from "@/services/api";

type Props = {
  post: Post;
  onLike?: (id: string) => void;
};

export function PostCard({ post, onLike }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar name={post.author.name} uri={post.author.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{post.author.name}</Text>
          <Text style={styles.meta}>
            {post.author.position || post.author.role} · {post.sport}
          </Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{post.author.rating}</Text>
        </View>
      </View>

      <Text style={styles.caption}>{post.caption}</Text>

      {post.mediaUrl ? <Image source={{ uri: mediaUrl(post.mediaUrl) }} style={styles.media} /> : <View style={styles.analysisPanel}>
        <Text style={styles.analysisKicker}>Scout note</Text>
        <Text style={styles.analysisText}>Explosive first step, composed under pressure, strong final-third awareness.</Text>
      </View>}

      <View style={styles.tags}>
        {(post.tags || []).slice(0, 3).map((tag) => (
          <Text key={tag} style={styles.tag}>#{tag}</Text>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => onLike?.(post._id)}>
          <Ionicons name="flame-outline" size={20} color={colors.accent} />
          <Text style={styles.actionText}>{post.likes?.length || 0}</Text>
        </TouchableOpacity>
        <View style={styles.action}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.muted} />
          <Text style={styles.actionText}>{post.comments?.length || 0}</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="location-outline" size={20} color={colors.muted} />
          <Text style={styles.actionText}>{post.location || "Remote"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderRadius: 8,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  meta: {
    color: colors.muted,
    marginTop: 2,
    textTransform: "capitalize",
  },
  rating: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    minWidth: 42,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  ratingText: {
    color: colors.darkText,
    fontWeight: "900",
  },
  caption: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  media: {
    height: 220,
    borderRadius: 8,
    backgroundColor: colors.panelSoft,
  },
  analysisPanel: {
    minHeight: 128,
    borderRadius: 8,
    padding: 16,
    justifyContent: "flex-end",
    backgroundColor: "#20372d",
  },
  analysisKicker: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  analysisText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    color: colors.accent,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 12,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "38%",
  },
  actionText: {
    color: colors.muted,
    fontWeight: "700",
  },
});
