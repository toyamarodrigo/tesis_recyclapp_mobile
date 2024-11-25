import { materialComponentKeys } from "@api/query/materialComponent.factory";
import { useQuery } from "@tanstack/react-query";

const useMaterialComponentList = () => {
  return useQuery(materialComponentKeys.materialComponent.list());
};

export { useMaterialComponentList };
