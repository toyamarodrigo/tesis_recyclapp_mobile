import { View, StyleSheet, Linking } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Card, Text, IconButton } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { Fragment } from "react";
import type { Result } from "@models/news";

const NewsDetail = () => {
  const { newsItem } = useLocalSearchParams();
  const selectedNews = JSON.parse(newsItem as string) as Result;

  return (
    <Fragment>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="../" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
      </View>
      <View style={styles.modalImageContainer}>
        <Card.Cover
          source={{ uri: selectedNews.image_url || "" }}
          style={styles.modalImage}
        />
      </View>
      <View style={styles.modalContent}>
        <Text variant="headlineSmall" style={styles.modalTitle}>
          {selectedNews.title}
        </Text>
        <Text variant="bodyMedium" style={styles.modalDescription}>
          {selectedNews.description}
        </Text>
        <Text
          variant="bodyMedium"
          style={styles.modalSource}
          onPress={() => Linking.openURL(selectedNews.link)}
        >
          Articulo completo en{" "}
          <Text style={styles.modalSourceLink}>{selectedNews.link}</Text>
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
  modalSourceLink: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationColor: colors.green[700],
  },
});

export default NewsDetail;
