import { ScrollView, View, StyleSheet, Alert } from "react-native";
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
import { useBenefitList, useUpdateBenefit } from "@hooks/useBenefit";
import { useState } from "react";
import { Benefit } from "@models/benefit.type";
import { useUser } from "@clerk/clerk-expo";
import { useUpdateUserCustomer, useUserCustomerByClerk } from "@hooks/useUser";
import {
  useBenefitAssignmentByUserCustomerId,
  useUpdateBenefitAssignment,
} from "@hooks/useBenefitAssignment";
import { useBenefitStore } from "@stores/useBenefitStore";

export default function ActiveBenefits() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user?.id) {
    return null;
  }
  const { isLoading, error, data: benefitList } = useBenefitList();
  const { setCurrentBenefitCustomer } = useBenefitStore();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedBenefitAssignment, setSelectedBenefitAssignment] = useState<
    string | null
  >(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<string>("");
  const { data: userCustomer, isLoading: userLoading } = useUserCustomerByClerk(
    { userId: user.id }
  );
  if (!userCustomer) {
    return null;
  }
  const { data: benefitAssignmentList } = useBenefitAssignmentByUserCustomerId(
    userCustomer.id
  );
  const { mutateAsync: updateUserCustomer } = useUpdateUserCustomer();
  const { mutateAsync: updateBenefitAssignemnt } = useUpdateBenefitAssignment();
  const { mutateAsync: updateBenefit } = useUpdateBenefit();

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setVisible(true);
  };

  const restorePoints = async () => {
    if (selectedBenefit && userCustomer && selectedBenefitAssignment) {
      const userData = {
        id: userCustomer.id,
        pointsCurrent: userCustomer.pointsCurrent + selectedBenefit.pointsCost,
      };
      const benefitData = {
        id: selectedBenefit.id,
        quantity: selectedBenefit.quantity + 1,
      };
      //desactivar de la tabla relacional
      await updateBenefitAssignemnt({
        id: selectedBenefitAssignment,
        isActive: false,
      });

      //reducir puntos usuario
      await updateUserCustomer(userData);
      //TODO actualizar el puntos disponibles en esta pagina y en el store

      //reducir disponibilidad beneficio
      await updateBenefit(benefitData);
      Alert.alert(
        "Éxito",
        "Se restauraron los puntos del beneficio con éxito."
      );
    }
    hideModal();
  };

  const handleConfirmModal = async () => {
    if (modalTitle == "Restaurar puntos") {
      restorePoints();
      hideModal();
    } else if (modalTitle == "Generar código") {
      hideModal();
      if (selectedBenefitAssignment) {
        const currentBenefitAssignment = benefitAssignmentList?.find(
          (benefit) => benefit.id == selectedBenefitAssignment
        );

        if (currentBenefitAssignment) {
          setCurrentBenefitCustomer(currentBenefitAssignment);
          router.push("/rewards/code-benefit");
        }
      }
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
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 18, padding: 10 }}>
              {modalTitle}
            </Text>
            <Text style={{ padding: 10, fontSize: 16, textAlign: "center" }}>
              {modalContent}
            </Text>
            <Text
              style={{
                color: theme.colors.error,
                fontWeight: "600",
                fontSize: 16,
                padding: 10,
              }}
            >
              Esta acción es IRREVERSIBLE.
            </Text>
          </View>
          <Button
            mode="contained-tonal"
            onPress={handleConfirmModal}
            style={{
              margin: 10,
            }}
          >
            Confirmar
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
      {(isLoading || userLoading) && (
        <ActivityIndicator color={theme.colors.primary} size={"large"} />
      )}
      {error && (
        <DataEmpty displayText="Ocurrió un problema al mostrar los beneficios. Intente nuevamente." />
      )}
      {!isLoading && !error && benefitAssignmentList?.length == 0 && (
        <DataEmpty displayText="Aún no tienes beneficios activos. Puedes canjearlos en 'Beneficios Ofrecidos'." />
      )}
      {!isLoading && userCustomer && benefitList && benefitAssignmentList
        ? benefitList
            .filter((benefit) =>
              benefitAssignmentList.some(
                (assignment) => assignment.benefitId === benefit.id
              )
            )
            .map((benefit) => {
              const relatedAssignment = benefitAssignmentList.find(
                (assignment) => assignment.benefitId === benefit.id
              );

              return (
                <CardBenefit
                  key={benefit.id}
                  benefit={benefit}
                  handlePoints={() => showModal(benefit)}
                  isActiveBenefit={benefit.isActive}
                  userPoints={userCustomer.pointsCurrent}
                  setModalTitle={setModalTitle}
                  setModalContent={setModalContent}
                  setSelectedBenefitAssignment={() =>
                    relatedAssignment &&
                    setSelectedBenefitAssignment(relatedAssignment.id)
                  }
                />
              );
            })
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
