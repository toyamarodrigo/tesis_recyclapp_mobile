import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { type Resolver, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  TextInput,
  Text,
  Button,
  Title,
  IconButton,
  Icon,
} from "react-native-paper";
import { useAppTheme } from "src/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useUserStoreByClerk } from "@hooks/useUser";

type FormValues = {
  name: string;
  surname: string;
  username: string;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  surname: z.string().min(1, { message: "El apellido es obligatorio." }),
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
});

const resolver: Resolver<FormValues> = async (values) => {
  try {
    const validatedData = formSchema.parse(values);
    return {
      values: validatedData,
      errors: {},
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce(
        (acc, curr) => {
          const path = curr.path[0] as keyof FormValues;
          acc[path] = {
            type: curr.code,
            message: curr.message,
          };
          return acc;
        },
        {} as Record<keyof FormValues, { type: string; message: string }>
      );

      return {
        values: {},
        errors: errors,
      };
    }
    return {
      values: {},
      errors: {
        name: {
          type: "validation",
          message: "An unexpected error occurred",
        },
      },
    };
  }
};

export default function PersonalInfo() {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const theme = useAppTheme();
  const router = useRouter();
  const { user } = useUser();
  const { data: userStore } = useUserStoreByClerk();

  const {
    control,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: user?.firstName ?? "",
      surname: user?.lastName ?? "",
      username: user?.username ?? "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    if (user) {
      try {
        await user.update({
          firstName: formData.name,
          lastName: formData.surname,
          username: formData.username,
        });
        Alert.alert(
          "¡Operación exitosa!",
          "Se actualizaron sus datos correctamente."
        );
        onCancel();
        router.replace("/profile");
      } catch (error) {
        Alert.alert(
          "Error",
          "Ocurrió al actualizar sus datos. Intente nuevamente."
        );
      }
    }
  };

  const onCancel = () => {
    setIsEditable(false);
    reset();
  };

  if (!user) {
    onCancel();
    router.push("/profile");
  }

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Datos personales</Title>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={{ width: "100%" }}>
          {/* Name Input */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nombre"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={!!errors.name}
                disabled={!isEditable}
                style={{ marginBottom: 20 }}
              />
            )}
          />
          {errors.name && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.name.message}
            </Text>
          )}

          {/* Surname Input */}
          <Controller
            control={control}
            name="surname"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Apellido"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={!!errors.surname}
                disabled={!isEditable}
                style={{ marginBottom: 20 }}
              />
            )}
          />
          {errors.surname && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.surname.message}
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
                disabled={!isEditable}
                style={{ marginBottom: 20 }}
              />
            )}
          />
          {errors.username && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.username.message}
            </Text>
          )}

          {userStore && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Icon
                  source="tag-multiple"
                  color={theme.colors.tertiary}
                  size={20}
                />
                <Text style={{ marginLeft: 10 }}>Perfil Tienda</Text>
              </View>
              <Text style={{ color: theme.colors.tertiary, fontSize: 12 }}>
                Recuerda que para realizar gestiones del perfil Tienda debes
                dirigirte a nuestro sitio web.
              </Text>
            </View>
          )}
        </View>

        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 20 }}>
          {isEditable ? (
            <View>
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={{ marginBottom: 10 }}
              >
                Confirmar cambios
              </Button>
              <Button
                mode="contained"
                onPress={onCancel}
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.onErrorContainer}
              >
                Cancelar
              </Button>
            </View>
          ) : (
            <Button mode="contained" onPress={() => setIsEditable(true)}>
              Modificar mis datos
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
