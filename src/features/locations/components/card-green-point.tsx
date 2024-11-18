import { colors } from "@constants/colors.constant";
import type BottomSheet from "@gorhom/bottom-sheet";
import type { TransformedGreenPoint } from "@models/greenPoint.type";
import type { RefObject } from "react";
import { StyleSheet, View } from "react-native";
import { Card, TouchableRipple, Text, Chip } from "react-native-paper";

type GreenPointProps = {
  marker: TransformedGreenPoint;
  centerMapOnMarker: (marker: TransformedGreenPoint) => void;
  bottomSheetRef: RefObject<BottomSheet>;
  selectedMarker: TransformedGreenPoint | null;
};

export const GreenPoint = ({
  marker,
  centerMapOnMarker,
  bottomSheetRef,
  selectedMarker,
}: GreenPointProps) => {
  return (
    <TouchableRipple
      onPress={() => {
        centerMapOnMarker(marker);
        bottomSheetRef.current?.snapToIndex(0);
      }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={[
              styles.title,
              selectedMarker === marker && styles.selectedCardTitle,
            ]}
          >
            {marker.title}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {marker.description}
          </Text>
          <View style={styles.chipContainer}>
            <Chip
              icon="clock-outline"
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {marker.availability}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    backgroundColor: colors.green[50],
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  selectedCardTitle: {
    color: colors.green[500],
  },
  description: {
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: colors.green[100],
  },
  chipText: {
    fontSize: 12,
  },
});
