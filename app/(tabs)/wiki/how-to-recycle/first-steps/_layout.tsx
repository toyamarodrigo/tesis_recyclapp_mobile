import { Stack } from "expo-router";

export default function FirstStepsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Primeros Pasos",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
