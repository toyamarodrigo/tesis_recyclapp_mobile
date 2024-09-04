import { View } from "react-native";
import { z } from "zod";
import {
  Resolver,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  Controller,
} from "react-hook-form";
import { useUser } from "@hooks/useUser";
import { TextInput, Button, Text } from "react-native-paper";

import { useState } from "react";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const formSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Este campo no puede estar vacio" }),
  newPassword: z
    .string()
    .min(1, { message: "Este campo no puede estar vacio" }),
  repeatNewPassword: z
    .string()
    .min(1, { message: "Este campo no puede estar vacio" }),
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
    }
    return {
      values: {},
      errors: {
        currentPassword: {
          type: "validation",
          message: "An unexpected error occurred",
        },
      },
    };
  }
};

export default function ChangePassword() {
  const { data: userData } = useUser("cleuipzo60002v8fcwfmyp9xk");

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("data", data);
  };

  const onCancel = () => {
    reset();
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Cambiar contraseña
        </Text>
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
              <Text style={{ color: "red" }}>{errors.newPassword.message}</Text>
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
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={{ marginBottom: 10 }}
          >
            Cambiar contraseña
          </Button>
          <Button mode="outlined" onPress={onCancel}>
            Cancelar
          </Button>
        </View>
      </View>
    </View>
  );
}

const PasswordInput = ({
  value,
  onChangeText,
  onBlur,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      style={{ marginTop: 10 }}
      secureTextEntry={!show}
      maxLength={10}
      mode="outlined"
      right={
        <TextInput.Icon
          icon={show ? "eye-off" : "eye"}
          size={20}
          onPress={() => setShow(!show)}
        />
      }
    />
  );
};
