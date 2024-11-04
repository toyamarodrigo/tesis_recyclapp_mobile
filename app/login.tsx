import { View } from "react-native";
import { useForm, type Resolver } from "react-hook-form";
import Constants from "expo-constants";
import { Button, TextInput, Text } from "react-native-paper";
import { useUser, useUserList } from "@hooks/useUser";
import { colors } from "@constants/colors.constant";
import { useRouter } from "expo-router";

type FormValues = {
  user: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.user ? values : {},
    errors: !values.user
      ? {
          user: {
            type: "required",
            message: "This is required.",
          },
          password: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const Login = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = async (data: FormValues) => {
    console.log("data", data);
  };

  const router = useRouter();
  const { data } = useUser("cleuifi5a0000v8fc341gbc31");

  console.log("user cleuifi5a0000v8fc341gbc31", data);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        padding: 16,
      }}
    >
      <TextInput
        label="User"
        {...register("user")}
        onChangeText={(text) => setValue("user", text)}
        mode="outlined"
        error={!!errors.user}
        style={{ width: "100%", marginBottom: 16 }}
      />
      {errors.user && (
        <Text style={{ color: colors.red[500], marginBottom: 8 }}>
          {errors.user.message}
        </Text>
      )}
      <TextInput
        label="Password"
        {...register("password")}
        secureTextEntry
        onChangeText={(text) => setValue("password", text)}
        mode="outlined"
        error={!!errors.password}
        style={{ width: "100%", marginBottom: 16 }}
      />
      {errors.password && (
        <Text style={{ color: colors.red[500], marginBottom: 8 }}>
          {errors.password.message}
        </Text>
      )}

      <View style={{ width: "100%" }}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ marginBottom: 8 }}
        >
          Login
        </Button>
        <Button mode="outlined" onPress={() => router.push("/(tabs)")}>
          Home
        </Button>
      </View>
    </View>
  );
};

export default Login;
