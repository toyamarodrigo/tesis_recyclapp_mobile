import { StyleSheet, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useUser } from "@hooks/useUser";
import { colors } from "@constants/colors.constant";
import { Image } from "expo-image";
import { useAssets } from "expo-asset";

const Profile = () => {
  const { user } = useLocalSearchParams();

  const { data } = useUser(user as string);

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
        <View style={{ flex: 1 }}>
          <Image
            source={
              "https://media.airedesantafe.com.ar/p/cef46f680e54ca2de6aa212dc19fe326/adjuntos/268/imagenes/002/132/0002132396/1200x675/smart/guillermo-francella-tiene-coronavirus.png"
            }
            style={{ flex: 1, width: "100%", backgroundColor: "red" }}
          />
        </View>
        <Text style={styles.user}>@usuario{data?.name}</Text>
        <Link href="/personal-info" style={styles.linkButton}>
          Datos personales
        </Link>
        <Link href="/" style={styles.linkButton}>
          Mis direcciones
        </Link>
        <Link href="/" style={styles.linkButton}>
          Notificaciones
        </Link>
        <Link href="/" style={styles.linkButton}>
          Mis beneficios
        </Link>
        <Link href="/" style={styles.linkButton}>
          Mis cobros
        </Link>
        <Link href="/" style={styles.linkButton}>
          Cambiar contraseña
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.gray[50],
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    maxWidth: 960,
    marginHorizontal: "auto",
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
    fontSize: 24,
    color: "#38434D",
    marginTop: 16,
  },
  linkButton: {
    fontSize: 14,
    color: "#1B95E0",
    marginTop: 16,
  },
});

export default Profile;
