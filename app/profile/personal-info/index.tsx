import { colors } from "@constants/colors.constant";
import { StyleSheet, Text, View, TextInput, Switch } from "react-native";
import { useUser } from "@hooks/useUser";
import { Resolver, useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { z } from "zod";
import Button from "@components/Button";
import { useState } from "react";

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
  const { data } = useUser("cleuipzo60002v8fcwfmyp9xk"); // esto hay que storearlo y que siempre traiga la data storeada del usuario, evitar calls por vista
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const {
    register,
    reset,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: data?.name ?? "",
      surname: data?.surname ?? "",
      mail: data?.mail ?? "",
      phone: data?.phone ?? "",
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
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Datos personales</Text>
        <View style={styles.form}>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Nombre</Text>
            <TextInput
              {...register("name")}
              style={styles.input}
              placeholder="Nombre"
              onChangeText={(text) => setValue("name", text)}
              editable={isEditable}
              selectTextOnFocus={isEditable}
            />
            {errors.name && (
              <Text style={{ color: "red" }}>{errors.name.message}</Text>
            )}
          </View>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Apellido</Text>
            <TextInput
              {...register("surname")}
              style={styles.input}
              placeholder="Apellido"
              onChangeText={(text) => setValue("surname", text)}
              editable={isEditable}
              selectTextOnFocus={isEditable}
            />
            {errors.surname && (
              <Text style={{ color: "red" }}>{errors.surname.message}</Text>
            )}
          </View>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Mail</Text>
            <TextInput
              {...register("mail")}
              style={styles.input}
              placeholder="Mail"
              onChangeText={(text) => setValue("mail", text)}
              editable={isEditable}
              selectTextOnFocus={isEditable}
            />
            {errors.mail && (
              <Text style={{ color: "red" }}>{errors.mail.message}</Text>
            )}
          </View>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Teléfono</Text>
            <TextInput
              {...register("phone")}
              style={styles.input}
              placeholder="Ingresar los 10 números luego del + 54 9 ..."
              keyboardType="numeric"
              // maxLength={10}
              onChangeText={(text) => {
                handleChangePhone(text);
              }}
              editable={isEditable}
              selectTextOnFocus={isEditable}
            />
            {errors.phone && (
              <Text style={{ color: "red" }}>{errors.phone.message}</Text>
            )}
          </View>
          <View style={styles.formSection}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Soy tienda</Text>
              <Switch
                trackColor={{
                  false: colors.gray[200],
                  true: colors.green[500],
                }}
                thumbColor={colors.gray[50]}
                ios_backgroundColor={colors.gray[200]}
                onValueChange={(value) => {
                  setValue("isStore", value);
                }}
                value={watchIsStore}
                disabled={!isEditable}
              />
            </View>
            {errors.isStore && (
              <Text style={{ color: "red" }}>{errors.isStore.message}</Text>
            )}
          </View>
          {isEditable ? (
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleSubmit(onSubmit)}
                colorBg={colors.green[500]}
                colorText={colors.gray[50]}
                title="Confirmar cambios"
              />
              <Button
                onPress={() => onCancel()}
                colorBg={colors.gray[50]}
                colorText={colors.red[500]}
                title="Cancelar"
              />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => setIsEditable(true)}
                colorBg={colors.blue[500]}
                colorText={colors.gray[50]}
                title="Modificar mis datos"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.gray[50],
  },
  main: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 20,
    color: colors.green[500],
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 600,
  },
  form: {
    flex: 1,
    width: "100%",
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.gray[500],
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 14,
    color: colors.gray[600],
    borderColor: colors.gray[200],
    width: "100%",
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
    color: colors.gray[500],
  },
  buttonContainer: {
    // position: "absolute",
    // bottom: "5%",
    // left: 0,
    // right: 0,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // width: "100%",
  },
});
