import { Stack } from "expo-router";

export default function HowToRecycleLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "How to Recycle",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[material]"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}