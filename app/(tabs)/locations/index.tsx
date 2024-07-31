import Button from "@components/Button";
import { colors } from "@constants/colors.constant";
import { useAppStore } from "@stores/useAppStore";
import { View, Text, StyleSheet } from "react-native";

const Locations = () => {
  const increment = useAppStore((state) => state.increment);
  const decrement = useAppStore((state) => state.decrement);
  const count = useAppStore((state) => state.count);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Locations</Text>
        <Text style={styles.subtitle}>
          This is the Locations page of your app.
        </Text>
        <View style={styles.countContainer}>
          <Button title="-" onPress={decrement} />
          <Text style={styles.subtitle}>{count}</Text>
          <Button title="+" onPress={increment} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.gray[50],
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 16,
    marginTop: 16,
  },
});

export default Locations;