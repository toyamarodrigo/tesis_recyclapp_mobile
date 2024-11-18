import React, { useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { useUserStore } from "@stores/useUserStore";
import { CLOUDINARY } from "@constants/image.constant";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { getFileExtension } from "@utils/helpers";

interface ImageUploaderProps {
  style?: object;
  publicid: string;
  subfolder: string;
}

export default function ImageUploader({
  style,
  publicid,
  subfolder,
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const { setProfileImage } = useUserStore();
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
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      console.log("Imagen seleccionada:", result.assets[0].uri);
      setImage(result.assets[0].uri);
    } else {
      console.log("No se seleccionó ninguna imagen o se canceló la selección.");
    }
  };
  useEffect(() => {
    if (image) {
      console.log("Nueva imagen:", image); // Verifica que el estado `image` se actualiza correctamente
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Error", "Selecciona una imagen primero.");
      return;
    }

    try {
      const fileInfo = await FileSystem.getInfoAsync(image);
      const fileUri = fileInfo.uri;
      const fileBlob = await (await fetch(fileUri)).blob();

      const fileExtension = getFileExtension(image);
      const fileWithExtension = `${publicid}${fileExtension}`;

      const formData = new FormData();
      // formData.append("file", fileBlob, fileWithExtension);
      formData.append("upload_preset", CLOUDINARY.uploadPreset);
      formData.append("public_id", publicid);
      formData.append("folder", subfolder);

      formData.append("file", {
        uri: fileUri,
        type: "image/jpg",
        name: fileWithExtension,
      } as any);

      const response = await axios.post(CLOUDINARY.apiUrlUpload, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Encabezado correcto
      });

      const refreshedUrl = `${response.data.secure_url}?timestamp=${Date.now()}`;
      Alert.alert("¡Éxito!", `Imagen subida: ${refreshedUrl}`);
      console.log("¡Éxito! Imagen subida:", refreshedUrl);
      setProfileImage(refreshedUrl);

      setImage(null);
    } catch (error) {
      console.error("Error en la solicitud:", error); // Mostrar error completo

      // Mostrar detalles del error de Axios
      if (axios.isAxiosError(error)) {
        console.error("Mensaje del error:", error.message); // Mensaje de error
        console.error("Código de estado:", error.response?.status); // Código de estado HTTP (si está disponible)
        console.error("Respuesta:", error.response?.data); // Detalles de la respuesta del servidor
        console.error("Encabezados de respuesta:", error.response?.headers); // Encabezados de la respuesta
        console.error("Solicitud:", error.config); // Detalles de la solicitud original
      } else {
        // No es un error de Axios
        console.error("Error desconocido:", error);
      }

      Alert.alert("Error", "No se pudo subir la imagen.");
    }
  };

  return (
    <>
      <IconButton
        icon="camera"
        iconColor={theme.colors.primary}
        size={20}
        onPress={pickImage}
        mode="contained"
        style={[styles.iconButton, style]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    marginBottom: 10,
  },
});
