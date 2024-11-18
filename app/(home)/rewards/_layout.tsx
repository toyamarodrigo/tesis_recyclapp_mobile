import { Stack } from "expo-router";

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Recompensas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="benefits"
        options={{
          title: "Beneficios",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="active-benefits"
        options={{
          title: "Beneficios activos",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="code-benefit"
        options={{
          title: "Canjear beneficio",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
