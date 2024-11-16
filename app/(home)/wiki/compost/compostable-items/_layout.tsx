import { Stack } from "expo-router";

export default function CompostableItemsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
