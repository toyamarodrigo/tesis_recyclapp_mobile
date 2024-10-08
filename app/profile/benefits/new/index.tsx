import { ScrollView, View } from "react-native";
import { Button, Title, Text, TextInput, IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { Link, useRouter } from "expo-router";
import { type Resolver, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@stores/useUserStore";
import { useBenefitStore } from "@stores/useBenefit";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fragment, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const BenefitSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const BenefitTypeList = [
  {
    id: "DISCOUNT",
    name: "DESCUENTO",
  },
  {
    id: "PRODUCT",
    name: "PRODUCTO",
  },
  {
    id: "DOUBLEPRODUCT",
    name: "PRODUCTO_DOBLE",
  },
];

// enum BenefitType {
//   DISCOUNT
//   PRODUCT
//   DOUBLEPRODUCT
// }

type BenefitType = z.infer<typeof BenefitSchema>;

type FormValues = {
  id: string | null;
  name: string;
  type: BenefitType;
  endDate: Date; // new Date().toISOString(),
  quantity: number;
  pointsCost: number;
  userStoreId: string;
  isActive: boolean;
};

const formSchema = z.object({
  name: z.string().min(3, { message: "El nombre es obligatorio." }),
  type: z.enum(["DISCOUNT", "PRODUCT", "DOUBLEPRODUCT"]),
  endDate: z.coerce.date(), // new Date().toISOString(),
  quantity: z.number().min(1).max(100),
  pointsCost: z.number().min(1).max(100),
  isActive: z.boolean(),
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

export default function NewBenefits() {
  const { userStore } = useUserStore();
  const { currentBenefit } = useBenefitStore();
  const router = useRouter();

  function addMonths(date: Date, months: number): Date {
    const nuevaFecha = new Date(date);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + months);
    return nuevaFecha;
  }
  const currentDate = new Date();
  const newDate = addMonths(currentDate, 3);
  const minDate = addMonths(currentDate, 1);
  const maxDate = addMonths(currentDate, 6);
  const [selectedDate, setSelectedDate] = useState(newDate);

  console.log(currentDate, newDate);

  const onSubmit = async (data: FormValues) => {
    console.log("nuevo beneficio", data);
    router.replace("/profile/benefits");
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
      id: currentBenefit?.id ?? null,
      name: currentBenefit?.name ?? "",
      type: BenefitTypeList[0],
      endDate: newDate, // new Date().toISOString(), //currentBenefit?.endDate ??
      quantity: currentBenefit?.quantity ?? 1,
      pointsCost: currentBenefit?.pointsCost ?? 1,
      userStoreId: currentBenefit?.userStoreId ?? "1",
      isActive: currentBenefit?.isActive ?? true,
    },
  });

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
                  // error={!!errors.name}
                  style={{ marginBottom: 20 }}
                />
              )}
            />

            {errors.name && (
              <Text style={{ color: "red" }}>{errors.name.message}</Text>
            )}
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <Fragment>
                  <TextInput
                    label="Fecha"
                    onChangeText={(text) => {
                      onChange(text); // Esto actualizará el valor en el control
                    }}
                    onBlur={onBlur}
                    value={
                      value
                        ? Number.isNaN(new Date(value).getTime())
                          ? ""
                          : `${("0" + new Date(value).getDate()).slice(-2)}-${("0" + (new Date(value).getMonth() + 1)).slice(-2)}-${new Date(value).getFullYear()}`
                        : ""
                    } // Formato dd-mm-yyyy
                    error={!!errors.endDate}
                    style={{ marginBottom: 20 }}
                    onFocus={showDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={selectedDate}
                minimumDate={minDate}
                maximumDate={maxDate}
                    onConfirm={(date) => {
                  const isoString = date.toISOString(); // Convierte la fecha a string ISO
                      onChange(isoString); // Actualiza el valor en el control
                      handleConfirm(date); // Maneja la confirmación
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
        >
          Crear nuevo beneficio
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => router.push("/profile/benefits")}
        >
          Cancelar
        </Button>
      </View>
    </SafeAreaView>
  );
}
