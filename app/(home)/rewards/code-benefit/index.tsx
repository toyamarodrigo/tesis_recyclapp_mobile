import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { Text, Button, IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { useBenefitStore } from "@stores/useBenefitStore";

export default function ActiveBenefits() {
  const { currentBenefitCustomer, clearCurrentBenefitCustomer } =
    useBenefitStore();

  const handleBack = async () => {
    Alert.alert("Éxito", "Se canjeó el beneficio con éxito.");
    clearCurrentBenefitCustomer();
    router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor="#1B5E20"
          style={styles.backButton}
          size={32}
          onPress={handleBack}
        />
        <Text style={styles.title}>Canjear beneficio</Text>
      </View>
      {currentBenefitCustomer?.generatedCode && (
        <View style={{ alignItems: "center", padding: 20 }}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 20,
              fontSize: 16,
              color: theme.colors.tertiary,
            }}
          >
            El código generado es
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 20,
              fontSize: 30,
              color: theme.colors.primary,
            }}
          >
            {currentBenefitCustomer?.generatedCode}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 50,
              fontSize: 16,
              color: theme.colors.tertiary,
            }}
          >
            Compártelo con la tienda y espera su confirmación antes de cerrar la
            pantalla.
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: theme.colors.error,
              fontWeight: "bold",
              marginBottom: 50,
              fontSize: 16,
            }}
          >
            ATENCIÓN: Una vez cerrada la pantalla no podrás recuperar el código
            y finalizará el beneficio.
          </Text>
          <Button mode="contained-tonal" onPress={handleBack}>
            Confirmar y regresar
          </Button>
        </View>
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
});
