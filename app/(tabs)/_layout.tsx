import { Link, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@constants/colors.constant";

const RouterTabs = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={() => ({
        headerRight: () => (
          <Link asChild href={"/profile"} onPress={() => console.log("boton")}>
            <MaterialCommunityIcons.Button
              color={colors.green[600]}
              name="face-man"
              size={36}
              onPress={() => console.log("boton")}
              backgroundColor={colors.gray[100]}
            />
          </Link>
        ),
        tabBarStyle: {
          height: "10%",
          borderTopColor: colors.gray[50],
          backgroundColor: colors.gray[100],
        },
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerStyle: {
          borderBottomColor: colors.gray[50],
          backgroundColor: colors.gray[100],
        },
        tabBarActiveBackgroundColor: colors.gray[100],
      })}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? colors.green[600] : colors.gray[500]}
              name="timeline-text-outline"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="wiki"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? colors.green[600] : colors.gray[500]}
              name="bookshelf"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? colors.green[600] : colors.gray[500]}
              name="leaf-circle"
              size={36}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? colors.green[600] : colors.gray[500]}
              name="map-marker-radius"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? colors.green[600] : colors.gray[500]}
              name="gift-outline"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <View style={{ width: 0, height: 0, opacity: 0 }}/>
          ),
          title: "",
          tabBarStyle: { display: "none" },
        }}
      /> */}
    </Tabs>
  );
};

export default RouterTabs;
