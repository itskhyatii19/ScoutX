import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";

const alerts = [
  { icon: "eye-outline", title: "Profile viewed", copy: "Deccan Prospects opened your winger report." },
  { icon: "flame-outline", title: "Clip trending", copy: "Your last highlight is gaining attention in Football U19." },
  { icon: "mail-outline", title: "Scout message", copy: "Southern Hoops asked for your latest tournament schedule." },
];

export default function MessagesScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>Signals</Text>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.list}>
        {alerts.map((alert) => (
          <View key={alert.title} style={styles.alert}>
            <View style={styles.icon}>
              <Ionicons name={alert.icon as any} size={22} color={colors.darkText} />
            </View>
            <View style={styles.alertText}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertCopy}>{alert.copy}</Text>
            </View>
          </View>
        ))}
      </View>
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
    marginBottom: 20,
  },
  list: {
    gap: 12,
  },
  alert: {
    flexDirection: "row",
    gap: 14,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
  },
  alertCopy: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 20,
  },
});
