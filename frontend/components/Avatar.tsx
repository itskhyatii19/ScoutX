import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { mediaUrl } from "@/services/api";

type Props = {
  name: string;
  uri?: string;
  size?: number;
};

export function Avatar({ name, uri, size = 42 }: Props) {
  const source = mediaUrl(uri);

  if (source) {
    return <Image source={{ uri: source }} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} />;
  }

  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{name.slice(0, 2).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.panelSoft,
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
  initials: {
    color: colors.darkText,
    fontWeight: "900",
  },
});
