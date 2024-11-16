import { Stack } from "expo-router";

const routes = [
  { name: "index", title: "" },
  { name: "personal-info/index", title: "" },
  { name: "address/index", title: "Mis direcciones" },
  { name: "address/new", title: "" },
  { name: "benefits/index", title: "Mis beneficios" },
  { name: "benefits/new", title: "" },
  { name: "change-password/index", title: "Cambiar contraseña" },
];

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      {routes.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          options={{
            title: route.title,
            headerShown: false,
          }}
        />
      ))}
    </Stack>
  );
}
