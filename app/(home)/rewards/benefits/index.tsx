import { ScrollView, View, StyleSheet } from "react-native";
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
import { useBenefitList } from "@hooks/useBenefit";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "src/theme";
import CardBenefit from "@components/CardBenefit";
import { useState } from "react";
import { Benefit, BenefitUser } from "@models/benefit.type";
import { useUserStore } from "@stores/useUserStore";
import { BENEFITTYPETEXT } from "@constants/enum.constant";
import DataEmpty from "@components/DataEmpty";

export default function Benefits() {
  const { isLoading, error, data: benefitList } = useBenefitList();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const { userCustomer } = useUserStore();

  const hideModal = () => {
    setVisible(false);
  };

  const showModal = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setVisible(true);
  };

  const confirmPoints = () => {
    if (selectedBenefit) {
      const benefitUser: BenefitUser = {
        idBenefit: selectedBenefit.id,
        idUser: userCustomer.id,
      };

      //addBenefitUserActive(benefitUser);
    }
    hideModal();
  };

  const disablePoints = () => {
    if (
      selectedBenefit &&
      userCustomer &&
      userCustomer.pointsCurrent < selectedBenefit.pointsCost
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
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
          {benefitList
            ? benefitList.map((benefit) => (
                <CardBenefit
                  key={benefit.id}
                  benefit={benefit}
                  handlePoints={() => showModal(benefit)}
                  isActiveBenefit={false}
                  userPoints={userCustomer.pointsCurrent}
                />
              ))
            : null}
        </ScrollView>
      </View>
    </SafeAreaView>
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
