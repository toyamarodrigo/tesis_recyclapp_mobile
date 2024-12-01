import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import { CircleLink } from "@features/rewards/components/circle-link";
import { HistoricalPointItem } from "@features/rewards/components/historical-point-item";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Text, Title, Divider, ActivityIndicator } from "react-native-paper";
import { theme, useAppTheme } from "src/theme";
import { useUserCustomerByClerk } from "@hooks/useUser";
import { useUser } from "@clerk/clerk-expo";
import { transformDate } from "@utils/helpers";
import { useCallback, useState } from "react";

export default function Rewards() {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn || !user?.id) return null;
  const theme = useAppTheme();
  const screenWidth = Dimensions.get("window").width;
  const {
    data: userCustomer,
    isLoading,
    refetch,
  } = useUserCustomerByClerk({
    userId: user.id,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const sortedPointsHistory = userCustomer?.pointsHistory?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator color={theme.colors.primary} size={"large"} />
      )}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={sortedPointsHistory}
        renderItem={({ item }) => (
          <HistoricalPointItem
            points={item.pointsChange}
            date={transformDate(item.createdAt)}
            description={item.description || ""}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={
          <View style={styles.main}>
            <Title style={styles.title}>Puntos disponibles</Title>
            <Text style={styles.score}>{userCustomer?.pointsCurrent}</Text>
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
              {/* <CircleLink
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
              /> */}
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

            <Text style={styles.historyTitle}>
              Historial de puntos ({userCustomer?.pointsTotal})
            </Text>
          </View>
        }
      />
    </View>
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
  scoreHeader: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: theme.colors.tertiary,
    padding: 10,
    borderRadius: 20,
  },
  scoreAvailable: {
    fontSize: 18,
    color: theme.colors.primary,
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
