import Button from "@components/Button";
import { colors } from "@constants/colors.constant";
import { useAppStore } from "@stores/useAppStore";
import { View, Text, StyleSheet } from "react-native";

const Rewards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Rewards</Text>
        <Text style={styles.subtitle}>
          This is the Rewards page of your app.
        </Text>
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
});

export default Rewards;
