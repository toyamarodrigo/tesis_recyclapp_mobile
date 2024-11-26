import { useSignIn, isClerkAPIResponseError } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
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
  emailAddress: z
    .string()
    .min(1, "El email o nombre de usuario es requerido")
    .refine((value) => {
      if (value.includes("@")) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      return true;
    }, "El formato del email no es válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  if (!isLoaded) return null;

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
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        if (
          err.errors[0].code === "form_param_format_invalid" ||
          err.errors[0].code === "form_password_incorrect"
        ) {
          return Alert.alert(
            "Error",
            "El email o nombre de usuario o la contraseña son inválidos"
          );
        }

        return Alert.alert("Error", err.errors[0].longMessage);
      }

      return Alert.alert("Error", "Ocurrió un error. Intente nuevamente.");
    }
  };

  return (
    <SafeAreaView style={styles.containerLogin}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "android" ? -64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
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
                  placeholder="Email / Usuario"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.emailAddress}
                  style={styles.textStyle}
                />
              )}
            />
            {errors.emailAddress && (
              <Text style={styles.errorText}>
                {errors.emailAddress.message}
              </Text>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.registerContainer}>
        <Text style={styles.textForgot}>¿No tienes cuenta?</Text>
        <Link href="/(auth)/sign-up" asChild>
          <Button
            style={styles.registerButton}
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
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 120,
  },
  contentContainer: {
    flex: 1,
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
  errorText: {
    color: theme.colors.error,
    marginLeft: 10,
    fontSize: 14,
  },
  registerContainer: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.outline,
  },
  registerButton: {
    margin: 10,
    width: "100%",
  },
});
