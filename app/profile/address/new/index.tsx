import { ScrollView, View } from "react-native";
import { Button, Title, Text, TextInput, IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { Link, useRouter } from "expo-router";
import { type Resolver, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useAddressStore } from "@stores/useAddressStore";
import { SafeAreaView } from "react-native-safe-area-context";
import type { AddressPost, AddressPut } from "@models/address.type";
import { useCreateAddress, useUpdateAddress } from "@hooks/useAddress";
import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";

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

const prepareAddressData = (
  formData: FormValues,
  userId: string
): AddressPost => {
  const addressData: AddressPost = {
    street: formData.street,
    city: formData.city,
    state: formData.state,
    postalCode: formData.postalCode,
    userId: userId,
    isArchived: false,
  };

  return addressData;
};

export default function NewAddress() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user?.id) {
    return null;
  }

  const { currentAddress, clearCurrentAddress } = useAddressStore();
  const router = useRouter();
  const { mutateAsync: createAddress, isPending: isLoadingCreate } =
    useCreateAddress();
  const { mutateAsync: editAddress, isPending: isLoadingEdit } =
    useUpdateAddress();

  const handleCancel = () => {
    reset();
    clearCurrentAddress();
    router.replace("/profile/address");
  };

  const handleCreate = async (address: AddressPost) => {
    await createAddress(address);
  };

  const handleEdit = async (address: AddressPut) => {
    await editAddress(address);
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      const addressData = prepareAddressData(formData, user.id);
      if (currentAddress) {
        await handleEdit({
          ...addressData,
          id: currentAddress.id,
        });
      } else {
        await handleCreate(addressData);
      }

      handleCancel();
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

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
      street: currentAddress?.street || "",
      flat: currentAddress?.flat || "",
      city: currentAddress?.city || "",
      state: currentAddress?.state || "",
      postalCode: currentAddress?.postalCode || "",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile/address" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>
          Dirección {currentAddress?.street || "nueva"}
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
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isLoadingCreate || isLoadingEdit}
          disabled={isLoadingCreate || isLoadingEdit}
        >
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
