import { CLOUDINARY } from "@constants/image.constant";
import axios from "axios";
import { useState } from "react";

interface CloudinaryUploadOptions {
  publicId: string;
  folder: string;
  file: string;
  fileUri: string;
}

export const useCloudinary = () => {
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = async ({
    publicId,
    folder,
    file,
    fileUri,
  }: CloudinaryUploadOptions) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("upload_preset", CLOUDINARY.uploadPreset);
      formData.append("public_id", publicId);
      formData.append("folder", folder);
      formData.append("file", {
        uri: fileUri,
        type: "image/jpg",
        name: file,
      } as any);

      const response = await axios.post(CLOUDINARY.apiUrlUpload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Failed to upload image to Cloudinary");
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};
