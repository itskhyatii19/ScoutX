import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/constants/theme";

export default function InsightsScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.headerTitle}>Insights</Text>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" style={styles.uploadIcon} />
          <Text style={styles.uploadButtonText}>Upload performance video</Text>
        </TouchableOpacity>

        {/* Performance Trend */}
        <Text style={styles.sectionTitle}>Performance Trend</Text>
        <View style={styles.chartCard}>
          {/* Mock Chart Area */}
          <View style={styles.chartMock}>
            <View style={styles.yAxis}>
              {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map(val => (
                <Text key={val} style={styles.axisLabel}>{val}</Text>
              ))}
            </View>
            <View style={styles.chartContent}>
              <View style={styles.chartLine}>
                {/* SVG Mocking a line chart or just a placeholder shape */}
                <View style={[styles.dataPoint, { bottom: "50%", left: "0%" }]} />
                <View style={[styles.dataLine, { bottom: "58%", left: "0%", width: "22%", transform: [{ rotate: "-20deg" }] }]} />
                
                <View style={[styles.dataPoint, { bottom: "66%", left: "20%" }]} />
                <View style={[styles.dataLine, { bottom: "63%", left: "20%", width: "22%", transform: [{ rotate: "10deg" }] }]} />
                
                <View style={[styles.dataPoint, { bottom: "61%", left: "40%" }]} />
                <View style={[styles.dataLine, { bottom: "71%", left: "40%", width: "22%", transform: [{ rotate: "-30deg" }] }]} />
                
                <View style={[styles.dataPoint, { bottom: "81%", left: "60%" }]} />
                <View style={[styles.dataLine, { bottom: "78%", left: "60%", width: "22%", transform: [{ rotate: "10deg" }] }]} />
                
                <View style={[styles.dataPoint, { bottom: "76%", left: "80%" }]} />
                <View style={[styles.dataLine, { bottom: "83%", left: "80%", width: "22%", transform: [{ rotate: "-25deg" }] }]} />
                
                <View style={[styles.dataPoint, { bottom: "91%", left: "100%" }]} />
              </View>
              <View style={styles.xAxis}>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(month => (
                  <Text key={month} style={styles.axisLabel}>{month}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* AI Analysis */}
        <Text style={styles.sectionTitle}>AI Analysis</Text>
        <View style={styles.analysisCard}>
          <View style={styles.analysisItem}>
            <View style={[styles.analysisIconContainer, { backgroundColor: colors.successBackground }]}>
              <Ionicons name="arrow-up" size={18} color={colors.accent} />
            </View>
            <View style={styles.analysisTextContainer}>
              <Text style={styles.analysisItemTitle}>Strengths</Text>
              <Text style={styles.analysisItemText}>Explosive acceleration in first 10m.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.analysisItem}>
            <View style={[styles.analysisIconContainer, { backgroundColor: colors.dangerBackground }]}>
              <Ionicons name="arrow-down" size={18} color={colors.danger} />
            </View>
            <View style={styles.analysisTextContainer}>
              <Text style={styles.analysisItemTitle}>Weaknesses</Text>
              <Text style={styles.analysisItemText}>Arm drive consistency drops after 30m.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.analysisItem}>
            <View style={[styles.analysisIconContainer, { backgroundColor: colors.infoBackground }]}>
              <Ionicons name="information" size={20} color="#B8860B" />
            </View>
            <View style={styles.analysisTextContainer}>
              <Text style={styles.analysisItemTitle}>Suggestions</Text>
              <Text style={styles.analysisItemText}>Focus on core stability drills to maintain form.</Text>
            </View>
          </View>
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
  uploadButton: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    marginBottom: 32,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadIcon: {
    marginRight: 12,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.darkText,
    fontFamily: "serif",
    marginBottom: 16,
  },
  chartCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  chartMock: {
    flexDirection: "row",
    height: 200,
  },
  yAxis: {
    justifyContent: "space-between",
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: colors.line,
  },
  axisLabel: {
    fontSize: 10,
    color: colors.muted,
  },
  chartContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "flex-end",
  },
  chartLine: {
    flex: 1,
    position: "relative",
    marginBottom: 10,
  },
  dataPoint: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginLeft: -3,
    marginBottom: -3,
    zIndex: 2,
  },
  dataLine: {
    position: "absolute",
    height: 2,
    backgroundColor: colors.accent,
    transformOrigin: "left center",
    zIndex: 1,
  },
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
  },
  analysisCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  analysisItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  analysisIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  analysisTextContainer: {
    flex: 1,
  },
  analysisItemTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.darkText,
    marginBottom: 4,
  },
  analysisItemText: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 12,
  },
});
