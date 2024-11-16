import { StyleSheet, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useUser } from "@hooks/useUser";
import { colors } from "@constants/colors.constant";

const Wiki = () => {
  const { user } = useLocalSearchParams();

  const { data } = useUser(user as string);

  // console.log("user", data);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Wiki</Text>
        <Text style={styles.subtitle}>This is the Wiki page of your app.</Text>
        <Text style={styles.user}>Use param: {data?.name}</Text>
        <Link href="/" style={styles.linkButton}>
          Go to Login
        </Link>
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
  user: {
    fontSize: 24,
    color: "#38434D",
    marginTop: 16,
  },
  linkButton: {
    fontSize: 24,
    color: "#1B95E0",
    marginTop: 16,
  },
});

export default Wiki;
