import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import {
  Button,
  Text,
  Avatar,
  List,
  Portal,
  Modal,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { useAppTheme } from "src/theme";
import { useUserStore } from "@stores/useUserStore";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserList } from "@hooks/useUser";
import DataEmpty from "@components/DataEmpty";
import { IMAGE } from "@constants/image.constant";
import { USER_TYPE } from "@constants/enum.constant";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const { userError, userLoading } = useUserList();
  const { signOut } = useAuth();
  const { user, profileImage } = useUserStore();
  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [logoutVisible, setLogoutVisible] = React.useState(false);
  const theme = useAppTheme();

  const showModalDelete = () => setDeleteVisible(true);
  const showModalLogout = () => setLogoutVisible(true);

  console.log("profileImage", profileImage);
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1 }}>
        <Link href="/" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingVertical: 0,
        }}
      >
        <Portal>
          <Modal
            visible={deleteVisible}
            onDismiss={() => setDeleteVisible(false)}
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
              onPress={() => setDeleteVisible(false)}
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
          <Modal
            visible={logoutVisible}
            onDismiss={() => setLogoutVisible(false)}
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
                ¿Deseas cerrar sesión?
              </Text>
              <Text style={{ padding: 10, fontSize: 16, textAlign: "center" }}>
                Deberás volver a ingresar tus datos la próxima vez.
              </Text>
            </View>
            <Button
              mode="contained"
              onPress={() => setLogoutVisible(false)}
              buttonColor={theme.colors.outline}
              style={{
                margin: 10,
              }}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={() => signOut()}
              buttonColor={theme.colors.error}
              style={{
                margin: 10,
              }}
            >
              Cerrar sesion
            </Button>
          </Modal>
        </Portal>

        <View style={{ flex: 1, width: "100%" }}>
          {(userLoading || userError) && (
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              {userLoading && (
                <ActivityIndicator
                  color={theme.colors.primary}
                  size={"large"}
                />
              )}
              {userError && (
                <DataEmpty displayText="Ocurrió un problema al mostrar sus datos. Intente nuevamente." />
              )}
            </View>
          )}
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            {profileImage && (
              <Avatar.Image
                size={100}
                source={{
                  uri:
                    profileImage && profileImage !== ""
                      ? profileImage
                      : IMAGE.CLOUDINARY_URL + IMAGE.USER_GENERIC,
                }}
              />
            )}
            <Text style={{ marginTop: 10 }}>
              @
              {user && user.userType == USER_TYPE.STORE
                ? user.UserStore?.displayName
                : user?.username}
            </Text>
          </View>

          <List.Section style={{ width: "100%" }}>
            <Link href="/profile/personal-info" asChild>
              <List.Item
                title="Datos personales"
                left={() => (
                  <List.Icon
                    icon="account-circle"
                    color={theme.colors.tertiary}
                  />
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            </Link>
            <Link href="/profile/address" asChild>
              <List.Item
                title="Mis direcciones"
                left={() => (
                  <List.Icon icon="map-marker" color={theme.colors.tertiary} />
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            </Link>
            {user?.userType == USER_TYPE.STORE && (
              <Link href="/profile/benefits" asChild>
                <List.Item
                  title="Mis beneficios"
                  left={() => (
                    <List.Icon
                      icon="tag-multiple"
                      color={theme.colors.tertiary}
                    />
                  )}
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                />
              </Link>
            )}
            <Link href="/profile/change-password" asChild>
              <List.Item
                title="Cambiar contraseña"
                left={() => (
                  <List.Icon icon="lock" color={theme.colors.tertiary} />
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            </Link>
          </List.Section>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Button
            mode="text"
            onPress={() => showModalLogout()}
            textColor={theme.colors.secondary}
          >
            Cerrar sesión
          </Button>
          <Button
            mode="text"
            onPress={() => showModalDelete()}
            textColor={theme.colors.error}
          >
            Eliminar cuenta
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
