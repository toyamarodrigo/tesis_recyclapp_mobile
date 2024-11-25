import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import { router } from "expo-router";
import {
  Text,
  Title,
  Button,
  IconButton,
  Modal,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import { useBenefitList, useUpdateBenefit } from "@hooks/useBenefit";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "src/theme";
import CardBenefit from "@components/CardBenefit";
import { useState } from "react";
import { Benefit } from "@models/benefit.type";
import { BENEFITTYPETEXT } from "@constants/enum.constant";
import DataEmpty from "@components/DataEmpty";
import { useCreateBenefitAssignment } from "@hooks/useBenefitAssignment";
import { BenefitAssignmentPost } from "@models/benefitAssignment.type";
import { useUpdateUserCustomer, useUserCustomerByClerk } from "@hooks/useUser";
import { useUser } from "@clerk/clerk-expo";

export default function Benefits() {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn) return null;
  const { isLoading, error, data: benefitList, refetch } = useBenefitList();
  const { data: userCustomer, refetch: refetchUser } = useUserCustomerByClerk({ userId: user.id });
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const { mutateAsync: createBenefitAssignment } = useCreateBenefitAssignment();
  const { mutateAsync: updateUserCustomer } = useUpdateUserCustomer();
  const { mutateAsync: updateBenefit } = useUpdateBenefit();
  const [_, setSelectedBenefitAssignment] = useState<string | null>(null);

  const hideModal = () => setVisible(false);

  const showModal = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setVisible(true);
  };

  const confirmPoints = async () => {
    if (selectedBenefit && userCustomer) {
      const benefitAssignmentData: BenefitAssignmentPost = {
        benefitId: selectedBenefit.id,
        userCustomerId: userCustomer.id,
      };
      const userData = {
        id: userCustomer.id,
        pointsCurrent: userCustomer.pointsCurrent - selectedBenefit.pointsCost,
      };
      const benefitData = {
        id: selectedBenefit.id,
        quantity: selectedBenefit.quantity - 1,
      };

      await createBenefitAssignment(benefitAssignmentData);
      await updateUserCustomer(userData);
      await updateBenefit(benefitData);
    }
    hideModal();
  };

  const disablePoints = () => {
    if (!selectedBenefit || !userCustomer) return false;
    return userCustomer.pointsCurrent < selectedBenefit.pointsCost;
  };

  const onRefresh = async () => {
    await Promise.allSettled([refetch(), refetchUser()]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor={theme.colors.primary}
          style={styles.backButton}
          size={32}
          onPress={() => router.back()}
        />
        <Title style={styles.title}>Beneficios ofrecidos</Title>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.scoreHeader}>
          <Text style={styles.score}>
            Puntos disponibles: {userCustomer && userCustomer.pointsCurrent}
          </Text>
        </View>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
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
              {selectedBenefit && (
                <View style={{ gap: 20 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: theme.colors.primary,
                      textAlign: "center",
                    }}
                  >
                    Cambio de {selectedBenefit.pointsCost} puntos por beneficio
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: theme.colors.primary,
                      textAlign: "center",
                    }}
                  >
                    {BENEFITTYPETEXT[selectedBenefit.type]}
                  </Text>
                  <Button
                    mode="contained-tonal"
                    onPress={confirmPoints}
                    disabled={disablePoints()}
                  >
                    Confirmar canje
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
          {isLoading && (
            <ActivityIndicator color={theme.colors.primary} size={"large"} />
          )}
          {error && (
            <DataEmpty displayText="Ocurrió un problema al mostrar los beneficios. Intente nuevamente." />
          )}
          {benefitList && userCustomer
            ? benefitList.map((benefit) => (
                <CardBenefit
                  key={benefit.id}
                  benefit={benefit}
                  handlePoints={() => showModal(benefit)}
                  isActiveBenefit={false}
                  userPoints={userCustomer.pointsCurrent}
                  setSelectedBenefitAssignment={setSelectedBenefitAssignment}
                />
              ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
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
    color: theme.colors.primary,
    flex: 1,
    flexWrap: "wrap",
  },
  scoreHeader: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: theme.colors.tertiary,
    padding: 10,
    borderRadius: 20,
  },
  score: {
    fontSize: 18,
    color: theme.colors.onTertiary,
  },
});
