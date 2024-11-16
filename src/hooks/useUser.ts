import { userKeys } from "@api/query/user.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@api/api.user";
import { UserPost, UserPut } from "@models/user.type";
import { useUserStore } from "@stores/useUserStore";
import { useEffect, useState } from "react";

const useUserList = () => {
  const { initializeUser, setProfileImage } = useUserStore();
  const {
    data: userData,
    isSuccess: userSuccess,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: userKeys.user.list().queryKey,
    queryFn: userKeys.user.list().queryFn,
  });
  const [userId, setUserId] = useState<string | null>(null);

  // useEffect(() => {
  //   if (userSuccess && userData) {
  //     initializeUser(userData[6]);
  //     setUserId(userData[6].id); //TODO arreglar esta llamada en el login del usuario
  //   }
  // }, [userSuccess, userData, initializeUser]);

  // const {
  //   data: imageData,
  //   isLoading: imageLoading,
  //   error: imageError,
  // } = useImageById(userId as string);

  // useEffect(() => {
  //   if (imageData?.url) {
  //     setProfileImage(imageData.url);
  //   }
  // }, [imageData, setProfileImage]);

  return {
    userData,
    userLoading,
    userSuccess,
    userError,
    // imageData,
    // imageLoading,
    // imageError,
  };
};

const useUser = (id: string) => {
  const { data, isLoading, isError, error } = useQuery(
    userKeys.user.detail(id)
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (user: UserPost) => userApi.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.user.list().queryKey, //TODO revisar si loguea directo o ingresa credenciales
      });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    error,
  };
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (data: any) => userApi.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.user.list().queryKey, //TODO revisar si actualiza todo o los datos
      });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    error,
  };
};

const useDeleteUser = () => {
  const { removeUsers } = useUserStore();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      removeUsers(); //TODO revisar si elimina al usuario del store
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export { useUserList, useUser, useCreateUser, useUpdateUser, useDeleteUser };
