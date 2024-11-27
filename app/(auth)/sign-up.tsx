import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { theme } from "src/theme";
import { Button, TextInput } from "react-native-paper";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { PasswordInput } from "@components/PasswordInput";
import { useCreateUserCustomer } from "@hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";

type FormValues = {
  emailAddress: string;
  password: string;
  repeatPassword: string;
  username: string;
  firstName: string;
  lastName: string;
};

const formSchema = z
  .object({
    emailAddress: z
      .string()
      .email({ message: "El formato de email es incorrecto." }),
    password: z
      .string()
      .min(8, "La contraseña debe tener 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
      .regex(/\d/, "Debe contener al menos un número")
      .regex(
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
        "Debe contener al menos un carácter especial"
      ),
    repeatPassword: z.string(),
    username: z
      .string()
      .min(4, {
        message: "El nombre de usuario debe tener al menos 4 caracteres.",
      })
      .max(60, {
        message: "El nombre de usuario no puede superar los 60 caracteres.",
      })
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "El nombre de usuario solo puede contener letras, números, guiones bajos '_' o guiones '-'"
      ),
    firstName: z.string().min(1, { message: "El nombre es obligatorio." }),
    lastName: z.string().min(1, { message: "El apellido es obligatorio." }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
  });

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const { mutateAsync: createUserDB } = useCreateUserCustomer();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      emailAddress: "",
      password: "",
      repeatPassword: "",
      username: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    onSignUpPress(formData);
  };

  const onSignUpPress = async (formData: FormValues) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: formData.emailAddress,
        password: formData.password,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      // console.log(err);
      if (isClerkAPIResponseError(err)) {
        console.log("err", err.errors);
        console.log("err", err.message);
        console.log("err", err.errors[0].code);

        if (
          err.errors[0].code === "form_identifier_exists" ||
          err.errors[0].code === "user_already_exists"
        ) {
          return Alert.alert("Error", "El nombre de usuario ya existe.");
        }

        return Alert.alert("Error", err.errors[0].longMessage);
      }

      return Alert.alert("Error", "Ocurrió un error. Intente nuevamente.");
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        return Alert.alert("Código inválido. Por favor, intenta nuevamente.");
      }

      if (!completeSignUp.createdUserId)
        return Alert.alert("Error", "Usuario no creado");

      await createUserDB({
        userId: completeSignUp.createdUserId,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.replace("/");
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        return Alert.alert("Error", err.errors[0].longMessage);
      }

      return Alert.alert("Error", "Ocurrió un error. Intente nuevamente.");
    }
  };

  return (
    <View style={styles.containerLogin}>
      {!pendingVerification && (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <View style={{ width: "100%" }}>
            {/* Name Input */}
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: "El nombre es obligatorio",
                min: { value: 1, message: "El nombre es obligatorio" },
                max: { value: 60, message: "No debe superar 60 caracteres" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Nombre"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.firstName}
                  style={{ marginBottom: 20 }}
                />
              )}
            />
            {errors.firstName && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.firstName.message}
              </Text>
            )}

            {/* Surname Input */}
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: "El apellido es obligatorio",
                min: { value: 1, message: "El apellido es obligatorio" },
                max: { value: 60, message: "No debe superar 60 caracteres" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Apellido"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.lastName}
                  style={{ marginBottom: 20 }}
                />
              )}
            />
            {errors.lastName && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.lastName.message}
              </Text>
            )}

            {/* Mail Input */}
            <Controller
              control={control}
              name="emailAddress"
              rules={{
                required: "El mail es obligatorio",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Mail"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.emailAddress}
                  style={{ marginBottom: 20 }}
                />
              )}
            />
            {errors.emailAddress && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.emailAddress.message}
              </Text>
            )}

            {/* Username Input */}
            <Controller
              control={control}
              name="username"
              rules={{
                required: "El nombre de usuario es obligatorio",
                min: {
                  value: 4,
                  message: "Debe tener 4 caracteres como mínimo",
                },
                max: {
                  value: 60,
                  message: "Debe tener 60 caracteres como máximo",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Nombre de usuario"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.username}
                  style={{ marginBottom: 20 }}
                />
              )}
            />
            {errors.username && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.username.message}
              </Text>
            )}

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}

            <Controller
              control={control}
              name="repeatPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.repeatPassword && (
              <Text style={{ color: "red" }}>
                {errors.repeatPassword.message}
              </Text>
            )}

            <View style={styles.buttonBox}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
                  La contraseña debe tener:{" "}
                </Text>
                <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
                  8 caracteres.
                </Text>
                <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
                  Al menos una letra mayúscula.
                </Text>
                <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
                  Al menos una letra minúscula.
                </Text>
                <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
                  Al menos un número.
                </Text>
                <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
                  Al menos un caracter especial.
                </Text>
              </View>
              <Button
                onPress={handleSubmit(onSubmit)}
                buttonColor={theme.colors.tertiaryContainer}
                textColor={theme.colors.onTertiaryContainer}
              >
                <Text style={styles.text}>Crear cuenta</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
      {pendingVerification && (
        <Fragment>
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
        </Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
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
