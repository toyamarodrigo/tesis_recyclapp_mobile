import { colors } from "@constants/colors.constant";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.blue[100],
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Mi perfil" }} />
    </Stack>
  );
}
