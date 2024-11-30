import { useRef } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import ReanimatedCarousel, {
  type ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { colors } from "@constants/colors.constant";
import { useSharedValue } from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

interface CarouselProps<T> {
  title: string;
  data: T[] | undefined;
  renderItem: (item: T) => React.ReactElement;
  isPending: boolean;
  height?: number;
}

export function Carousel<T>({
  title,
  data,
  renderItem,
  isPending,
  height = 250,
}: CarouselProps<T>) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isPending ? (
        <View style={[styles.loaderContainer, { height }]}>
          <ActivityIndicator size="large" color={colors.green[600]} />
        </View>
      ) : data ? (
        <View style={styles.carouselContainer}>
          <ReanimatedCarousel
            ref={carouselRef}
            loop
            autoPlay={title === "Consejos Ecológicos"}
            autoPlayInterval={5000}
            data={data}
            renderItem={({ item }) => renderItem(item as T)}
            width={screenWidth}
            height={height}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onProgressChange={progress}
          />

          <Pagination.Basic
            progress={progress}
            data={data as {}[]}
            dotStyle={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 50,
            }}
            activeDotStyle={{
              backgroundColor: colors.green[700],
              borderRadius: 50,
            }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
        </View>
      ) : (
        <Text style={styles.errorText}>No se pudieron cargar los datos.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.green[700],
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  carouselContainer: {
    position: "relative",
    marginBottom: 20,
    height: screenHeight * 0.3,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colors.red[500],
    textAlign: "center",
    marginTop: 20,
  },
});
