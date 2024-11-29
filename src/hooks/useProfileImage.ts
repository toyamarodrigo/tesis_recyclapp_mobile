import { IMAGE } from "@constants/image.constant";
import { useUserStore } from "@stores/useUserStore";
import { useEffect } from "react";

export const useProfileImage = (userId: string | undefined) => {
  const { setProfileImage, profileImage } = useUserStore();

  useEffect(() => {
    if (userId) {
      const timestamp = `?timestamp=${Date.now()}`;
      const urlImage = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_FOLDER}/${userId}.jpg${timestamp}`;
      setProfileImage(urlImage);
    }
  }, [userId]);

  return profileImage;
};
