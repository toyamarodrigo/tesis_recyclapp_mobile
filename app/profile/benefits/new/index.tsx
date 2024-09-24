import { View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Surface,
  Title,
  Text,
  TextInput,
} from "react-native-paper";
import { theme } from "src/theme";
import { useRouter } from "expo-router";
import { Resolver, useForm, Controller } from "react-hook-form";
import { z } from "zod";

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

export default function NewBenefits({ currentId }: { currentId: string }) {
  const router = useRouter();
  function addThreeMonths(date: Date): Date {
    const nuevaFecha = new Date(date); // Clonar la fecha original
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 3); // Sumar 3 meses
    return nuevaFecha;
  }

  const fechaOriginal = new Date("2024-01-15");
  const nuevaFecha = addThreeMonths(fechaOriginal);

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
      id: currentId ?? null,
      name: "",
      type: BenefitTypeList[0],
      endDate: nuevaFecha, // new Date().toISOString(),
      quantity: 1,
      pointsCost: 1,
      userStoreId: "1", // TODO de donde sale esto
      isActive: true,
    },
  });

  return (
    <View
      style={{ flex: 1, alignItems: "flex-start", padding: 24, width: "100%" }}
    >
      <Title style={{ color: theme.colors.primary, marginBottom: 20 }}>
        Beneficio {currentId != "" ? "nuevo" : "nombrecito"}
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
              // error={!!errors.name}
              // disabled={!isEditable}
              style={{ marginBottom: 20 }}
            />
          )}
        />
        <View style={{ gap: 15 }}>
          <Button
            mode="contained"
            // disabled={}
            onPress={() => console.log("crear nuevo beneficio")}
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
      </View>
    </View>
  );
}
