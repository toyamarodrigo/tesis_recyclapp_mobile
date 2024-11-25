import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { PaperProvider } from "react-native-paper";
import { theme } from "src/theme";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      onError: (error) => {
        if ("message" in error) {
          console.error(error.message);
        }
      },
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <PaperProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <ClerkLoaded>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="(auth)"
                  options={{
                    title: "",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(home)"
                  options={{
                    title: "",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="news-detail"
                  options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                  name="ads-detail"
                  options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                  name="profile"
                  options={{
                    title: "",
                    headerShown: false,
                  }}
                />
              </Stack>
            </ClerkLoaded>
          </PaperProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </PaperProvider>
  );
}
