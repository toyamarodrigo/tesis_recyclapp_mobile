import { useState } from "react";
import CardProfile from "@components/CardProfile";
import { Link, useRouter } from "expo-router";
import { Alert, ScrollView, View, RefreshControl } from "react-native";
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
import { useBenefitListStore, useUpdateBenefit } from "@hooks/useBenefit";
import { useBenefitStore } from "@stores/useBenefitStore";
import type { Benefit } from "@models/benefit.type";
import DataEmpty from "@components/DataEmpty";
import { useUser } from "@clerk/clerk-expo";
import { useUserStoreByClerk } from "@hooks/useUser";
import {
  useBenefitAssignmentByStoreBenefits,
  useBenefitAssignmentList,
  useUpdateBenefitAssignment,
} from "@hooks/useBenefitAssignment";

export default function Benefits() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user?.id) return null;
  const { data: userStore } = useUserStoreByClerk({ userId: user.id });
  if (!userStore) return null;
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const router = useRouter();
  const { setCurrentBenefit } = useBenefitStore();
  const { mutateAsync: updateBenefit } = useUpdateBenefit();
  const {
    isLoading,
    error,
    data: benefitList,
    refetch,
  } = useBenefitListStore(userStore.id);

  const benefitIds = benefitList
    ? benefitList.map((benefit) => benefit.id)
    : [];

  const formatedBenefitList = benefitList?.filter(
    (benefit) => !benefit.isArchived && benefit.isActive
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const { data: benefitAssignmentListStore } =
    useBenefitAssignmentByStoreBenefits(benefitIds);
  const { mutate: updateBenefitAssignemnt } = useUpdateBenefitAssignment();

  const handleDelete = async (benefit: Benefit) => {
    if (benefitAssignmentListStore && benefitAssignmentListStore.length > 0)
      return Alert.alert(
        "Error",
        "El beneficio está en uso. No puede ser modificado ni eliminado"
      );
    const removeBenefit = {
      id: benefit.id,
      isActive: false,
      isArchived: true,
    };
    await updateBenefit(removeBenefit);
  };

  const handleEdit = (benefit: Benefit) => {
    if (benefitAssignmentListStore && benefitAssignmentListStore.length > 0)
      return Alert.alert(
        "Error",
        "El beneficio está en uso. No puede ser modificado ni eliminado"
      );
    setCurrentBenefit(benefit);
    router.push("/profile/benefits/new");
  };

  const hideModal = () => {
    setVisible(false);
    setCode("");
  };
  const changeCode = (text: string) => {
    setCode(text.toUpperCase());
  };

  const confirmCode = () => {
    if (!benefitList) return;
    const getByCode = benefitAssignmentListStore?.find(
      (benefit) => benefit.generatedCode === code
    );

    if (!getByCode) {
      Alert.alert(
        "Error",
        "No hay beneficios otorgados con ese código. Intente nuevamente."
      );
    } else {
      const benefitExchanged = benefitList.find(
        (benefit) => benefit.id === getByCode.benefitId
      );

      updateBenefitAssignemnt({
        id: getByCode.id,
        isActive: false,
      });
      hideModal();
      Alert.alert(
        "¡Cambio exitoso!",
        `Se realizó la recepción del código del beneficio ${benefitExchanged?.name} correctamente. No olvides avisarle al cliente que ya puede cerrar su pantalla del código. ¡Muchas gracias por tus servicios!`
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        height: "100%",
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary, fontWeight: 700 }}>
          Mis beneficios
        </Title>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        >
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
                  value={code.toUpperCase()}
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
                {isLoading && (
                  <ActivityIndicator
                    color={theme.colors.primary}
                    size={"large"}
                  />
                )}
                {error && (
                  <DataEmpty displayText="Ocurrió un problema al mostrar los beneficios. Intente nuevamente." />
                )}
                {!isLoading &&
                  !error &&
                  formatedBenefitList &&
                  formatedBenefitList.length === 0 && (
                    <DataEmpty displayText="Aún no tienes beneficios creados. Puedes agregar uno a continuación." />
                  )}
                {formatedBenefitList?.map((benefit) => (
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
          <Button
            mode="contained-tonal"
            onPress={() => setVisible(true)}
            disabled={
              !benefitAssignmentListStore ||
              benefitAssignmentListStore.length === 0
            }
          >
            {!benefitAssignmentListStore ||
            benefitAssignmentListStore.length === 0
              ? "No hay beneficios a recibir"
              : "Recibir código"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
