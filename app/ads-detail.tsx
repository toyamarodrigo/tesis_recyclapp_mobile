import { View, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Card, Text, IconButton } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { Fragment } from "react";
import type { Advertisement } from "@models/advertisement.type";

const NewsDetail = () => {
  const { adItem } = useLocalSearchParams();
  const selectedAd = JSON.parse(adItem as string) as Advertisement;

  return (
    <Fragment>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="../" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
      </View>
      <View style={styles.modalImageContainer}>
        <Card.Cover
          source={{ uri: selectedAd.image }}
          style={styles.modalImage}
        />
      </View>
      <View style={styles.modalContent}>
        <Text variant="titleLarge" style={styles.modalTitle}>
          {selectedAd.title}
        </Text>
        <Text variant="bodyMedium" style={styles.modalTitle}>
          {selectedAd.text}
        </Text>
      </View>
      <View style={styles.modalFooter}>
        <Text variant="bodySmall" style={styles.modalTitle}>
          {selectedAd.displayName}
        </Text>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalImageContainer: {
    height: "40%",
    width: "100%",
    position: "relative",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    resizeMode: "cover",
  },
  closeIcon: {
    position: "absolute",
    top: 4,
    left: 4,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.green[700],
  },
  modalDescription: {
    marginBottom: 15,
  },
  modalExtraDescription: {
    marginBottom: 20,
    fontStyle: "italic",
  },
  modalSource: {
    marginTop: 20,
    color: colors.green[700],
    fontWeight: "bold",
  },
  modalFooter: {
    padding: 20,
  },
});

export default NewsDetail;
