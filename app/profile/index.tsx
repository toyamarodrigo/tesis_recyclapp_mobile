import { StyleSheet, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useUser } from "@hooks/useUser";
import { colors } from "@constants/colors.constant";
import { Image } from "expo-image";
import { useAssets } from "expo-asset";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@components/Button";
import { useImageById } from "@hooks/useImage";

const Profile = () => {
  const { user } = useLocalSearchParams();

  const { data } = useUser("cleuipzo60002v8fcwfmyp9xk");
  const { data: userImages, isLoading: userImageLoading } = useImageById(
    "cleuipzo60002v8fcwfmyp9xk"
  );
  console.log(userImages);
  console.log("user", data);

  // const [assets] = useAssets([require("./assets/images/francella.PNG")]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* {assets != undefined ? 
        (<Image source={assets[0]} style={{ width: 50, height: 50 }} />)
        : 
        (
          <MaterialCommunityIcons
              color={colors.green[600]}
              name="face-man"
              size={36}
              backgroundColor={colors.gray[100]}
            />
        )
        }
         */}
        <View style={styles.centeredContainer}>
          <View style={styles.imageView}>
            {!userImageLoading && (
              <Image
                source={
                  userImages && userImages.url != ""
                    ? userImages.url
                    : "https://res.cloudinary.com/dakunjike/image/upload/v1724803574/RecyclApp/Utils/userGeneric.png"
                }
                style={styles.image}
              />
            )}
          </View>
          <Text style={styles.user}>@{data?.name}</Text>
        </View>

        <View style={styles.linkView}>
          <Link href="/profile/personal-info" style={styles.linkButton}>
            <MaterialCommunityIcons
              name="human-greeting-variant"
              size={20}
              style={styles.linkIcon}
            />
            Datos personales
          </Link>
          <Link href="/profile/address" style={styles.linkButton}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={20}
              style={styles.linkIcon}
            />
            Mis direcciones
          </Link>
          <Link href="/profile/notifications" style={styles.linkButton}>
            <MaterialCommunityIcons
              name="bell-ring"
              size={20}
              style={styles.linkIcon}
            />
            Notificaciones
          </Link>
          {/* PERFIL TIENNODA */}
          <Link href="/profile/benefits" style={styles.linkButton}>
            <MaterialCommunityIcons
              name="tag-multiple"
              size={20}
              style={styles.linkIcon}
            />
            Mis beneficios
          </Link>
          <Link href="/profile/change-password" style={styles.linkButton}>
            <MaterialCommunityIcons
              name="lock"
              size={20}
              style={styles.linkIcon}
            />
            Cambiar contraseña
          </Link>{" "}
        </View>
        <View style={styles.actionsView}>
          <Button
            onPress={() => console.log("Cerrar sesión")}
            title="Cerrar sesión"
            colorText={colors.gray[500]}
          />

          <Button
            onPress={() => console.log("Eliminar cuenta")}
            title="Eliminar cuenta"
            colorText={colors.red[500]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.gray[50],
  },
  main: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    marginHorizontal: "auto",
    marginTop: "10%",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  user: {
    fontSize: 20,
    color: colors.gray[500],
    margin: 10,
    textAlign: "center",
  },
  linkView: {
    marginTop: "20%",
    alignItems: "flex-start",
  },
  linkButton: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 16,
    fontWeight: "600",
  },
  linkIcon: {
    marginRight: 10,
    color: colors.gray[600],
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "20%",
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "50%",
    margin: 10,
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    borderColor: colors.green[500],
    borderWidth: 3,
    borderRadius: 100,
  },
  actionsView: {
    position: "absolute",
    bottom: "5%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
