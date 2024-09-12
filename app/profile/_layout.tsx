import { Stack, useRouter } from "expo-router";

const routes = [
  { name: "index", title: "Mi perfil" },
  { name: "personal-info/index", title: "Datos personales" },
  { name: "address/index", title: "Mis direcciones" },
  { name: "address/new/index" },
  { name: "notifications/index", title: "Notificaciones" },
  { name: "benefits/index", title: "Mis beneficios" },
  { name: "benefits/new", title: "Nuevo beneficio" },
  { name: "change-password/index", title: "Cambiar contraseña" },
];

export default function ProfileLayout() {
  const router = useRouter();
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
          options={{ title: route.title }}
        />
      ))}
    </Stack>
  );
}
