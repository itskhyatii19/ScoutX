import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "@/components/LineChart";
import { performanceLabels, performanceValues } from "@/constants/demoData";
import { colors, spacing } from "@/constants/theme";
import { api } from "@/services/api";

export default function InsightsScreen() {
  const [uploading, setUploading] = useState(false);

  async function uploadPerformanceVideo() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos", "images"],
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    try {
      setUploading(true);
      const media = result.assets[0];
      const form = new FormData();

      form.append("caption", "Performance video uploaded for AI analysis.");
      form.append("sport", "Athletics");
      form.append("location", "Training");
      form.append("tags", "performance, analysis");
      form.append("media", {
        uri: media.uri,
        name: media.fileName || "performance-upload.mp4",
        type: media.mimeType || "video/mp4",
      } as unknown as Blob);

      await api("/posts", { method: "POST", body: form });
      Alert.alert("Uploaded", "Your performance video is ready for analysis.");
    } catch (error) {
      Alert.alert("Upload failed", error instanceof Error ? error.message : "Try again");
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Insights</Text>

        <TouchableOpacity disabled={uploading} style={[styles.uploadButton, uploading && styles.disabled]} onPress={uploadPerformanceVideo}>
          <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" style={styles.uploadIcon} />
          <Text style={styles.uploadButtonText}>{uploading ? "Uploading..." : "Upload performance video"}</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Performance Trend</Text>
        <View style={styles.chartCard}>
          <LineChart values={performanceValues} labels={performanceLabels} height={160} />
        </View>

        <Text style={styles.sectionTitle}>AI Analysis</Text>
        <View style={styles.analysisCard}>
          <AnalysisRow
            icon="arrow-up"
            iconColor={colors.accent}
            iconBackground={colors.successBackground}
            title="Strengths"
            text="Explosive acceleration in first 10m."
          />
          <View style={styles.divider} />
          <AnalysisRow
            icon="arrow-down"
            iconColor={colors.danger}
            iconBackground={colors.dangerBackground}
            title="Weaknesses"
            text="Arm drive consistency drops after 30m."
          />
          <View style={styles.divider} />
          <AnalysisRow
            icon="information"
            iconColor="#B8860B"
            iconBackground={colors.infoBackground}
            title="Suggestions"
            text="Focus on core stability drills to maintain form."
          />
        </View>
      </ScrollView>
    </View>
  );
}

type AnalysisRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBackground: string;
  iconColor: string;
  text: string;
  title: string;
};

function AnalysisRow({ icon, iconBackground, iconColor, text, title }: AnalysisRowProps) {
  return (
    <View style={styles.analysisItem}>
      <View style={[styles.analysisIconContainer, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.analysisTextContainer}>
        <Text style={styles.analysisItemTitle}>{title}</Text>
        <Text style={styles.analysisItemText}>{text}</Text>
      </View>
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
  uploadButton: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    minHeight: 52,
  },
  disabled: {
    opacity: 0.6,
  },
  uploadIcon: {
    marginRight: 10,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  sectionTitle: {
    color: colors.darkText,
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
  chartCard: {
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 30,
    padding: 18,
  },
  analysisCard: {
    backgroundColor: colors.card,
    borderColor: colors.softBorder,
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
  },
  analysisItem: {
    alignItems: "flex-start",
    flexDirection: "row",
    paddingVertical: 2,
  },
  analysisIconContainer: {
    alignItems: "center",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    marginRight: 16,
    width: 36,
  },
  analysisTextContainer: {
    flex: 1,
  },
  analysisItemTitle: {
    color: colors.darkText,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  analysisItemText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    backgroundColor: colors.softBorder,
    height: 1,
    marginVertical: 14,
  },
});
