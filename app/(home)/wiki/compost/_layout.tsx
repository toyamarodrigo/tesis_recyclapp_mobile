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
      <Stack.Screen
        name="compostable-items"
        options={{
          title: "Elementos Compostables",
          headerShown: false,
        }}
      />  
      <Stack.Screen
        name="non-compostable-items"
        options={{
          title: "Elementos No Compostables",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
