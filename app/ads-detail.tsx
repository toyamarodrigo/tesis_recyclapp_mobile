import { View, StyleSheet, Linking } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Card, Text, IconButton } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { Fragment } from "react";
import type { Ad } from "@models/advertisement.type";

const NewsDetail = () => {
  const { adItem } = useLocalSearchParams();
  const selectedAd = JSON.parse(adItem as string) as Ad;
  const isPresented = router.canGoBack();

  return (
    <Fragment>
      <View style={styles.modalImageContainer}>
        <Card.Cover
          source={{ uri: selectedAd.image }}
          style={styles.modalImage}
        />
        {!isPresented && (
          <Link href="../">
            <IconButton
              icon="close"
              iconColor={colors.gray[50]}
              size={24}
              onPress={() => router.back()}
              style={styles.closeIcon}
            />
          </Link>
        )}
      </View>
      <View style={styles.modalContent}>
        <Text variant="headlineSmall" style={styles.modalTitle}>
          {selectedAd.text}
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
});

export default NewsDetail;
