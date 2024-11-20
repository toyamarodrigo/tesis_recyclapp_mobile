import { advertisementKeys } from "@api/query/advertisement.factory";
import { useQuery } from "@tanstack/react-query";
import { IMAGE } from "@constants/image.constant";

export const useAdvertisementList = () => {
  return useQuery({
    ...advertisementKeys.advertisement.list(),
    select: (data) => {
      const formattedData = data
        .map((ad) => ({
          ...ad,
          image: `${IMAGE.CLOUDINARY_URL}${IMAGE.ADVERTISEMENT_FOLDER}/${ad.userId}/${ad.id}.jpg`,
        }))
        .filter((ad) => !ad.isArchived)
        .filter((ad) => ad.paymentCompleted);

      return formattedData;
    },
  });
};
