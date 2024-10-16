import { Stack } from "expo-router";

export default function CompostLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Compost",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
