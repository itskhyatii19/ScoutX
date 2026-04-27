import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";
import { api } from "@/services/api";

export default function CreateScreen() {
  const [caption, setCaption] = useState("");
  const [sport, setSport] = useState("Football");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("trial, highlight");
  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function pickMedia() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 0.8,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  }

  async function publish() {
    try {
      setSubmitting(true);
      const form = new FormData();
      form.append("caption", caption);
      form.append("sport", sport);
      form.append("location", location);
      form.append("tags", tags);

      if (media) {
        form.append("media", {
          uri: media.uri,
          name: media.fileName || "scoutx-upload.jpg",
          type: media.mimeType || "image/jpeg",
        } as unknown as Blob);
      }

      await api("/posts", { method: "POST", body: form });
      setCaption("");
      setLocation("");
      setMedia(null);
      Alert.alert("Published", "Your ScoutX update is live.");
    } catch (error) {
      Alert.alert("Upload failed", error instanceof Error ? error.message : "Try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>Upload</Text>
      <Text style={styles.title}>Create report</Text>

      <TouchableOpacity style={styles.dropzone} onPress={pickMedia}>
        {media ? (
          <Image source={{ uri: media.uri }} style={styles.preview} />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={34} color={colors.accent} />
            <Text style={styles.dropTitle}>Add match clip or image</Text>
            <Text style={styles.dropCopy}>Attach a highlight, trial photo, or scouting visual.</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput
          placeholder="Write a scouting note"
          placeholderTextColor={colors.muted}
          value={caption}
          onChangeText={setCaption}
          multiline
          style={[styles.input, styles.textArea]}
        />
        <TextInput placeholder="Sport" placeholderTextColor={colors.muted} value={sport} onChangeText={setSport} style={styles.input} />
        <TextInput placeholder="Location" placeholderTextColor={colors.muted} value={location} onChangeText={setLocation} style={styles.input} />
        <TextInput placeholder="Tags, comma separated" placeholderTextColor={colors.muted} value={tags} onChangeText={setTags} style={styles.input} />
        <TouchableOpacity disabled={submitting || !caption.trim()} style={[styles.primaryButton, (!caption.trim() || submitting) && styles.disabled]} onPress={publish}>
          <Text style={styles.primaryText}>{submitting ? "Publishing..." : "Publish"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  dropzone: {
    minHeight: 210,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    marginBottom: 16,
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: 230,
    borderRadius: 8,
  },
  dropTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 12,
  },
  dropCopy: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
  form: {
    gap: 12,
  },
  input: {
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    minHeight: 124,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
  disabled: {
    opacity: 0.45,
  },
  primaryText: {
    color: colors.darkText,
    fontSize: 16,
    fontWeight: "900",
  },
});
