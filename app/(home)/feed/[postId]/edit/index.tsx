import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  IconButton,
  Text,
  TextInput,
  Button,
  Title,
  RadioButton,
  SegmentedButtons,
  Portal,
  Modal,
} from "react-native-paper";
import { usePostById, useUpdatePost } from "@hooks/usePost";
import React, { useEffect, useState } from "react";
import { type Resolver, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useAppTheme } from "src/theme";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getFileExtension } from "@utils/helpers";
import { useCloudinary } from "@hooks/useImage";
import { IMAGE } from "@constants/image.constant";
import axios from "axios";

type PostValues = {
  id: string;
  description: string;
  quantity: number;
  pointsAwarded: number;
  purpouse: string;
  materialProductId: string;
  userId: string;
  username: string;
};

const postSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(1, { message: "Descripción es requerida" })
    .max(250, { message: "Descripción máxima 250 caracteres" }),
  quantity: z
    .number()
    .min(1, { message: "Cantidad es requerida" })
    .max(100, { message: "Cantidad máxima: 100 unidades" }),
  pointsAwarded: z.number().min(1, { message: "Puntos es requerido" }),
  purpouse: z
    .enum(["WANT", "HAVE"], {
      message: "Proposito requerido",
    })
    .default("WANT"),
  materialProductId: z.string(),
  userId: z.string(),
  username: z.string(),
});

const resolver: Resolver<PostValues> = async (values) => {
  try {
    const validatedData = postSchema.parse(values);
    return {
      values: validatedData,
      errors: {},
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce(
        (acc, curr) => {
          const path = curr.path[0] as keyof PostValues;
          acc[path] = {
            type: curr.code,
            message: curr.message,
          };
          return acc;
        },
        {} as Record<keyof PostValues, { type: string; message: string }>
      );

      return {
        values: {},
        errors: errors,
      };
    }
    return {
      values: {},
      errors: {
        description: {
          type: "validation",
          message: "An unexpected error occurred",
        },
      },
    };
  }
};

