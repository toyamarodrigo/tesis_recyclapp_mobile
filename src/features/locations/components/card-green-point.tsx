import { colors } from "@constants/colors.constant";
import type BottomSheet from "@gorhom/bottom-sheet";
import type { RefObject } from "react";
import { StyleSheet } from "react-native";
import { Card, TouchableRipple } from "react-native-paper";

type GreenPoint = {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
};

type GreenPointProps = {
  marker: GreenPoint;
  centerMapOnMarker: (marker: GreenPoint) => void;
  bottomSheetRef: RefObject<BottomSheet>;
  selectedMarker: GreenPoint | null;
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
        <Card.Title
          title={marker.title}
          subtitle={marker.description}
          titleStyle={
            selectedMarker === marker ? styles.selectedCardTitle : undefined
          }
        />
      </Card>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  selectedCardTitle: {
    color: colors.green[500],
    fontWeight: "bold",
  },
});
