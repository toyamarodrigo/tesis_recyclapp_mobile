import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Modal, TouchableOpacity } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import Carousel, { type ICarouselInstance } from "react-native-reanimated-carousel";
import { colors } from "@constants/colors.constant";
// Remove the Pagination import

// Mock data for ads with real image examples
const ads = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    description: "¡Reciclá tus plásticos y salvá el océano!",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    description: "Aprendé a hacer compost en casa",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807",
    description: "Unite a nuestro programa de reciclaje comunitario",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a",
    description: "Reducí tu huella de carbono con estos consejos",
  },
];

// Mock data for news with real image examples
const news = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9",
    title: "Nuevo Centro de Reciclaje Abre sus Puertas",
    description:
      "Un centro de reciclaje de última generación ha abierto en la ciudad, aumentando la capacidad de reciclaje en un 50%.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1585058558534-57f2270ff7e4",
    title: "Taller de Compostaje este Fin de Semana",
    description:
      "Aprendé los conceptos básicos del compostaje en nuestro taller gratuito este sábado.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1610800082176-dcd0a2c609d5",
    title: "La Ciudad Prohíbe los Plásticos de Un Solo Uso",
    description:
      "A partir del próximo mes, los plásticos de un solo uso estarán prohibidos en todos los restaurantes y cafeterías.",
  },
];

const { width: screenWidth } = Dimensions.get("window");

const AdCard = ({ item }) => (
  <Card style={styles.adCard}>
    <View style={styles.cardContent}>
      <Card.Cover source={{ uri: item.image }} style={styles.adImage} />
      <View style={styles.adOverlay}>
        <Text variant="bodyMedium" style={styles.adText}>
          {item.description}
        </Text>
      </View>
    </View>
  </Card>
);

const NewsCard = ({ item, onPress }) => (
  <Card style={styles.newsCard} onPress={() => onPress(item)}>
    <View style={styles.cardContent}>
      <Card.Cover source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsOverlay}>
        <Text variant="titleMedium" style={styles.newsTitle}>
          {item.title}
        </Text>
      </View>
    </View>
  </Card>
);

const Home = () => {
  const [selectedNews, setSelectedNews] = useState<{
    id: number;
    image: string;
    title: string;
    description: string;
  } | null>(null);
  const adsRef = React.useRef<ICarouselInstance>(null);
  const newsRef = React.useRef<ICarouselInstance>(null);
  // Add these state variables
  const [adsIndex, setAdsIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);

  const scrollToIndex = (carouselRef, index) => {
    carouselRef.current?.scrollTo({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Consejos Ecológicos</Text>
        <Carousel
          ref={adsRef}
          loop
          autoPlay
          autoPlayInterval={5000}
          data={ads}
          renderItem={({ item }) => <AdCard item={item} />}
          width={screenWidth}
          height={250}
          mode="parallax"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          // Add this prop
          onProgressChange={(_, absoluteProgress) =>
            setAdsIndex(Math.round(absoluteProgress))
          }
        />
        <Pagination 
          length={ads.length} 
          activeIndex={adsIndex} 
          onPress={(index) => scrollToIndex(adsRef, index)}
        />
      </View>

      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Últimas Noticias</Text>
        <Carousel
          ref={newsRef}
          data={news}
          renderItem={({ item }) => (
            <NewsCard item={item} onPress={setSelectedNews} />
          )}
          width={screenWidth}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          // Add this prop
          onProgressChange={(_, absoluteProgress) =>
            setNewsIndex(Math.round(absoluteProgress))
          }
        />
        <Pagination 
          length={news.length} 
          activeIndex={newsIndex} 
          onPress={(index) => scrollToIndex(newsRef, index)}
        />
      </View>

      <Modal
        visible={!!selectedNews}
        animationType="slide"
        onRequestClose={() => setSelectedNews(null)}
      >
        {selectedNews && (
          <View style={styles.modalContainer}>
            <View style={styles.modalImageContainer}>
              <Card.Cover
                source={{ uri: selectedNews.image }}
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
              <Text variant="bodyMedium" style={styles.modalExtraDescription}>
                Esta es información adicional sobre la noticia. Aquí puedes agregar más detalles, contexto o cualquier otra información relevante que quieras compartir con los usuarios.
              </Text>
              <Button 
                mode="contained" 
                onPress={() => setSelectedNews(null)}
                style={styles.closeButton}
              >
                Cerrar
              </Button>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const Pagination = ({ length, activeIndex, onPress }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length }).map((_, index) => (
        <TouchableOpacity
          key={index.toString()}
          style={[
            styles.paginationButton,
            index === activeIndex && styles.paginationButtonActive,
          ]}
          onPress={() => onPress(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
    paddingTop: 20,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  adCard: {
    borderRadius: 15,
  },
  newsCard: {
    marginHorizontal: 10,
    borderRadius: 15,
  },
  cardContent: {
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  adImage: {
    height: "100%",
    borderRadius: 15,
  },
  adOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  adText: {
    color: "white",
  },
  newsImage: {
    height: "100%",
    borderRadius: 15,
  },
  newsOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  newsTitle: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalImageContainer: {
    height: '40%', // Adjust this value to change the image height
    width: '100%',
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.green[700],
  },
  modalDescription: {
    marginBottom: 15,
  },
  modalExtraDescription: {
    marginBottom: 20,
    fontStyle: 'italic',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: colors.green[600],
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:8,
  },
  paginationButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 128, 0, 0.3)', // Light green color
  },
  paginationButtonActive: {
    backgroundColor: 'rgb(0, 128, 0)', // Solid green color
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.green[700],
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
});

export default Home;
