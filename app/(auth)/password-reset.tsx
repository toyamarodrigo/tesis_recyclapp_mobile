import { Fragment, useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { View, ScrollView, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Title } from "react-native-paper";
import { theme } from "src/theme";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");
  const { signIn, setActive } = useSignIn();

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err);
        setError(err);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
          maxWidth: 500,
          alignSelf: "center",
          width: "100%",
          backgroundColor: theme.colors.background,
        }}
      >
        <Title>¿Olvidaste la contraseña?</Title>
        <View style={styles.containerLogin}>
          {!successfulCreation && (
            <Fragment>
              <TextInput
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.textStyle}
                placeholder="Mail"
              />
              <View style={styles.buttonBox}>
                <Button
                  onPress={create}
                  buttonColor={theme.colors.tertiaryContainer}
                  textColor={theme.colors.onTertiaryContainer}
                >
                  <Text style={styles.text}>Enviar código al mail</Text>
                </Button>
              </View>
              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </Fragment>
          )}

          {successfulCreation && (
            <Fragment>
              <TextInput
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.textStyle}
              />

              <TextInput
                placeholder="Ingresa el código enviado a tu mail"
                value={code}
                onChangeText={setCode}
                style={styles.textStyle}
              />
              <View style={styles.buttonBox}>
                <Button
                  onPress={reset}
                  buttonColor={theme.colors.tertiaryContainer}
                  textColor={theme.colors.onTertiaryContainer}
                >
                  <Text style={styles.text}>Resetear contraseña</Text>
                </Button>
              </View>
              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </Fragment>
          )}

          {secondFactor && (
            <Text>2FA is required, but this UI does not handle that</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    fontWeight: "500",
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
    fontWeight: "500",
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
