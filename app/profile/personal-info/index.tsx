import { useState, useCallback } from "react";
import { View, ScrollView, Alert, RefreshControl } from "react-native";
import { useForm, Controller } from "react-hook-form";
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
import { isClerkAPIResponseError, useUser } from "@clerk/clerk-expo";
import { useUserStoreByClerk } from "@hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function PersonalInfo() {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useAppTheme();
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  if (!isSignedIn || !user?.id) return null;
  const { data: userStore, refetch } = useUserStoreByClerk({ userId: user.id });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
        if (isClerkAPIResponseError(error)) {
          return Alert.alert("Error", error.errors[0].longMessage);
        }

        return Alert.alert(
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([user.reload(), refetch()]);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudieron actualizar los datos. Intente nuevamente."
      );
    } finally {
      setRefreshing(false);
    }
  }, [user, refetch]);

  if (!user) {
    onCancel();
    router.push("/profile");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 16,
        height: "100%",
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary, fontWeight: 700 }}>
          Datos personales
        </Title>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
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
