import * as React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { theme } from "src/theme";
import { Button } from "react-native-paper";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setPendingVerification(true);
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.containerLogin}>
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
            style={styles.textStyle}
          />
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.textStyle}
          />
          <View style={styles.buttonBox}>
            <Button
              onPress={onSignUpPress}
              buttonColor={theme.colors.tertiaryContainer}
              textColor={theme.colors.onTertiaryContainer}
            >
              <Text style={styles.text}>Crear cuenta</Text>
            </Button>
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <Text style={styles.text}>
            Ingresa el código de 6 dígitos que fue enviado a tu casilla para
            confirmar la creación de la cuenta.
          </Text>
          <TextInput
            value={code}
            placeholder="Código"
            onChangeText={(code) => setCode(code)}
            style={styles.textStyle}
          />
          <View style={styles.buttonBox}>
            <Button
              onPress={onPressVerify}
              buttonColor={theme.colors.tertiaryContainer}
              textColor={theme.colors.onTertiaryContainer}
            >
              <Text style={styles.text}>Verificar email</Text>
            </Button>
          </View>
        </>
      )}
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
