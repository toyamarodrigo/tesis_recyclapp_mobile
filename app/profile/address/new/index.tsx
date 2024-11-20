import { ScrollView, View, StyleSheet } from "react-native";
import { Button, Title, Text, TextInput, IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { Link, useRouter } from "expo-router";
import { type Resolver, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useAddressStore } from "@stores/useAddressStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddressPost, AddressPut } from "@models/address.type";
import {
  useAddressById,
  useAddressClerkId,
  useCreateAddress,
  useUpdateAddress,
} from "@hooks/useAddress";
import { useUser } from "@clerk/clerk-expo";

type FormValues = {
  street: string;
  flat: string;
  city: string;
  state: string;
  postalCode: string;
};

const formSchema = z.object({
  street: z
    .string()
    .min(3, { message: "El nombre y número de la calle son obligatorios." }),
  flat: z.string().optional(),
  city: z
    .string()
    .min(3, { message: "El nombre de la localidad es obligatorio." }),
  state: z
    .string()
    .min(3, { message: "El nombre de la provincia es obligatorio." }),
  postalCode: z
    .string()
    .regex(/^\d{4}$/, "Debe ser un número de exactamente 4 dígitos"),
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
        street: {
          type: "validation",
          message: "An unexpected error occurred",
        },
      },
    };
  }
};

export default function NewAddress() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user?.id) {
    return null;
  }

  const { currentAddress, clearCurrentAddress } = useAddressStore();
  const router = useRouter();
  const { mutateAsync: createAddress } = useCreateAddress();
  const { mutateAsync: editAddress } = useUpdateAddress();
  //useAddressClerkId(user.id);

  const handleCancel = () => {
    reset();
    clearCurrentAddress();
    router.replace("/profile/address");
  };

  const handleCreate = async (address: AddressPost) => {
    await createAddress(address);
    //useAddressClerkId(user.id);
  };

  const handleEdit = async (address: AddressPut) => {
    await editAddress(address);
    //useAddressClerkId(user.id);
  };

  const onSubmit = (data: FormValues) => {
    let addressData: AddressPost = {
      street: data.street,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      userId: user?.id,
      isArchived: false,
    };

    if (data.flat && data.flat != "") {
      addressData = {
        ...addressData,
        flat: data.flat,
      };
    }

    if (currentAddress) {
      const addressEdit: AddressPut = {
        ...addressData,
        id: currentAddress.id,
      };
      handleEdit(addressEdit);
    } else {
      handleCreate(addressData);
    }

    handleCancel();
  };

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
      street: currentAddress ? currentAddress.street : "",
      flat:
        currentAddress && currentAddress.flat != null
          ? currentAddress.flat
          : "",
      city: currentAddress ? currentAddress.city : "",
      state: currentAddress ? currentAddress.state : "",
      postalCode: currentAddress ? currentAddress.postalCode : "",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile/address" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>
          Dirección {currentAddress ? currentAddress.street : "nueva"}
        </Title>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            padding: 24,
            width: "100%",
          }}
        >
          <View style={{ width: "100%" }}>
            <Controller
              control={control}
              name="street"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Calle y número"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.street}
                  style={{
                    marginBottom: 20,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}
                />
              )}
            />

            {errors.street && (
              <Text style={{ color: "red" }}>{errors.street.message}</Text>
            )}

            <Controller
              control={control}
              name="flat"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Piso / Departamento"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.flat}
                  style={{
                    marginBottom: 20,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Localidad"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.city}
                  style={{
                    marginBottom: 20,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}
                />
              )}
            />

            {errors.city && (
              <Text style={{ color: "red" }}>{errors.city.message}</Text>
            )}

            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Provincia"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.state}
                  style={{
                    marginBottom: 20,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}
                />
              )}
            />

            {errors.state && (
              <Text style={{ color: "red" }}>{errors.state.message}</Text>
            )}

            <Controller
              control={control}
              name="postalCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Código postal"
                  onChangeText={(text) => {
                    if (/^\d*$/.test(text) && text.length <= 4) {
                      onChange(text);
                    }
                  }}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="numeric"
                  style={{
                    marginBottom: 20,
                    color: "black",
                    backgroundColor: "white",
                  }}
                />
              )}
            />

            {errors.postalCode && (
              <Text style={{ color: "red" }}>{errors.postalCode.message}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 16, gap: 15 }}>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          {currentAddress ? "Editar dirección" : "Crear nueva dirección"}
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => handleCancel()}
          buttonColor={theme.colors.errorContainer}
          textColor={theme.colors.onErrorContainer}
        >
          Cancelar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: theme.colors.primary,
  },
});
