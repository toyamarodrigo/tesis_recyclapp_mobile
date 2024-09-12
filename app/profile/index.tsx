import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useImageById } from "@hooks/useImage";
import {
  Button,
  Text,
  Avatar,
  List,
  Surface,
  Portal,
  Modal,
} from "react-native-paper";
import { useAppTheme } from "src/theme";
import { useUserStore } from "@stores/useUserStore";

const Profile = () => {
  const [visible, setVisible] = React.useState(false);
  const user = useUserStore((state) => state.user);
  const { data: userImages, isLoading: userImageLoading } = useImageById(
    "cleuipzo60002v8fcwfmyp9xk"
  );
  const theme = useAppTheme();
  const router = useRouter();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  if (!user) return null;
  return (
    <Surface style={{ flex: 1 }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 18, padding: 10 }}>
              Eliminar cuenta
            </Text>
            <Text style={{ padding: 10, fontSize: 16, textAlign: "center" }}>
              ¿Estás seguro de que quieres eliminar tu cuenta?
            </Text>
            <Text
              style={{
                color: theme.colors.error,
                fontWeight: 600,
                fontSize: 16,
                padding: 10,
              }}
            >
              Esta acción es IRREVERSIBLE.
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => hideModal()}
            buttonColor={theme.colors.outline}
            style={{
              margin: 10,
            }}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log("Despedite de tu cuenta maquina")}
            buttonColor={theme.colors.error}
            style={{
              margin: 10,
            }}
          >
            Eliminar
          </Button>
        </Modal>
      </Portal>
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
          <Text style={{ margin: 10 }}>@{user?.name}</Text>
        </View>

        <List.Section>
          <List.Item
            title="Datos personales"
            left={() => (
              <List.Icon
                icon="human-greeting-variant"
                color={theme.colors.tertiary}
              />
            )}
            onPress={() => {
              router.push("/profile/personal-info");
            }}
          />
          <List.Item
            title="Mis direcciones"
            left={() => (
              <List.Icon
                icon="map-marker-radius"
                color={theme.colors.tertiary}
              />
            )}
            onPress={() => {
              router.push("/profile/address");
            }}
          />
          <List.Item
            title="Notificaciones"
            left={() => (
              <List.Icon icon="bell-ring" color={theme.colors.tertiary} />
            )}
            onPress={() => {
              router.push("/profile/notifications");
            }}
          />
          <List.Item
            title="Mis beneficios"
            left={() => (
              <List.Icon icon="tag-multiple" color={theme.colors.tertiary} />
            )}
            onPress={() => {
              router.push("/profile/benefits");
            }}
          />
          <List.Item
            title="Cambiar contraseña"
            left={() => <List.Icon icon="lock" color={theme.colors.tertiary} />}
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
        <Button
          mode="text"
          onPress={() => console.log("Cerrar sesión")}
          textColor={theme.colors.secondary}
        >
          Cerrar sesión
        </Button>
        <Button
          mode="text"
          onPress={() => showModal()}
          textColor={theme.colors.error}
        >
          Eliminar cuenta
        </Button>
      </View>
    </Surface>
  );
};

export default Profile;
