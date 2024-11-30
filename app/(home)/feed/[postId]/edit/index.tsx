import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
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
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { theme, useAppTheme } from "src/theme";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getFileExtension } from "@utils/helpers";
import { useCloudinary } from "@hooks/useImage";
import { IMAGE } from "@constants/image.constant";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageApi } from "@api/api.imagen";
import { Image } from "expo-image";

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

export default function EditablePost() {
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const { data: post, isPending } = usePostById({ id: postId });
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const theme = useAppTheme();
  const { mutateAsync: updatePost, isError, error } = useUpdatePost();
  const { data: materials } = useMaterialProductList();
  const baseImageUrl = `${IMAGE.CLOUDINARY_URL}${IMAGE.POST_FOLDER}/${postId}.jpg`;
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
    resolver: zodResolver(postSchema),
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
          const test = await axios.get(baseImageUrl);
          if (test.status === 200) setImage(baseImageUrl);
          return;
        } catch (e) {
          setImage(
            `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post?.materialProductId}.png`
          );
          return;
        }
      })();
    }
  }, [postId, post, reset, baseImageUrl]);

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(baseImageUrl);
        if (test.status === 200) setImage(baseImageUrl);
        return;
      } catch (e) {
        setImage(
          `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post?.materialProductId}.png`
        );
        return;
      }
    })();
  }, [baseImageUrl, post?.materialProductId]);

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted)
        return Alert.alert("Se necesitan permisos para acceder a las fotos.");

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Error al seleccionar la imagen.");
    }
  };

  const onSubmit = async (formData: PostValues) => {
    if (!image) return Alert.alert("Error", "Selecciona una imagen primero.");
    await imageApi.deleteImage({ public_id: IMAGE.POST_UPLOAD + "/" + postId });

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

    await updatePost(formData);

    setIsEditable(false);

    Alert.alert(
      "¡Operación exitosa!",
      "Se actualizó la publicación correctamente."
    );

    router.replace(`/(home)/feed/${postId}`);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/(home)/feed" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={styles.title}>Publicación</Title>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Desactivar publicación</Text>
              <Text style={styles.modalText}>
                Si desactivas la publicación, no podrás volver a activarla.
              </Text>
              <Text
                style={[
                  styles.modalText,
                  styles.warningText,
                  { color: theme.colors.error },
                ]}
              >
                Esta acción es IRREVERSIBLE.
              </Text>
            </View>
            <Button
              mode="contained-tonal"
              onPress={handleConfirmModal}
              style={styles.modalButton}
              loading={isPending || isUploading}
            >
              Desactivar publicación
            </Button>
            <Button
              mode="contained"
              onPress={() => setShowModal(false)}
              buttonColor={theme.colors.errorContainer}
              textColor={theme.colors.onErrorContainer}
              style={styles.modalButton}
              disabled={isPending || isUploading}
            >
              Cancelar
            </Button>
          </Modal>
        </Portal>

        {isPending && <ActivityIndicator size="large" />}
        <View style={styles.formContainer}>
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
                style={styles.segmentedButtons}
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
                style={styles.textInput}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}

          {/* Quantity Input */}
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Cantidad"
                onChangeText={(text) => onChange(+text || 0)}
                onBlur={onBlur}
                value={value.toString()}
                keyboardType="numeric"
                error={!!errors.username}
                disabled={!isEditable}
                style={styles.textInput}
              />
            )}
          />
          {errors.quantity && (
            <Text style={styles.errorText}>{errors.quantity.message}</Text>
          )}
        </View>

        {/* Purpouse Input */}
        <Controller
          control={control}
          name="purpouse"
          render={({ field: { onChange, value } }) => (
            <View style={styles.radioGroup}>
              <Text variant="titleMedium" style={styles.radioGroupLabel}>
                ¿Lo necesita o lo ofrece?
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => {
                  onChange(newValue);
                  setValue("pointsAwarded", newValue === "WANT" ? 100 : 200);
                }}
                value={value}
              >
                <View style={styles.radioButtons}>
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
        <View style={styles.imageContainer}>
          <Text variant="titleMedium" style={styles.imageLabel}>
            Imagen
          </Text>
          <View style={styles.imageWrapper}>
            {image ? (
              <Image
                source={{ uri: `${image}?timestamp=${Date.now()}` }}
                style={styles.image}
                cachePolicy="none"
              />
            ) : (
              <ActivityIndicator size="small" />
            )}
            {isEditable && (
              <Button
                mode="outlined"
                onPress={pickImage}
                icon="camera"
                style={styles.imageButton}
              >
                {image ? "Cambiar imagen" : "Agregar imagen"}
              </Button>
            )}
          </View>
        </View>
        {isError && <Text style={styles.errorText}>{error?.message}</Text>}

        <View style={styles.spacer} />
        <View style={styles.buttonContainer}>
          {isEditable ? (
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.submitButton}
                loading={isPending || isUploading}
                disabled={isPending || isUploading}
                buttonColor={theme.colors.primaryContainer}
                textColor={theme.colors.onPrimaryContainer}
              >
                Confirmar cambios
              </Button>
              <Button
                mode="contained"
                onPress={onCancel}
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.onErrorContainer}
                disabled={isPending || isUploading}
              >
                Cancelar
              </Button>
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={() => setIsEditable(true)}
                disabled={isPending || isUploading}
                buttonColor={theme.colors.tertiaryContainer}
                textColor={theme.colors.onTertiaryContainer}
              >
                Modificar publicación
              </Button>
              <Button
                mode="contained"
                onPress={() => setShowModal(true)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    zIndex: 1,
    alignItems: "center",
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 700,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  modalContent: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 18,
    padding: 10,
  },
  modalText: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
  warningText: {
    fontWeight: "600",
  },
  modalButton: {
    margin: 10,
  },
  formContainer: {
    width: "100%",
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  textInput: {
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioGroupLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  radioButtons: {
    flexDirection: "row",
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  imageLabel: {
    marginBottom: 8,
  },
  imageWrapper: {
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  imageButton: {
    marginTop: 8,
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  submitButton: {
    marginBottom: 10,
  },
  actionButtons: {
    margin: 10,
    gap: 15,
  },
});
