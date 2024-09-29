import { colors } from "@constants/colors.constant";
import { View } from "react-native";
import { useUser } from "@hooks/useUser";
import { Resolver, useForm, Controller } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  TextInput,
  Switch,
  Text,
  Button,
  Title,
  Surface,
} from "react-native-paper";
import { useAppTheme } from "src/theme";
import { useUserStore } from "@stores/useUserStore";
import { useBenefitStore } from "@stores/useBenefit";

type FormValues = {
  name: string;
  surname: string;
  mail: string;
  phone: string;
  isStore: boolean;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  surname: z.string().min(1, { message: "El apellido es obligatorio." }),
  mail: z.string().email({ message: "El formato de email es incorrecto." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, {
      message: "Debe ingresar los 10 números luego del + 54 9",
    })
    .max(10, { message: "Debe ingresar los 10 números luego del + 54 9" }),
  isStore: z.boolean().optional(),
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
  const { user } = useUserStore();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const theme = useAppTheme();

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
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      mail: user?.mail ?? "",
      phone: user?.phone ?? "",
    },
  });

  const watchIsStore = useWatch({
    control,
    name: "isStore",
    defaultValue: false,
  });

  const onSubmit = async (data: any) => {
    console.log("data", data);
    setIsEditable(false);
  };

  const onCancel = () => {
    setIsEditable(false);
    reset();
  };

  const handleChangePhone = (text) => {
    if (text.length > 9) return;
    const numericText = text.replace(/[^0-9]/g, "");
    setValue("phone", numericText);
  };

  return (
    <Surface style={{ flex: 1, padding: 24 }}>
      <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
        <Title style={{ color: theme.colors.primary, marginBottom: 20 }}>
          Datos personales
        </Title>
        <View style={{ flex: 1, width: "100%" }}>
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
            <Text style={{ color: "red" }}>{errors.name.message}</Text>
          )}

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
            <Text style={{ color: "red" }}>{errors.surname.message}</Text>
          )}

          <Controller
            control={control}
            name="mail"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Mail"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={!!errors.mail}
                disabled={!isEditable}
                style={{ marginBottom: 20 }}
              />
            )}
          />
          {errors.mail && (
            <Text style={{ color: "red" }}>{errors.mail.message}</Text>
          )}

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Teléfono"
                onChangeText={(text) => {
                  handleChangePhone(text);
                  onChange(text);
                }}
                onBlur={onBlur}
                value={value}
                error={!!errors.phone}
                disabled={!isEditable}
                keyboardType="numeric"
                style={{ marginBottom: 20 }}
              />
            )}
          />
          {errors.phone && (
            <Text style={{ color: "red" }}>{errors.phone.message}</Text>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text>Soy tienda</Text>
            <Controller
              control={control}
              name="isStore"
              render={({ field: { onChange, value } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  disabled={!isEditable}
                />
              )}
            />
          </View>

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
                mode="outlined"
                onPress={onCancel}
                textColor={theme.colors.error}
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
      </View>
    </Surface>
  );
}
