import { useCallback } from "react";
import { YoutubeVideoPlayer } from "@features/wiki/components/youtube-player";
import { router } from "expo-router";
import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { IconButton, Text, Card, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Compost() {
  const openCompostGuide = useCallback(() => {
    Linking.openURL(
      "https://buenosaires.gob.ar/espaciopublicoehigieneurbana/noticias/guia-de-compostaje-domiciliario"
    );
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor="#1B5E20"
          style={styles.backButton}
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>¿Cómo compostar?</Text>
      </View>
      <View style={styles.container}>
        <YoutubeVideoPlayer videoId={"w6iMpVUJD-8"} />
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={24}
                color="#1B5E20"
              />
              <Text style={styles.cardTitle}>
                Guía de Compostaje Domiciliario
              </Text>
            </View>
            <Text style={styles.cardDescription}>
              Aprende los primeros pasos para comenzar a compostar en casa.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={openCompostGuide}
              mode="contained"
              style={styles.cardButton}
            >
              Ver Guía
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="leaf" size={24} color="#1B5E20" />
              <Text style={styles.cardTitle}>Elementos Compostables</Text>
            </View>
            <Text style={styles.cardDescription}>
              Descubre qué materiales puedes agregar a tu compost.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => router.push("/wiki/compost/compostable-items")}
              mode="contained"
              style={styles.cardButton}
            >
              Ver Lista
            </Button>
          </Card.Actions>
        </Card>
        <Card style={[styles.card, styles.nonCompostableCard]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="close-circle"
                size={24}
                color="#D32F2F"
              />
              <Text style={[styles.cardTitle, styles.nonCompostableTitle]}>
                Elementos No Compostables
              </Text>
            </View>
            <Text style={styles.cardDescription}>
              Aprende qué materiales debes evitar en tu compost.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => router.push("/wiki/compost/non-compostable-items")}
              mode="contained"
              style={styles.nonCompostableButton}
            >
              Ver Lista
            </Button>
          </Card.Actions>
        </Card>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>¿Qué es el compost?</Text>
          <Text style={styles.infoText}>
            El compost es un abono natural utilizado como fertilizante de
            suelos, que aporta estructura, material orgánico y nutrientes al
            mismo, mejorando considerablemente las condiciones del suelo.
          </Text>
          <Text style={styles.sectionTitle}>
            ¿Qué sucede con el compost que se obtiene de la valorización de los
            restos verdes?
          </Text>
          <Text style={styles.infoText}>
            El compost obtenido del proceso es entregado a las empresas de
            mantenimiento de espacios verdes y áreas del Gobierno de la Ciudad
            que lo necesiten. Se utiliza para sembrar césped, en jardines, en
            canteros y en las huertas que tiene cada Centro. Para seguir
            consolidando la economía circular y mejorar los suelos de nuestras
            plazas y parques.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  backButton: {
    marginLeft: -8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    backgroundColor: "#E8F5E9",
  },
  nonCompostableCard: {
    backgroundColor: "#FFEBEE",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginLeft: 8,
  },
  nonCompostableTitle: {
    color: "#D32F2F",
  },
  cardDescription: {
    fontSize: 14,
    color: "#333",
  },
  cardButton: {
    marginTop: 8,
    backgroundColor: "#1B5E20",
  },
  nonCompostableButton: {
    marginTop: 8,
    backgroundColor: "#D32F2F",
  },
  infoContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  newsContainer: {
    padding: 16,
  },
  newsCard: {
    marginBottom: 16,
    backgroundColor: "#F1F8E9",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: "#333",
  },
  newsButton: {
    marginTop: 8,
  },
});
