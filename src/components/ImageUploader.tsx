import React, { useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { useUserStore } from "@stores/useUserStore";
import { CLOUDINARY, IMAGE } from "@constants/image.constant";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { getFileExtension } from "@utils/helpers";
import { imageApi } from "@api/api.imagen";

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
  const { setProfileImage } = useUserStore(); //revisar para reutilizar
  const public_id = IMAGE.USER_UPLOAD + "/" + publicid; //revisar para reutilizar
  const timestamp = `?timestamp=${Date.now()}`;

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
      console.log("Nueva imagen:", image);
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Error", "Selecciona una imagen primero.");
      return;
    }

    try {
      const deletedddd = await imageApi.deleteImage({ public_id: public_id });
      console.log("deletedddd", deletedddd);

      const fileInfo = await FileSystem.getInfoAsync(image);
      const fileUri = fileInfo.uri;
      const fileExtension = getFileExtension(image);
      const fileWithExtension = `${publicid}${fileExtension}`;

      const formData = new FormData();
      formData.append("upload_preset", CLOUDINARY.uploadPreset);
      formData.append("public_id", publicid);
      formData.append("folder", subfolder);

      formData.append("file", {
        uri: fileUri,
        type: "image/jpg",
        name: fileWithExtension,
      } as any);

      const response = await axios.post(CLOUDINARY.apiUrlUpload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const refreshedUrl = `${response.data.secure_url}${timestamp}`;
      Alert.alert("¡Éxito!", `Se subió la imagen`);
      console.log("refreshedUrl", refreshedUrl);
      setProfileImage(refreshedUrl); //revisar para reutilizar

      setImage(null);
    } catch (error) {
      console.error("Error en la solicitud:", error);

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
