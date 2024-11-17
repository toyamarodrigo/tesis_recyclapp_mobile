import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";
import { theme } from "src/theme";

interface ImageUploaderProps {
  style?: object;
}

export default function ImageUploader({ style }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Se necesitan permisos para acceder a las fotos.");
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
    }
  };

  return (
    <IconButton
      icon="camera"
      iconColor={theme.colors.primary}
      size={20}
      onPress={pickImage}
      mode="contained"
      style={[styles.iconButton, style]}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    marginBottom: 10,
  },
});
