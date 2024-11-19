import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { CircleLink } from "@features/rewards/components/circle-link";
import { HistoricalPointItem } from "@features/rewards/components/historical-point-item";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Title, Divider } from "react-native-paper";
import { theme, useAppTheme } from "src/theme";
import { mockedHistoricalPoints } from "@constants/data.constant";

export function fetchHistoricalPoints() {
  const totalPoints = mockedHistoricalPoints.reduce(
    (sum, item) => sum + item.points,
    0
  );

  return {
    historicalPoints: mockedHistoricalPoints,
    totalPoints: totalPoints,
  };
}

export default function Rewards() {
  const { historicalPoints, totalPoints } = fetchHistoricalPoints();
  const theme = useAppTheme();
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <FlatList
        data={historicalPoints}
        renderItem={({ item }) => (
          <HistoricalPointItem
            points={item.points}
            date={item.date}
            description={item.description}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={
          <View style={styles.main}>
            <Title style={styles.title}>Mis puntos</Title>
            <Text style={styles.score}>{totalPoints}</Text>
            <Divider
              style={{
                borderColor: theme.colors.inverseOnSurface,
                borderRadius: 10,
                borderWidth: 1,
                width: screenWidth * 0.5,
                marginBottom: 30,
              }}
            />
            <View style={styles.circleContainer}>
              <CircleLink
                color={theme.colors.secondary}
                href="/locations"
                text="Locales verdes"
                icon={
                  <MaterialCommunityIcons
                    name="store"
                    size={24}
                    color="white"
                  />
                }
              />
              <CircleLink
                color={theme.colors.primary}
                href="/rewards/benefits"
                text="Beneficios ofrecidos"
                icon={<FontAwesome5 name="gift" size={24} color="white" />}
              />
              <CircleLink
                color={theme.colors.tertiary}
                href="/rewards/active-benefits"
                text="Mis beneficios"
                icon={<Ionicons name="star" size={24} color="white" />}
              />
            </View>

            <Text style={styles.historyTitle}>Historial de puntos</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  main: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: theme.colors.primary,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 20,
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 40,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 16,
    color: theme.colors.primary,
  },
  flatListContent: {
    paddingHorizontal: 24,
  },
});
