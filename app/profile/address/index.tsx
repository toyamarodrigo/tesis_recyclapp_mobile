import CardProfile from "@components/CardProfile";
import { Link, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { Title, Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "src/theme";

export default function Address() {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Mis direcciones</Title>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
          <View style={{ flex: 1, width: "100%" }}>
            <View style={{ marginBottom: 20 }}>
              <CardProfile
                title={"Direcci asdas asd asd asdasd ads234234"}
                type={"dirección"}
              />
              <CardProfile
                title={"Direcci asdas asd asd asdasd ads234234"}
                type={"dirección"}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 20 }}>
          <Button
            mode="contained"
            onPress={() => router.push("/profile/address/new")}
          >
            Nueva dirección
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
