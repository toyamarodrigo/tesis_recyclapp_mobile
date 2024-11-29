import { Alert, ScrollView, View } from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Button, Text, Title, IconButton } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { useAppTheme } from "src/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { PasswordInput } from "@components/PasswordInput";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Este campo no puede estar vacio" }),
    newPassword: z
      .string()
      .min(8, "La contraseña debe tener 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
      .regex(/\d/, "Debe contener al menos un número")
      .regex(
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
        "Debe contener al menos un carácter especial"
      ),
    repeatNewPassword: z.string(),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "La nueva contraseña no puede ser la misma que la actual",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "La nueva contraseña no coincide",
    path: ["repeatNewPassword"],
  });

export default function ChangePassword() {
  const theme = useAppTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user: userClerk } = useUser();
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await userClerk?.updatePassword({
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        signOutOfOtherSessions: true,
      });
      Alert.alert(
        "¡Operación exitosa!",
        "Se cambió la contraseña con éxito. Su sesión se cerrará en el resto de los dispositivos y deberá volver a ingresar."
      );
      reset();
      router.replace("/profile");
    } catch (error) {
      Alert.alert(
        "Error",
        "Ocurrió un error al actualizar la contraseña. Intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    reset();
    router.push("/profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>
          Cambiar contraseña
        </Title>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={{ flex: 1, width: "100%" }}>
          <View style={{ flex: 1, width: "100%" }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16 }}>Contraseña actual</Text>
              <Controller
                control={control}
                name="currentPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.currentPassword && (
                <Text style={{ color: "red" }}>
                  {errors.currentPassword.message}
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16 }}>Nueva contraseña</Text>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.newPassword && (
                <Text style={{ color: "red" }}>
                  {errors.newPassword.message}
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16 }}>Repetir nueva contraseña</Text>
              <Controller
                control={control}
                name="repeatNewPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.repeatNewPassword && (
                <Text style={{ color: "red" }}>
                  {errors.repeatNewPassword.message}
                </Text>
              )}
            </View>
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
            <View style={{ flex: 1 }} />
            <View style={{ marginBottom: 20 }}>
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={{ marginBottom: 10 }}
                loading={isLoading}
                disabled={isLoading}
              >
                Cambiar contraseña
              </Button>
              <Button
                mode="contained"
                onPress={onCancel}
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.onErrorContainer}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
