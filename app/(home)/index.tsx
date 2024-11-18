import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router, Link } from "expo-router";
import { AdCard } from "@features/home/components/ad-card";
import { NewsCard } from "@features/home/components/news-card";
import { Carousel } from "@features/home/components/carousel";
import type { Ad, News } from "@models/advertisement.type";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { mockAds, mockNews } from "@constants/data.constant";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import { theme } from "src/theme";
import { useEffect } from "react";
import { User } from "@models/user.type";
import { useUserStore } from "@stores/useUserStore";
import { IMAGE } from "@constants/image.constant";

// TODO: make custom hook to fetch ads
const fetchAds = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockAds;
};

// TODO: make custom hook to fetch news
const fetchNews = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return mockNews;
};

const Home = () => {
  const { user: userClerk } = useUser();
  const { initializeUser, setProfileImage } = useUserStore();

  useEffect(() => {
    if (userClerk) {
      const userLocal: User = {
        id: userClerk.id,
        mail: userClerk.primaryEmailAddress?.emailAddress ?? "",
        name: userClerk.firstName ?? "",
        surname: userClerk.lastName ?? "",
        username: userClerk.username ?? "",
        userType: "CUSTOMER",
      };
      initializeUser(userLocal);
    }
  }, [userClerk]);

  // TODO: fetch ads from API
  const { data: ads, isPending: adsPending } = useQuery({
    queryKey: ["ads"],
    queryFn: fetchAds,
  });
  // TODO: fetch news from API
  const { data: news, isPending: newsPending } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const handleNewsPress = (item: News) => {
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
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <SignedIn>
        <View style={styles.container}>
          <Carousel
            title="Consejos Ecológicos"
            data={ads}
            renderItem={(item) => (
              <AdCard item={item} onPress={handleAdPress} />
            )}
            isPending={adsPending}
            height={250}
          />
          <Carousel
            title="Últimas Noticias"
            data={news}
            renderItem={(item) => (
              <NewsCard item={item} onPress={handleNewsPress} />
            )}
            isPending={newsPending}
            height={250}
          />
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
});

export default Home;
