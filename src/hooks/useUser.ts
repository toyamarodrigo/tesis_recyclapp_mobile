import { userKeys } from "@api/query-factory";
import { useQuery } from "@tanstack/react-query";

const useUserList = () => {
  const { data, isLoading, isError, error } = useQuery(userKeys.user.list());

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useUserList };
