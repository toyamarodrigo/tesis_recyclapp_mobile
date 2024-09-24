import { Link, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@constants/colors.constant";
import { useTheme } from "react-native-paper";

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
    <Tabs
      initialRouteName="index"
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
  );
};

export default RouterTabs;
