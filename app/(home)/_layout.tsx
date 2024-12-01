import { Link, Tabs, Slot, Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import React from "react";
import { colors } from "@constants/colors.constant";

const tabScreens = [
  { name: "feed", icon: "timeline-text-outline" as const },
  { name: "wiki", icon: "bookshelf" as const },
  { name: "index", icon: "leaf-circle" as const, size: 30 },
  { name: "locations", icon: "map-marker-radius" as const },
  { name: "rewards", icon: "gift-outline" as const },
];

const RouterTabs = () => {
  const theme = useTheme();
  const { userId, isSignedIn } = useAuth();
  if (!userId || !isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <>
      <SignedIn>
        <Tabs
          screenOptions={() => ({
            headerRight: () => (
              <Link asChild href={"/profile"}>
                <MaterialCommunityIcons.Button
                  color={theme.colors.primary}
                  name="face-man"
                  size={30}
                  backgroundColor={theme.colors.background}
                />
              </Link>
            ),
            tabBarStyle: {
              borderTopColor: theme.colors.surfaceVariant,
              backgroundColor: theme.colors.background,
              flexDirection: "row",
              justifyContent: "space-around",
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
                      focused
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant
                    }
                    name={screen.icon}
                    size={screen.size || 24}
                  />
                ),
                tabBarItemStyle: {
                  backgroundColor: colors.green[50],
                  justifyContent: "center",
                },
                tabBarActiveBackgroundColor: colors.green[100],
                tabBarLabel: "",
              }}
            />
          ))}
        </Tabs>
      </SignedIn>
      <SignedOut>
        <Slot />
      </SignedOut>
    </>
  );
};

export default RouterTabs;
