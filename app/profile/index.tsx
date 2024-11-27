import { useState } from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
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
import { theme } from "src/theme";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGE } from "@constants/image.constant";
import { useAuth, useUser } from "@clerk/clerk-react";
import ImageUploader from "@components/ImageUploader";
import { useUserStoreByClerk } from "@hooks/useUser";
import { useProfileImage } from "@hooks/useProfileImage";

const Profile = () => {
  const { signOut, isLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const showModalLogout = () => setLogoutVisible(true);

  const logout = async () => {
    // es necesario volver a home antes de cerrar sesión por que sino clerk tira un error
    router.replace("/");
    await signOut();
  };

  const profileImageValue = useProfileImage(user?.id);

  const { data: userStore } = useUserStoreByClerk({
    userId: userLoaded && user?.id ? user?.id : "",
  });

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
              {profileImageValue && (
                <Avatar.Image
                  size={100}
                  source={{
                    uri:
                      profileImageValue && profileImageValue !== ""
                        ? profileImageValue
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
