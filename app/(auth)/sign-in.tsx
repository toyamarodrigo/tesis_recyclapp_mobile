import { useSignIn, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { theme } from "src/theme";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.containerLogin}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Mail"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={styles.textStyle}
      />
      <TextInput
        value={password}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.textStyle}
      />
      <View style={styles.buttonBox}>
        <Button
          onPress={onSignInPress}
          buttonColor={theme.colors.secondaryContainer}
          textColor={theme.colors.onSecondaryContainer}
        >
          <Text style={styles.text}>Ingresar</Text>
        </Button>
      </View>
      <View style={styles.buttonBox}>
        <Link href="/(auth)/password-reset" asChild>
          <Button
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}
          >
            <Text style={styles.text}>Olvidé mi contraseña</Text>
          </Button>
        </Link>
      </View>
      <View style={{ flex: 1 }} />
      <View style={styles.textOptions}>
        <Text style={styles.text}>¿No tienes cuenta?</Text>
        <Link href="/(auth)/sign-up" asChild>
          <Button
            buttonColor={theme.colors.tertiaryContainer}
            textColor={theme.colors.onTertiaryContainer}
          >
            <Text style={styles.text}>Registrarse</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingTop: 50,
  },
  textStyle: {
    fontWeight: 500,
    fontSize: 18,
    borderRadius: 10,
    borderColor: theme.colors.secondaryContainer,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    color: theme.colors.onSurfaceVariant,
  },
  buttonBox: {
    margin: 10,
    marginTop: 30,
  },
  text: {
    fontWeight: 500,
    fontSize: 18,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    padding: 10,
  },
  textOptions: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
