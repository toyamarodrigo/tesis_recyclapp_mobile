import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import Carousel, { type ICarouselInstance } from "react-native-reanimated-carousel";
import { colors } from "@constants/colors.constant";
import { useQuery } from '@tanstack/react-query';

const { width: screenWidth } = Dimensions.get("window");

// Mock data
const mockAds = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    description: "Aprendé a hacer compost en casa y reducí tus residuos",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    description: "Reciclá tus plásticos. ¡Juntos podemos salvar los océanos!",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    description: "Descubrí los beneficios de la energía solar para tu hogar",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507560461415-95081537e5b5",
    description: "Participá en nuestra campaña de limpieza de playas",
  },
];

const mockNews = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce",
    title: "Nueva Planta de Reciclaje en Buenos Aires",
    description: "La ciudad inaugura una planta de reciclaje de última generación que procesará 200 toneladas de residuos diariamente.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    title: "Ley de Energías Renovables Aprobada",
    description: "El Congreso aprobó una ley que incentiva el uso de energías renovables en todo el país.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1610392734074-02f696fd30fc",
    title: "Éxito en la Reforestación de la Selva Misionera",
    description: "Un proyecto de reforestación en Misiones logra plantar más de 1 millón de árboles nativos en dos años.",
  },
];

// Fetch functions using axios (simulated with mock data)
const fetchAds = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockAds;
};

const fetchNews = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockNews;
};

// Component code remains the same
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
  const [selectedNews, setSelectedNews] = useState<(typeof mockNews)[0] | null>(null);
  const adsRef = React.useRef<ICarouselInstance>(null);
  const newsRef = React.useRef<ICarouselInstance>(null);
  const [adsIndex, setAdsIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);

  const { data: ads, isPending: adsPending } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds
  });
  const { data: news, isPending: newsPending } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews
  });

  const scrollToIndex = (carouselRef: React.RefObject<ICarouselInstance>, index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Consejos Ecológicos</Text>
        {adsPending ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.green[600]} />
          </View>
        ) : ads ? (
          <>
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
              onProgressChange={(_, absoluteProgress) =>
                setAdsIndex(Math.round(absoluteProgress))
              }
            />
            <Pagination 
              length={ads.length} 
              activeIndex={adsIndex} 
              onPress={(index) => scrollToIndex(adsRef, index)}
            />
          </>
        ) : (
          <Text style={styles.errorText}>No se pudieron cargar los consejos ecológicos.</Text>
        )}
      </View>

      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Últimas Noticias</Text>
        {newsPending ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.green[600]} />
          </View>
        ) : news ? (
          <>
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
              onProgressChange={(_, absoluteProgress) =>
                setNewsIndex(Math.round(absoluteProgress))
              }
            />
            <Pagination 
              length={news.length} 
              activeIndex={newsIndex} 
              onPress={(index) => scrollToIndex(newsRef, index)}
            />
          </>
        ) : (
          <Text style={styles.errorText}>No se pudieron cargar las noticias.</Text>
        )}
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
                Esta noticia destaca la importancia de las iniciativas ambientales en Argentina. Seguiremos informando sobre los avances y desafíos en la protección del medio ambiente en nuestro país.
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.red[500],
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;