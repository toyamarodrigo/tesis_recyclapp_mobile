import { IMAGE } from "@constants/image.constant";
import { useState, useEffect } from "react";

export const useProfileImage = (userId: string | undefined) => {
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    if (userId) {
      const timestamp = `?timestamp=${Date.now()}`;
      const urlImage = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_FOLDER}/${userId}.jpg${timestamp}`;
      setProfileImage(urlImage);
    }
  }, [userId]);

  return profileImage;
};
