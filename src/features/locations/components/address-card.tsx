import type { Address } from "@models/address.type";
import type BottomSheet from "@gorhom/bottom-sheet";
import type { RefObject } from "react";
import { Card, TouchableRipple, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { colors } from "@constants/colors.constant";

export const AddressCard = ({
  address,
  centerMapOnAddress,
  bottomSheetRef,
}: {
  address: Address;
  centerMapOnAddress: (address: Address) => void;
  bottomSheetRef: RefObject<BottomSheet>;
}) => (
  <Card style={styles.addressCard} mode="elevated">
    <TouchableRipple
      onPress={() => {
        centerMapOnAddress(address);
        bottomSheetRef.current?.snapToIndex(0);
      }}
    >
      <Card.Content style={styles.addressCardContent}>
        <View style={styles.addressIconContainer}>
          <Text style={styles.addressIcon}>🏪</Text>
        </View>
        <View style={styles.addressTextContainer}>
          <Text variant="titleMedium" style={styles.addressTitle}>
            {address.displayName || "Tienda"}
          </Text>
          <Text variant="bodyMedium" style={styles.addressStreet}>
            {address.street}
          </Text>
          <Text variant="bodySmall" style={styles.addressSecondary}>
            {address.city}, {address.state}
          </Text>
        </View>
      </Card.Content>
    </TouchableRipple>
  </Card>
);

const styles = StyleSheet.create({
  addressCard: {
    backgroundColor: colors.gray[50],
    marginHorizontal: 2,
    marginVertical: 4,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  addressCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  addressIcon: {
    fontSize: 20,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressTitle: {
    fontWeight: "600",
    color: colors.gray[900],
    marginBottom: 2,
  },
  addressStreet: {
    color: colors.gray[700],
    marginBottom: 2,
  },
  addressSecondary: {
    color: colors.gray[600],
  },
});
