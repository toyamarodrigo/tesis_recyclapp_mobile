import { Link, Redirect, router } from "expo-router";
import { SafeAreaView, View, Image, Alert, ScrollView } from "react-native";
import {
  IconButton,
  Text,
  TextInput,
  SegmentedButtons,
  RadioButton,
  Button,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { IMAGE } from "@constants/image.constant";
import * as FileSystem from "expo-file-system";
import { getFileExtension } from "@utils/helpers";

import { useCreatePost } from "@hooks/usePost";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import { useAuth, useUser } from "@clerk/clerk-expo";
import type { PostCreate } from "@models/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCloudinary } from "@hooks/useImage";

const postSchema = z.object({
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

export default function NewPost() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(null);
  if (!isLoaded || !isSignedIn || !user) return <Redirect href="/sign-in" />;
  const { uploadImage, isUploading } = useCloudinary();

  const {
    mutateAsync: createPost,
    isPending,
    isError,
    error,
  } = useCreatePost();
  const { data: materials } = useMaterialProductList();

  const { control, handleSubmit, setValue } = useForm<PostCreate>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: "",
      quantity: 0,
      purpouse: "WANT",
      pointsAwarded: 100,
      userId,
      username: user.username ?? "",
    },
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted)
      return Alert.alert("Se necesitan permisos para acceder a las fotos.");

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
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

  const onSubmit = async (values: PostCreate) => {
    const body = {
      ...values,
      pointsAwarded: values.purpouse === "WANT" ? 100 : 200,
    };

    if (!image) return Alert.alert("Error", "Selecciona una imagen primero.");

    try {
      const res = await createPost(body);
      if (!res?.id)
        return Alert.alert("Error", "Error al crear la publicación.");

      const fileInfo = await FileSystem.getInfoAsync(image);
      const fileUri = fileInfo.uri;
      const fileExtension = getFileExtension(image);
      const fileWithExtension = `${res.id}${fileExtension}`;

      await uploadImage({
        fileUri,
        publicId: res.id,
        folder: `${IMAGE.POST_UPLOAD}`,
        file: fileWithExtension,
      });

      Alert.alert("¡Éxito!", "Se publicó correctamente");

      router.replace("/feed");
    } catch (error) {
      Alert.alert("Error", "Error al subir la imagen.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/(home)/feed" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Text variant="titleLarge">Nueva publicación</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 16 }}>
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
                    })) ?? []
                  }
                  style={{ marginBottom: 16 }}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextInput
                  label="Description"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  error={!!error}
                  style={{ marginBottom: 16 }}
                />
              )}
            />

            <Controller
              control={control}
              name="quantity"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextInput
                  label="Quantity"
                  value={value.toString()}
                  onChangeText={(text) => onChange(+text || 0)}
                  keyboardType="numeric"
                  error={!!error}
                  style={{ marginBottom: 16 }}
                />
              )}
            />
            <Controller
              control={control}
              name="purpouse"
              render={({ field: { onChange, value } }) => (
                <View style={{ marginBottom: 16 }}>
                  <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                    ¿Lo necesita o lo ofrece?
                  </Text>
                  <RadioButton.Group
                    onValueChange={(newValue) => {
                      onChange(newValue);
                      setValue(
                        "pointsAwarded",
                        newValue === "WANT" ? 100 : 200
                      );
                    }}
                    value={value}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <RadioButton.Item label="Necesito" value="WANT" />
                      <RadioButton.Item label="Ofrezco" value="HAVE" />
                    </View>
                  </RadioButton.Group>
                </View>
              )}
            />
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
                ) : null}
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
          </View>
        </ScrollView>

        <View style={{ padding: 16, backgroundColor: "white" }}>
          <Button
            icon="check"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isPending || isUploading}
            disabled={isPending || isUploading}
          >
            Publicar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
