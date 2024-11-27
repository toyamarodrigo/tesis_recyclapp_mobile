import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Button, Title, Text, TextInput, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { theme } from "src/theme";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useBenefitStore } from "@stores/useBenefitStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fragment, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BenefitPost, BenefitPut } from "@models/benefit.type";
import { useCreateBenefit, useUpdateBenefit } from "@hooks/useBenefit";
import { useUserStoreByClerk } from "@hooks/useUser";
import { BenefitType, BenefitTypeList } from "@constants/data.constant";
import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  id: string | null;
  name: string;
  type: BenefitType | string;
  endDate: Date;
  quantity: number;
  pointsCost: number;
  userStoreId: string;
};

const formSchema = z.object({
  name: z.string().min(3, { message: "El nombre es obligatorio." }),
  type: z.enum(["DISCOUNT", "PRODUCT", "DOUBLEPRODUCT"]),
  endDate: z.coerce.date(),
  quantity: z.coerce.number().min(1).max(100),
  pointsCost: z.coerce.number().min(100).max(1000),
});

function addMonths(date: Date, months: number): Date {
  const nuevaFecha = new Date(date);
  nuevaFecha.setMonth(nuevaFecha.getMonth() + months);
  return nuevaFecha;
}

export default function NewBenefits() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user?.id) return null;
  const { data: userStore } = useUserStoreByClerk({ userId: user.id });
  const { currentBenefit, clearCurrentBenefit } = useBenefitStore();
  const router = useRouter();
  const currentDate = new Date();
  const newDate = addMonths(currentDate, 3);
  const minDate = addMonths(currentDate, 1);
  const maxDate = addMonths(currentDate, 6);
  const [selectedDate, setSelectedDate] = useState(newDate);
  const { mutateAsync: createBenefit, isPending: isCreating } = useCreateBenefit();
  const { mutateAsync: editBenefit, isPending: isEditing } = useUpdateBenefit();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
      name: currentBenefit ? currentBenefit.name : "",
      type: currentBenefit ? currentBenefit.type : BenefitType.DISCOUNT,
      endDate: currentBenefit ? currentBenefit.endDate : newDate,
      quantity: currentBenefit ? currentBenefit.quantity : 1,
      pointsCost: currentBenefit ? currentBenefit.pointsCost : 100,
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleCancel = () => {
    reset();
    clearCurrentBenefit();
    router.push("/profile/benefits");
  };

  const handleCreate = async (benefit: BenefitPost) => {
    await createBenefit(benefit);
  };

  const handleEdit = async (benefit: BenefitPut) => {
    await editBenefit(benefit);
    Alert.alert("Éxito", "Se actualizó el beneficio con éxito.");
  };

  const onSubmit = (data: FormValues) => {
    const benefitData: BenefitPost = {
      name: data.name,
      displayName: user?.username ?? "",
      type: data.type,
      endDate: data.endDate,
      quantity: data.quantity,
      pointsCost: data.pointsCost,
      userStoreId: userStore?.id ?? "",
      isActive: true,
      isArchived: false,
    };

    if (currentBenefit) {
      const benefitEdit: BenefitPut = {
        ...benefitData,
        id: currentBenefit.id,
      };
      handleEdit(benefitEdit);
    } else {
      handleCreate(benefitData);
    }

    handleCancel();
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile/benefits" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>
          Beneficio {currentBenefit ? currentBenefit.name : "nuevo"}
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
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Nombre"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.name}
                  style={{
                    marginBottom: 20,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}
                />
              )}
            />

            {errors.name && (
              <Text style={{ color: "red" }}>{errors.name.message}</Text>
            )}

            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    style={styles.picker}
                  >
                    {BenefitTypeList.map((item) => (
                      <Picker.Item
                        key={item.id}
                        label={item.name}
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            />
            {errors.type && (
              <Text style={{ color: "red" }}>{errors.type.message}</Text>
            )}

            <Controller
              control={control}
              name="quantity"
              rules={{
                required: "La cantidad es obligatoria",
                min: { value: 1, message: "Debe ser al menos 1" },
                max: { value: 100, message: "No debe superar 100" },
                validate: (value) =>
                  !Number.isNaN(Number(value)) || "Debe ser un número",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Cantidad"
                  onChangeText={(text) => {
                    let numericValue = text.replace(/[^0-9]/g, "");

                    if (numericValue && Number(numericValue) > 100) {
                      numericValue = "100";
                    }

                    onChange(numericValue);
                  }}
                  onBlur={() => {
                    let numericValue = Number(value);

                    if (!numericValue || numericValue < 1) {
                      numericValue = 1;
                    }

                    if (numericValue > 100) {
                      numericValue = 100;
                    }

                    onChange(numericValue);
                    onBlur();
                  }}
                  value={value ? value.toString() : ""}
                  keyboardType="numeric"
                  style={{
                    marginBottom: 20,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}
                  error={!!errors.quantity}
                />
              )}
            />

            {errors.quantity && (
              <Text style={{ color: "red" }}>{errors.quantity.message}</Text>
            )}

            <Controller
              control={control}
              name="pointsCost"
              rules={{
                required: "El costo de puntos es obligatorio",
                min: { value: 100, message: "Debe ser al menos 100" },
                max: { value: 1000, message: "No debe superar 1000" },
                validate: (value) =>
                  !Number.isNaN(Number(value)) || "Debe ser un número",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Costo de Puntos"
                  onChangeText={(text) => {
                    let numericValue = text.replace(/[^0-9]/g, "");

                    if (numericValue && Number(numericValue) > 1000) {
                      numericValue = "1000";
                    }

                    onChange(numericValue);
                  }}
                  onBlur={() => {
                    let numericValue = Number(value);

                    if (!numericValue || numericValue < 100) {
                      numericValue = 100;
                    }

                    if (numericValue > 1000) {
                      numericValue = 1000;
                    }

                    onChange(numericValue);
                    onBlur();
                  }}
                  value={value ? value.toString() : ""}
                  keyboardType="numeric"
                  style={{
                    marginBottom: 20,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}
                  error={!!errors.pointsCost}
                />
              )}
            />

            {errors.pointsCost && (
              <Text style={{ color: "red" }}>{errors.pointsCost.message}</Text>
            )}

            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <Fragment>
                  <TextInput
                    label="Fecha"
                    onChangeText={(text) => {
                      onChange(text);
                    }}
                    onBlur={onBlur}
                    value={
                      value
                        ? Number.isNaN(new Date(value).getTime())
                          ? ""
                          : `${String(new Date(value).getDate()).padStart(
                              2,
                              "0"
                            )}-${String(
                              new Date(value).getMonth() + 1
                            ).padStart(
                              2,
                              "0"
                            )}-${new Date(value).getFullYear()}`
                        : ""
                    }
                    error={!!errors.endDate}
                    style={{
                      marginBottom: 20,
                      color: theme.colors.primary,
                      backgroundColor: theme.colors.background,
                    }}
                    onFocus={showDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={selectedDate}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    onConfirm={(date) => {
                      const isoString = date.toISOString();
                      onChange(isoString);
                      handleConfirm(date);
                    }}
                    onCancel={hideDatePicker}
                  />
                </Fragment>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 16, gap: 15 }}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isCreating || isEditing}
          disabled={isCreating || isEditing}
        >
          {currentBenefit ? "Editar beneficio" : "Crear nuevo beneficio"}
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => handleCancel()}
          buttonColor={theme.colors.errorContainer}
          textColor={theme.colors.onErrorContainer}
          disabled={isCreating || isEditing}
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
