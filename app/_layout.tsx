import { Stack } from "expo-router";
import { useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import * as Updates from "expo-updates";
import { PaperProvider } from "react-native-paper";
import { theme } from "src/theme";

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

const RootLayout = () => {
  useReactQueryDevTools(queryClient);
  const segments = useSegments();
  const isLogin = segments[segments.length - 1] === "(tabs)";
  const drawerTitle = isLogin
    ? "LOGIN"
    : segments.length > 0
      ? segments[segments.length - 1].toLowerCase()
      : "";

  const runTypeMessage = Updates.isEmbeddedLaunch
    ? "This app is running from built-in code"
    : "This app is running an update";

  console.log("runTypeMessage", runTypeMessage);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
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
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
