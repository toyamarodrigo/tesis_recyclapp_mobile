import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href={"/"} />;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Iniciar sesión",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Registrarse",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
