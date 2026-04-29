import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";

type Props = {
  values: number[];
  labels: string[];
  height?: number;
};

export function LineChart({ values, labels, height = 150 }: Props) {
  const [width, setWidth] = useState(1);

  const points = useMemo(
    () =>
      values.map((value, index) => ({
        x: values.length === 1 ? 0 : (index / (values.length - 1)) * width,
        y: (value / 100) * height,
        label: labels[index],
      })),
    [height, labels, values, width]
  );

  const segments = points.slice(1).map((point, index) => {
    const previous = points[index];
    const dx = point.x - previous.x;
    const dy = point.y - previous.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(-dy, dx);

    return {
      angle,
      bottom: previous.y,
      key: `${previous.label}-${point.label}`,
      left: previous.x,
      length,
    };
  });

  return (
    <View style={styles.wrap}>
      <View style={[styles.yAxis, { height }]}>
        {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
          <Text key={value} style={styles.axisLabel}>
            {value}
          </Text>
        ))}
      </View>
      <View style={styles.chartColumn}>
        <View
          style={[styles.plot, { height }]}
          onLayout={(event) => setWidth(Math.max(1, event.nativeEvent.layout.width - 8))}
        >
          {segments.map((segment) => (
            <View
              key={segment.key}
              style={[
                styles.segment,
                {
                  bottom: segment.bottom,
                  left: segment.left,
                  transform: [
                    { translateX: segment.length / 2 },
                    { rotate: `${segment.angle}rad` },
                    { translateX: -segment.length / 2 },
                  ],
                  width: segment.length,
                },
              ]}
            />
          ))}
          {points.map((point) => (
            <View key={point.label} style={[styles.point, { bottom: point.y, left: point.x }]} />
          ))}
        </View>
        <View style={styles.xAxis}>
          {labels.map((label) => (
            <Text key={label} style={styles.axisLabel}>
              {label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
  },
  yAxis: {
    borderRightColor: colors.line,
    borderRightWidth: 1,
    justifyContent: "space-between",
    paddingRight: 10,
    width: 36,
  },
  chartColumn: {
    flex: 1,
    paddingLeft: 12,
  },
  plot: {
    marginBottom: 8,
    position: "relative",
  },
  segment: {
    backgroundColor: colors.accent,
    height: 3,
    position: "absolute",
  },
  point: {
    backgroundColor: colors.accent,
    borderRadius: 3,
    height: 6,
    marginBottom: -3,
    marginLeft: -3,
    position: "absolute",
    width: 6,
  },
  xAxis: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  axisLabel: {
    color: colors.muted,
    fontSize: 10,
  },
});
