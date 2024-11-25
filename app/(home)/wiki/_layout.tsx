import { Stack } from "expo-router";

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Wiki",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="compost"
        options={{
          title: "Compost",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="how-to-recycle"
        options={{
          title: "How to Recycle",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
