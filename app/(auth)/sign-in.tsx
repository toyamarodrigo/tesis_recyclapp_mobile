import { useSignIn, isClerkAPIResponseError } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, Alert, SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { theme } from "src/theme";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";

type FormValues = {
  emailAddress: string;
  password: string;
};

const formSchema = z.object({
  emailAddress: z.string().email("Ingrese un email válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSignInPress = async (data: FormValues) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.emailAddress,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) {
        return Alert.alert("Error", err.errors[0].longMessage);
      }

      return Alert.alert("Error", "Ocurrió un error. Intente nuevamente.");
    }
  };

  return (
    <SafeAreaView style={styles.containerLogin}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={require("assets/images/icon.png")}
          contentFit="cover"
        />
      </View>

      <Controller
        control={control}
        name="emailAddress"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            value={value}
            placeholder="Mail"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.emailAddress}
            style={styles.textStyle}
          />
        )}
      />
      {errors.emailAddress && (
        <Text style={styles.errorText}>{errors.emailAddress.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.password}
            style={styles.textStyle}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <View style={styles.buttonBox}>
        <Button
          onPress={handleSubmit(onSignInPress)}
          buttonColor={theme.colors.secondaryContainer}
          textColor={theme.colors.onSecondaryContainer}
        >
          <Text style={styles.text}>Ingresar</Text>
        </Button>
      </View>

      <View style={styles.buttonBox}>
        <Link href="/(auth)/password-reset" asChild>
          <Text style={styles.textForgot}>Olvidé mi contraseña</Text>
        </Link>
      </View>

      <View style={{ flex: 1 }} />
      <View style={styles.textOptions}>
        <Text style={styles.textForgot}>¿No tienes cuenta?</Text>
        <Link href="/(auth)/sign-up" asChild>
          <Button
            buttonColor={theme.colors.tertiaryContainer}
            textColor={theme.colors.onTertiaryContainer}
          >
            <Text style={styles.text}>Registrarse</Text>
          </Button>
        </Link>
      </View>
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
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.background,
  },
  textStyle: {
    fontWeight: "500",
    fontSize: 18,
    borderColor: theme.colors.secondaryContainer,
    borderWidth: 1,
    margin: 8,
    color: theme.colors.onSurfaceVariant,
  },
  buttonBox: {
    margin: 8,
  },
  text: {
    fontWeight: 500,
    fontSize: 18,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    padding: 10,
  },
  textForgot: {
    textAlign: "center",
    fontSize: 16,
    margin: 8,
  },
  textOptions: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
  },
  errorText: {
    color: theme.colors.error,
    marginLeft: 10,
    fontSize: 14,
  },
});
