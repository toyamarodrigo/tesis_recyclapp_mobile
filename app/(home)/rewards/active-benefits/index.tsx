import { ScrollView, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  Text,
  Button,
  IconButton,
  Modal,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import { theme } from "src/theme";
import CardBenefit from "@components/CardBenefit";
import DataEmpty from "@components/DataEmpty";
import { useBenefitList } from "@hooks/useBenefit";
import { useState } from "react";
import { Benefit } from "@models/benefit.type";
import { useUserStore } from "@stores/useUserStore";
import { useUpdateUser } from "@hooks/useUser";
import { UserPut } from "@models/user.type";

export default function ActiveBenefits() {
  const { isLoading, error, data: benefitList } = useBenefitList();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const { userCustomer, user } = useUserStore();
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<string>("");
  const { mutate: useAddPoints, isPending } = useUpdateUser();

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setVisible(true);
  };

  const addPoints = () => {
    let userCustomerData;

    if (user) {
      const userData: UserPut = {
        id: user.id,
      };

      if (userCustomer && selectedBenefit) {
        userCustomerData = {
          id: userCustomer.id,
          pointsCurrent:
            userCustomer.pointsCurrent + selectedBenefit.pointsCost,
        };
      } else {
        userCustomerData = undefined;
      }

      const data = { userData, userCustomerData };

      console.log(data);
      useAddPoints(data); //TODO revisar que se actualicen los beneficios y los puntos del usuario
    }
  };

  const handleConfirmModal = () => {
    if (modalTitle == "Restaurar puntos") {
      addPoints();
      hideModal();
    } else if (modalTitle == "Generar código") {
      hideModal();
      //TODO sacar el beneficio del usuario
      router.push("/rewards/code-benefit");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor="#1B5E20"
          style={styles.backButton}
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Beneficios activos</Text>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
          }}
        >
          {selectedBenefit && (
            <View style={{ gap: 20 }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  color: theme.colors.shadow,
                  textAlign: "center",
                }}
              >
                {modalTitle}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: theme.colors.shadow,
                  textAlign: "center",
                }}
              >
                {modalContent}
              </Text>
              <Button mode="contained-tonal" onPress={handleConfirmModal}>
                Confirmar
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
          )}
        </Modal>
      </Portal>
      {(isLoading || isPending) && (
        <ActivityIndicator color={theme.colors.primary} size={"large"} />
      )}
      {error && (
        <DataEmpty displayText="Ocurrió un problema al mostrar los beneficios. Intente nuevamente." />
      )}
      {!isLoading && !isPending && benefitList
        ? benefitList.map((benefit) => (
            <CardBenefit
              key={benefit.id}
              benefit={benefit}
              handlePoints={() => showModal(benefit)}
              isActiveBenefit={true}
              userPoints={userCustomer.pointsCurrent}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
            />
          ))
        : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginLeft: -8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5E20",
    flex: 1,
    flexWrap: "wrap",
  },
});
