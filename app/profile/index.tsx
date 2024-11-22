import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Link, Redirect } from "expo-router";
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
import { IMAGE } from "@constants/image.constant";
import { useAuth, useUser } from "@clerk/clerk-react";
import ImageUploader from "@components/ImageUploader";
import { useUserStoreByClerk } from "@hooks/useUser";

const Profile = () => {
  const { signOut, isSignedIn, userId, isLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  if (!userLoaded || !user?.id) return null;
  const { profileImage, setProfileImage } = useUserStore();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const theme = useAppTheme();

  const showModalDelete = () => setDeleteVisible(true);
  const showModalLogout = () => setLogoutVisible(true);

  const { data: userStore } = useUserStoreByClerk({ userId: user.id });

  const logout = async () => {
    await signOut();
  };

  useEffect(() => {
    if (user) {
      const timestamp = `?timestamp=${Date.now()}`;
      const urlImage = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_FOLDER}/${user.id}.jpg${timestamp}`;
      setProfileImage(urlImage);
    }
  }, []);

  if (!userId || !isSignedIn || !isLoaded)
    return <Redirect href="/(auth)/sign-in" />;

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
                  fontWeight: "600",
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
              onPress={() => logout()}
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
          {!isLoaded && (
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              {!isLoaded && (
                <ActivityIndicator
                  color={theme.colors.primary}
                  size={"large"}
                />
              )}
            </View>
          )}
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <View style={{ position: "relative" }}>
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
              {user && (
                <ImageUploader
                  style={{
                    position: "absolute",
                    bottom: -15,
                    right: -15,
                    backgroundColor: "white",
                    borderRadius: 25,
                    elevation: 5,
                  }}
                  publicid={user?.id}
                  subfolder={IMAGE.USER_UPLOAD}
                />
              )}
            </View>

            <Text style={{ marginTop: 10 }}>@{user?.username}</Text>
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
            {userStore && (
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
