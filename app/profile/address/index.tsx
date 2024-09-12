import CardProfile from "@components/CardProfile";
import React from "react";
import { View } from "react-native";
import { Surface, Title, Button } from "react-native-paper";
import { useAppTheme } from "src/theme";

export default function Address() {
  const theme = useAppTheme();

  return (
    <Surface style={{ flex: 1, padding: 24 }}>
      <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
        <Title style={{ color: theme.colors.primary, marginBottom: 20 }}>
          Mis direcciones
        </Title>
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
          <Button
            mode="contained"
            onPress={() => console.log("Nueva dirección")}
          >
            Nueva dirección
          </Button>
        </View>
      </View>
    </Surface>
  );
}
