import React from "react";
import { View } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@hooks/useUser";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useImageById } from "@hooks/useImage";
import { Button, Text, Avatar, List, Surface } from "react-native-paper";
import { useAppTheme } from "src/theme";

const Profile = () => {
  const { user } = useLocalSearchParams();
  const { data } = useUser("cleuipzo60002v8fcwfmyp9xk");
  const { data: userImages, isLoading: userImageLoading } = useImageById(
    "cleuipzo60002v8fcwfmyp9xk"
  );
  const theme = useAppTheme();

  const router = useRouter();

  return (
    <Surface style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
          marginTop: "10%",
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          {!userImageLoading && (
            <Avatar.Image
              size={100}
              source={{
                uri:
                  userImages && userImages.url !== ""
                    ? userImages.url
                    : "https://res.cloudinary.com/dakunjike/image/upload/v1724803574/RecyclApp/Utils/userGeneric.png",
              }}
            />
          )}
          <Text style={{ margin: 10 }}>@{data?.name}</Text>
        </View>

        <List.Section>
          <List.Item
            title="Datos personales"
            left={() => <List.Icon icon="human-greeting-variant" />}
            onPress={() => {
              router.push("/profile/personal-info");
            }}
          />
          <List.Item
            title="Mis direcciones"
            left={() => <List.Icon icon="map-marker-radius" />}
            onPress={() => {}}
          />
          <List.Item
            title="Notificaciones"
            left={() => <List.Icon icon="bell-ring" />}
            onPress={() => {}}
          />
          <List.Item
            title="Mis beneficios"
            left={() => <List.Icon icon="tag-multiple" />}
            onPress={() => {}}
          />
          <List.Item
            title="Cambiar contraseña"
            left={() => <List.Icon icon="lock" />}
            onPress={() => {
              router.push("/profile/change-password");
            }}
          />
        </List.Section>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button mode="text" onPress={() => console.log("Cerrar sesión")}>
          Cerrar sesión
        </Button>
        <Button mode="text" onPress={() => console.log("Eliminar cuenta")}>
          Eliminar cuenta
        </Button>
      </View>
    </Surface>
  );
};

export default Profile;
