import { ScrollView, View } from "react-native";
import { Button, Title, Text, IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewAddress() {
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("nueva direccion", data);
    router.replace("/profile/address");
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile/address" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Nueva dirección</Title>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            padding: 24,
            width: "100%",
          }}
        >
          <Text>Stuff</Text>
        </View>
      </ScrollView>
      <View style={{ padding: 16, gap: 15 }}>
        <Button mode="contained" onPress={onSubmit}>
          Agregar nueva dirección
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => router.push("/profile/address")}
          buttonColor={theme.colors.errorContainer}
          textColor={theme.colors.onErrorContainer}
        >
          Cancelar
        </Button>
      </View>
    </SafeAreaView>
  );
}
