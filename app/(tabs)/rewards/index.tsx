import { View, Text, StyleSheet, FlatList } from "react-native";
import { CircleLink } from "@features/rewards/components/circle-link";
import { HistoricalPointItem } from "@features/rewards/components/historical-point-item";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

const mockedHistoricalPoints = [
  {
    id: 1,
    points: 100,
    date: "2023-04-15",
    description: "Compra en Local Verde",
  },
  { id: 2, points: -50, date: "2023-04-10", description: "Canje de beneficio" },
  {
    id: 3,
    points: 75,
    date: "2023-04-05",
    description: "Reciclaje en punto verde",
  },
  {
    id: 4,
    points: 200,
    date: "2023-03-30",
    description: "Compra en Local Verde",
  },
  {
    id: 5,
    points: -100,
    date: "2023-03-25",
    description: "Canje de beneficio",
  },
];

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

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Mis puntos</Text>
        <Text style={styles.score}>{totalPoints}</Text>
        <View style={styles.circleContainer}>
          <CircleLink
            color="#4CAF50"
            href="/locations"
            text="Locales Verdes"
            icon={
              <MaterialCommunityIcons name="store" size={24} color="white" />
            }
          />
          <CircleLink
            color="#8BC34A"
            href="/rewards/benefits"
            text="Beneficios"
            icon={<FontAwesome5 name="gift" size={24} color="white" />}
          />
          <CircleLink
            color="#009688"
            href="/rewards/active-benefits"
            text="Beneficios activos"
            icon={<Ionicons name="star" size={24} color="white" />}
          />
        </View>

        <Text style={styles.historyTitle}>Historial de puntos</Text>
      </View>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  main: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1B5E20", // Dark Green
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 24,
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 16,
    color: "#1B5E20", // Dark Green
  },
  flatListContent: {
    paddingHorizontal: 24,
  },
});
