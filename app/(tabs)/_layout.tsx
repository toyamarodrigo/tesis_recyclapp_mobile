import { Link, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2E7D32', // Dark green
    onPrimary: '#FFFFFF',
    primaryContainer: '#B8E6B8', // Light green
    onPrimaryContainer: '#002200',
    secondary: '#4CAF50', // Medium green
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D7F7D7', // Very light green
    onSecondaryContainer: '#002200',
    tertiary: '#81C784', // Light green
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#E8F5E9', // Very light green
    onTertiaryContainer: '#002200',
    error: '#B00020',
    background: '#F1F8E9', // Very light green background
    surface: '#FFFFFF',
    onSurface: '#1B1B1B',
    surfaceVariant: '#E0F2E0', // Light green surface
    onSurfaceVariant: '#1B1B1B',
  },
};

const tabScreens = [
  { name: "feed", icon: "timeline-text-outline" as const },
  { name: "wiki", icon: "bookshelf" as const },
  { name: "index", icon: "leaf-circle" as const, size: 36 },
  { name: "locations", icon: "map-marker-radius" as const },
  { name: "rewards", icon: "gift-outline" as const },
];

const RouterTabs = () => {
  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={() => ({
          headerRight: () => (
            <Link asChild href={"/profile"} onPress={() => console.log("boton")}>
              <MaterialCommunityIcons.Button
                color={theme.colors.primary}
                name="face-man"
                size={36}
                onPress={() => console.log("boton")}
                backgroundColor={theme.colors.background}
              />
            </Link>
          ),
          tabBarStyle: {
            height: "10%",
            borderTopColor: theme.colors.surfaceVariant,
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerStyle: {
            borderBottomColor: theme.colors.surfaceVariant,
            backgroundColor: theme.colors.background,
          },
          tabBarActiveBackgroundColor: theme.colors.background,
        })}
      >
        {tabScreens.map((screen) => (
          <Tabs.Screen
            key={screen.name}
            name={screen.name}
            options={{
              title: "",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  color={
                    focused ? theme.colors.primary : theme.colors.onSurfaceVariant
                  }
                  name={screen.icon}
                  size={screen.size || 24}
                />
              ),
              tabBarLabel: "",
            }}
          />
        ))}
      </Tabs>
    </PaperProvider>
  );
};

export default RouterTabs;
