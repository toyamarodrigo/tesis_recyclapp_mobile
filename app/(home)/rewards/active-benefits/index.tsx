import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
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
import { useCallback, useState } from "react";
import type { Benefit } from "@models/benefit.type";
import { useUser } from "@clerk/clerk-expo";
import { useUpdateUserCustomer, useUserCustomerByClerk } from "@hooks/useUser";
import {
  useBenefitAssignmentByUserCustomerId,
  useUpdateBenefitAssignment,
} from "@hooks/useBenefitAssignment";
import { useBenefitStore } from "@stores/useBenefitStore";

export default function ActiveBenefits() {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn || !user?.id) return null;
  const { isPending, error, data: benefitList = [] } = useBenefitList();
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
  if (!userCustomer) return null;
  const { data: benefitAssignmentList, isLoading: benefitAssignmentLoading } =
    useBenefitAssignmentByUserCustomerId(userCustomer.id);
  const { mutateAsync: updateUserCustomer } = useUpdateUserCustomer();
  const { mutateAsync: updateBenefitAssignemnt } = useUpdateBenefitAssignment();
  const { mutateAsync: updateBenefit } = useUpdateBenefit();
  const [refreshing, setRefreshing] = useState(false);

  const { refetch: refetchBenefits } = useBenefitList();
  const { refetch: refetchUserCustomer } = useUserCustomerByClerk({
    userId: user.id,
  });
  const { refetch: refetchBenefitAssignments } =
    useBenefitAssignmentByUserCustomerId(userCustomer?.id);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchBenefits(),
        refetchUserCustomer(),
        refetchBenefitAssignments(),
      ]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchBenefits, refetchUserCustomer, refetchBenefitAssignments]);

  const hideModal = () => setVisible(false);
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
    if (modalTitle === "Restaurar puntos") {
      restorePoints();
      hideModal();
    } else if (modalTitle === "Generar código") {
      hideModal();
      if (selectedBenefitAssignment) {
        const currentBenefitAssignment = benefitAssignmentList?.find(
          (benefit) => benefit.id === selectedBenefitAssignment
        );

        if (currentBenefitAssignment) {
          setCurrentBenefitCustomer(currentBenefitAssignment);
          await updateBenefitAssignemnt({
            id: currentBenefitAssignment.id,
            isActive: false,
          });
          router.push("/rewards/code-benefit");
        }
      }
    }
  };

  const filteredBenefitList = benefitList?.flatMap((benefit) => {
    const matchingAssignments =
      benefitAssignmentList?.filter(
        (assignment) => assignment.benefitId === benefit.id
      ) || [];
    return matchingAssignments.map(() => benefit);
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
    >
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
      {(isPending || userLoading || benefitAssignmentLoading) && (
        <View style={styles.centerContainer}>
          <ActivityIndicator color={theme.colors.primary} size={"large"} />
        </View>
      )}
      {error && (
        <View style={styles.centerContainer}>
          <DataEmpty displayText="Ocurrió un problema al mostrar los beneficios. Intente nuevamente." />
        </View>
      )}
      {!isPending &&
        !benefitAssignmentLoading &&
        (!benefitAssignmentList || benefitAssignmentList.length === 0) && (
          <View style={styles.centerContainer}>
            <DataEmpty displayText="Aún no tienes beneficios activos. Puedes canjearlos en 'Beneficios Ofrecidos'." />
          </View>
        )}
      {!isPending && userCustomer && filteredBenefitList?.length ? (
        filteredBenefitList?.map((benefit, index) => {
          const relatedAssignment = benefitAssignmentList?.find(
            (assignment) => assignment.benefitId === benefit.id
          );

          return (
            <CardBenefit
              key={`${benefit.id}-${benefit.displayName}-${index}`}
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
      ) : (
        <DataEmpty displayText="Aún no tienes beneficios activos. Puedes canjearlos en 'Beneficios Ofrecidos'." />
      )}
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
