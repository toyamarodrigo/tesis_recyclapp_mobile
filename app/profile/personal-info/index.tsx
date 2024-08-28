import { colors } from "@constants/colors.constant";
import { StyleSheet } from "react-native";

export default function PersonalInfo() {
  return (
    <div>
      <h1>Personal Info</h1>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.gray[50],
  },
  main: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    marginHorizontal: "auto",
    marginTop: "10%",
  },
});
