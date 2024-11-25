import {
  materialColors,
  materialProductKeys,
} from "@api/query/materialProduct.factory";
import { useQuery } from "@tanstack/react-query";

const useMaterialProductList = () => {
  return useQuery({
    ...materialProductKeys.materialProduct.list(),
    select: (data) =>
      data.slice(0, 4).map((material) => ({
        ...material,
        color: materialColors[material.id],
      })),
  });
};

export { useMaterialProductList };
