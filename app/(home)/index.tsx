import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router, Link } from "expo-router";
import { AdCard } from "@features/home/components/ad-card";
import { NewsCard } from "@features/home/components/news-card";
import { Carousel } from "@features/home/components/carousel";
import type { Ad } from "@models/advertisement.type";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import { theme } from "src/theme";
import { useAdvertisementList } from "@hooks/useAdvertisement";
import { IMAGE } from "@constants/image.constant";
import { NoDataCard } from "@components/NoDataCard";
import type { Result } from "@models/news";
import { newsApi } from "@api/api.news";
import { useCallback } from "react";
import { useState } from "react";

const Home = () => {
  const { user: userClerk, isLoaded } = useUser();
  if (!userClerk || !isLoaded) return null;
  const {
    data: ads,
    isPending: adsPending,
    refetch: refetchAds,
  } = useAdvertisementList();
  const {
    data: news,
    isPending: newsPending,
    refetch: refetchNews,
  } = useQuery({
    queryKey: ["news"],
    queryFn: newsApi.getNews,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchAds(), refetchNews()]);
    setRefreshing(false);
  }, [refetchAds, refetchNews]);

  const handleNewsPress = (item: Result) => {
    router.push({
      pathname: "/news-detail",
      params: { newsItem: JSON.stringify(item) },
    });
  };

  const handleAdPress = (item: Ad) => {
    router.push({
      pathname: "/ads-detail",
      params: { adItem: JSON.stringify(item) },
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]} // Android
          tintColor={theme.colors.primary} // iOS
        />
      }
    >
      <SignedIn>
        <View style={styles.container}>
          {ads && ads.length > 0 ? (
            <Carousel
              title="Nuestras tiendas"
              data={ads}
              renderItem={(item) => (
                <AdCard item={item} onPress={handleAdPress} />
              )}
              isPending={adsPending}
              height={250}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <NoDataCard image={IMAGE.AD_GENERIC} />
            </View>
          )}
          {!newsPending && news && news.results.length > 0 ? (
            <Carousel
              title="Últimas Noticias"
              data={news.results}
              renderItem={(item) => (
                <NewsCard item={item} onPress={handleNewsPress} />
              )}
              isPending={newsPending}
              height={250}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <NoDataCard image={IMAGE.NEWS_GENERIC} />
            </View>
          )}
        </View>
      </SignedIn>
      <SignedOut>
        <View style={styles.containerLogin}>
          <Image
            style={styles.image}
            source="../../assets/images/icon.png"
            contentFit="cover"
          />
          <View style={styles.buttonBox}>
            <Link href="/(auth)/sign-in" asChild>
              <Button
                buttonColor={theme.colors.secondaryContainer}
                textColor={theme.colors.onSecondaryContainer}
              >
                <Text style={styles.text}>Iniciar sesión</Text>
              </Button>
            </Link>
            <Link href="/(auth)/sign-up" asChild>
              <Button
                buttonColor={theme.colors.tertiaryContainer}
                textColor={theme.colors.onTertiaryContainer}
              >
                <Text style={styles.text}>Registrarse</Text>
              </Button>
            </Link>
            <Link href="/(auth)/password-reset" asChild>
              <Button
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.onErrorContainer}
              >
                <Text style={styles.text}>Olvidé mi contraseña</Text>
              </Button>
            </Link>
          </View>
        </View>
      </SignedOut>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 20,
  },
  containerLogin: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    backgroundColor: theme.colors.background,
  },
  buttonBox: {
    gap: 20,
    marginTop: 50,
    width: "60%",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    padding: 10,
  },
  noDataContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
});

export default Home;
