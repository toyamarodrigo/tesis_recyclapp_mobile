import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "@constants/colors.constant";

export const HistoricalPointItem = ({ points, date, description }: { points: number; date: string; description: string }) => {
  return (
    <View style={styles.historyItem}>
    <View style={styles.pointsCircle}>
      <Text style={styles.pointsText}>{points}</Text>
    </View>
    <View style={styles.historyDetails}>
      <Text style={styles.historyDate}>{date}</Text>
      <Text style={styles.historyDescription}>{description}</Text>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.blue[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pointsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyDetails: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    color: colors.gray[500],
  },
  historyDescription: {
    fontSize: 16,
  },
});