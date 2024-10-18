import { useState } from "react";
import CardProfile from "@components/CardProfile";
import { Link, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Title,
  Text,
  TextInput,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { theme } from "src/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useBenefitList,
  useDeleteBenefit,
  useUpdateBenefit,
} from "@hooks/useBenefit";
import { useBenefitStore } from "@stores/useBenefitStore";
import { Benefit, BenefitPut } from "@models/benefit.type";

export default function Benefits() {
  const { isLoading } = useBenefitList();
  const { benefitList, setCurrentBenefit } = useBenefitStore();
  const [visible, setVisible] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const router = useRouter();
  const showModal = () => setVisible(true);
  const { mutate: updateBenefit } = useUpdateBenefit();

  const handleDelete = (benefit: Benefit) => {
    const removeBenefit: BenefitPut = {
      id: benefit.id,
      isActive: false,
      isArchived: true,
    };
    console.log("removeBenefit", removeBenefit);
    updateBenefit(removeBenefit);
  };

  const handleEdit = (benefit: Benefit) => {
    setCurrentBenefit(benefit);
    router.push("/profile/benefits/new");
  };

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

  console.log(isLoading);
  if (isLoading)
    return <ActivityIndicator animating={true} color={theme.colors.primary} />;

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Mis beneficios</Title>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
              }}
            >
              <View style={{ gap: 20 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 18,
                    color: theme.colors.primary,
                    textAlign: "center",
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
                <Button
                  mode="contained-tonal"
                  onPress={confirmCode}
                  disabled={code === ""}
                >
                  Confirmar recepción
                </Button>
                <Button
                  mode="contained"
                  onPress={hideModal}
                  buttonColor={theme.colors.errorContainer}
                  textColor={theme.colors.onErrorContainer}
                >
                  Cancelar
                </Button>
              </View>
            </Modal>
          </Portal>
          <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
            <View style={{ width: "100%" }}>
              <View style={{ marginBottom: 20 }}>
                {benefitList &&
                  benefitList.map((benefit) => (
                    <CardProfile
                      key={benefit.id}
                      title={benefit.name}
                      type={"beneficio"}
                      onDelete={() => handleDelete(benefit)}
                      onEdit={() => handleEdit(benefit)}
                    />
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ padding: 16, gap: 15 }}>
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
    </SafeAreaView>
  );
}
