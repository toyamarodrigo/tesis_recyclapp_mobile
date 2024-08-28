import { colors } from "@constants/colors.constant";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function ProfileLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.blue[100],
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerBackButtonMenuEnabled: true,
        headerStyle: {
          backgroundColor: colors.gray[100],
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mi perfil",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>TUKI</Pressable>
          ),
        }}
      />
    </Stack>
  );
}
