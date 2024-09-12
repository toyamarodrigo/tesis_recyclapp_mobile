import { useState } from "react";
import CardProfile from "@components/CardProfile";
import { useRouter } from "expo-router";
import { View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Surface,
  Title,
  Text,
  TextInput,
} from "react-native-paper";
import { theme } from "src/theme";

export default function Benefits() {
  const [visible, setVisible] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const router = useRouter();
  const showModal = () => setVisible(true);

  const hideModal = () => {
    setVisible(false);
    setCode("");
  };
  const changeCode = (text: string) => {
    if (text.length > 10) return;
    setCode(text);
  };
  const confirmCode = () => {
    console.log(code);
    //TODO validar el funcionamiento del codigo
    hideModal();
  };

  return (
    <Surface style={{ flex: 1, padding: 24 }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                padding: 10,
                color: theme.colors.primary,
              }}
            >
              Ingreso de beneficio otorgado
            </Text>
            <TextInput
              mode="outlined"
              label="Ingrese el código"
              placeholder="Código de intercambio"
              value={code}
              onChangeText={(text) => changeCode(text)}
            />
          </View>
          <Button
            mode="contained-tonal"
            onPress={confirmCode}
            style={{
              margin: 10,
            }}
            disabled={code == ""}
          >
            Confirmar recepción
          </Button>
          <Button
            mode="contained"
            onPress={hideModal}
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}
            style={{
              margin: 10,
            }}
          >
            Cancelar
          </Button>
        </Modal>
      </Portal>
      <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
        <Title style={{ color: theme.colors.primary, marginBottom: 20 }}>
          Mis beneficios
        </Title>
        <View style={{ flex: 1, width: "100%" }}>
          <View style={{ marginBottom: 20 }}>
            <CardProfile title="Beneficiososossoos" type={"beneficio"} />
            <CardProfile title="Beneficiososossoos" type={"beneficio"} />
            <CardProfile title="Beneficiososossoos" type={"beneficio"} />
            <CardProfile title="Beneficiososossoos" type={"beneficio"} />
          </View>
          <View style={{ gap: 15 }}>
            <Button
              mode="contained"
              onPress={() => router.push("/profile/benefits/new")}
            >
              Agregar beneficio
            </Button>
            <Button mode="contained-tonal" onPress={showModal}>
              Recibir código
            </Button>
          </View>
        </View>
      </View>
    </Surface>
  );
}