export default function EditablePost() {
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const { data: post, isPending } = usePostById({ id: postId });
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const theme = useAppTheme();
  const { mutateAsync: updatePost, isError, error } = useUpdatePost();
  const { data: materials } = useMaterialProductList();
  const imageUrl = `${IMAGE.CLOUDINARY_URL}${IMAGE.POST_FOLDER}/${postId}.jpg?timestamp=${Date.now()}`;
  const [image, setImage] = useState<string>("");
  const { uploadImage, isUploading } = useCloudinary();
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const onCancel = () => {
    setIsEditable(false);
    reset();
  };

  const {
    control,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<PostValues>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      id: postId,
      description: post?.description ?? "",
      quantity: post?.quantity ?? 0,
      purpouse: post?.purpouse ?? "WANT",
      pointsAwarded: post?.pointsAwarded ?? 100,
      userId: post?.userId ?? "",
      username: post?.username ?? "",
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        id: postId,
        description: post.description,
        quantity: post.quantity,
        purpouse: post.purpouse,
        pointsAwarded: post.pointsAwarded,
        userId: post.userId,
        username: post.username,
        materialProductId: post.materialProductId,
      });

      (async () => {
        try {
          const test = await axios.get(imageUrl);
          if (test.status === 200) setImage(imageUrl);
          return;
        } catch (e) {
          setImage(
            `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post?.materialProductId}.png`
          );
          return;
        }
      })();
    }
  }, [post, reset]);

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(imageUrl);
        if (test.status === 200) setImage(imageUrl);
        return;
      } catch (e) {
        setImage(
          `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post?.materialProductId}.png`
        );
        return;
      }
    })();
  }, [post]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Se necesitan permisos para acceder a las fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      if (!image) {
        Alert.alert("Error", "Selecciona una imagen primero.");
        return;
      }

      const fileInfo = await FileSystem.getInfoAsync(image);
      const fileUri = fileInfo.uri;
      const fileExtension = getFileExtension(image);
      const fileWithExtension = `${postId}${fileExtension}`;

      await uploadImage({
        fileUri,
        publicId: postId,
        folder: `${IMAGE.POST_UPLOAD}`,
        file: fileWithExtension,
      });

      Alert.alert("¡Éxito!", `Se subió la imagen`);
    }
  };

  const onSubmit = async (formData: PostValues) => {
    await updatePost(formData);

    Alert.alert(
      "¡Operación exitosa!",
      "Se actualizó la publicación correctamente."
    );

    setIsEditable(false);
  };

  const handleConfirmModal = async () => {
    await updatePost({
      id: postId,
      isActive: false,
      isArchived: true,
    });

    Alert.alert(
      "¡Operación exitosa!",
      "Se desactivó la publicación correctamente."
    );

    setShowModal(false);
    router.replace("/(home)/feed");
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/(home)/feed" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Publicación</Title>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: 600, fontSize: 18, padding: 10 }}>
                Desactivar publicación
              </Text>
              <Text style={{ padding: 10, fontSize: 16, textAlign: "center" }}>
                Si desactivas la publicación, no podrás volver a activarla.
              </Text>
              <Text
                style={{
                  color: theme.colors.error,
                  fontWeight: "600",
                  fontSize: 16,
                  padding: 10,
                }}
              >
                Esta acción es IRREVERSIBLE.
              </Text>
            </View>
            <Button
              mode="contained-tonal"
              onPress={handleConfirmModal}
              style={{
                margin: 10,
              }}
            >
              Desactivar publicación
            </Button>
            <Button
              mode="contained"
              onPress={() => setShowModal(false)}
              buttonColor={theme.colors.errorContainer}
              textColor={theme.colors.onErrorContainer}
              style={{
                margin: 10,
              }}
            >
              Cancelar
            </Button>
          </Modal>
        </Portal>

        {isPending && <ActivityIndicator size="large" />}
        <View style={{ width: "100%" }}>
          {/* Materials Input */}
          <Controller
            control={control}
            name="materialProductId"
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                value={value}
                onValueChange={onChange}
                buttons={
                  materials?.map((material) => ({
                    value: material.id,
                    label: material.name,
                    disabled: !isEditable,
                  })) ?? []
                }
                style={{ marginBottom: 16 }}
              />
            )}
          />

          {/* Description Input */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Descripción"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={!!errors.description}
                disabled={!isEditable}
                style={{ marginBottom: 20 }}
              />
            )}
          />
          {errors.description && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.description.message}
            </Text>
          )}

          {/* Quantity Input */}
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Cantidad"
                onChangeText={(text) => onChange(parseInt(text) || 0)}
                onBlur={onBlur}
                value={value.toString()}
                keyboardType="numeric"
                error={!!errors.username}
                disabled={!isEditable}
                style={{ marginBottom: 20 }}
              />
            )}
          />
          {errors.quantity && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.quantity.message}
            </Text>
          )}
        </View>

        {/* Purpouse Input */}
        <Controller
          control={control}
          name="purpouse"
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: 16 }}>
              <Text
                variant="titleMedium"
                style={{
                  marginBottom: 8,
                  fontSize: 16,
                  color: theme.colors.onSurfaceVariant,
                }}
              >
                ¿Lo necesita o lo ofrece?
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => {
                  onChange(newValue);
                  setValue("pointsAwarded", newValue === "WANT" ? 100 : 200);
                }}
                value={value}
              >
                <View style={{ flexDirection: "row" }}>
                  <RadioButton.Item
                    label="Necesito"
                    value="WANT"
                    disabled={!isEditable}
                  />
                  <RadioButton.Item
                    label="Ofrezco"
                    value="HAVE"
                    disabled={!isEditable}
                  />
                </View>
              </RadioButton.Group>
            </View>
          )}
        />

        {/* Image input */}
        <View style={{ marginBottom: 16 }}>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            Imagen
          </Text>
          <View style={{ alignItems: "center" }}>
            {image ? (
              <View style={{ marginBottom: 8 }}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 8,
                  }}
                />
              </View>
            ) : (
              <ActivityIndicator size="small" />
            )}
            <Button
              mode="outlined"
              onPress={pickImage}
              icon="camera"
              style={{ marginTop: 8 }}
            >
              {image ? "Cambiar imagen" : "Agregar imagen"}
            </Button>
          </View>
        </View>
        {isError && <Text style={{ color: "red" }}>{error?.message}</Text>}

        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 20 }}>
          {isEditable ? (
            <View>
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={{ marginBottom: 10 }}
                loading={isPending || isUploading}
                disabled={isPending || isUploading}
              >
                Confirmar cambios
              </Button>
              <Button
                mode="contained"
                onPress={onCancel}
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.onErrorContainer}
                loading={isPending || isUploading}
                disabled={isPending || isUploading}
              >
                Cancelar
              </Button>
            </View>
          ) : (
            <View
              style={{
                margin: 10,
                gap: 15,
              }}
            >
              <Button
                mode="contained"
                onPress={() => setIsEditable(true)}
                loading={isPending || isUploading}
                disabled={isPending || isUploading}
                buttonColor={theme.colors.tertiaryContainer}
                textColor={theme.colors.onTertiaryContainer}
              >
                Modificar publicación
              </Button>
              <Button
                mode="contained"
                onPress={() => setShowModal(true)}
                loading={isPending || isUploading}
                disabled={isPending || isUploading}
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.onErrorContainer}
              >
                Desactivar publicación
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
