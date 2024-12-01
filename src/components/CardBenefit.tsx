import { BENEFITTYPEICON, BENEFITTYPETEXT } from "@constants/enum.constant";
import { Card, Text, Button, Avatar, Divider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "src/theme";
import { transformDate } from "@utils/helpers";
import type { Benefit } from "@models/benefit.type";
import type { Dispatch, SetStateAction } from "react";

export default function CardBenefit({
  benefit,
  isActiveBenefit,
  userPoints,
  handlePoints,
  setSelectedBenefitAssignment,
  setModalContent,
  setModalTitle,
}: {
  benefit: Benefit;
  isActiveBenefit: boolean;
  userPoints: number;
  handlePoints: () => void;
  setSelectedBenefitAssignment: Dispatch<SetStateAction<string | null>>;
  setModalContent?: Dispatch<SetStateAction<string>>;
  setModalTitle?: Dispatch<SetStateAction<string>>;
}) {
  const handleCanjear = () => {
    if (setModalContent && setModalTitle) {
      setModalContent(
        "Recuerda generar el código ÚNICAMENTE cuando el local lo solicite, ya que no podras acceder al código nuevamente. ¿Estas seguro de que quieres generar el código?"
      );
      setModalTitle("Generar código");
      setSelectedBenefitAssignment(benefit.id);
      handlePoints();
    }
  };

  const handleRestaurar = () => {
    if (setModalContent && setModalTitle) {
      setModalContent(
        "¿Estas seguro de que quieres restaurar los puntos y descartar el beneficio? Los puntos volverán a tu cuenta pero perderás el beneficio."
      );
      setModalTitle("Restaurar puntos");
      setSelectedBenefitAssignment(benefit.id);
      handlePoints();
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={BENEFITTYPETEXT[benefit.type]}
        subtitle={benefit?.displayName || "General"}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={BENEFITTYPEICON[benefit.type]}
            style={styles.avatar}
          />
        )}
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
      />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge" style={styles.benefitName}>
          {benefit.name}
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.pointsContainer}>
          <Text variant="titleMedium" style={styles.pointsCost}>
            {benefit.pointsCost} puntos
          </Text>
          <Text variant="bodyMedium" style={styles.validUntil}>
            Válido hasta {transformDate(benefit.endDate.toString())}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        {isActiveBenefit ? (
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleCanjear}
              style={[styles.button, styles.primaryButton]}
              labelStyle={styles.buttonLabel}
            >
              Canjear
            </Button>
            <Button
              mode="contained"
              onPress={handleRestaurar}
              style={[styles.button, styles.errorButton]}
              labelStyle={styles.buttonLabel}
            >
              Restaurar
            </Button>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handlePoints}
              style={[styles.button, styles.fullWidthButton]}
              labelStyle={styles.buttonLabel}
              disabled={benefit.pointsCost > userPoints}
            >
              {benefit.pointsCost > userPoints
                ? "No tienes puntos suficientes"
                : "Cambiar mis puntos"}
            </Button>
          </View>
        )}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: "#fff",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  benefitName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.onSurface,
  },
  divider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: theme.colors.surfaceVariant,
  },
  pointsContainer: {
    marginTop: 8,
  },
  pointsCost: {
    color: theme.colors.primary,
    fontWeight: "600",
    marginBottom: 4,
  },
  validUntil: {
    color: theme.colors.onSurfaceVariant,
  },
  cardActions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
  },
  button: {
    borderRadius: 8,
    flex: 1,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
    padding: 4,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  errorButton: {
    backgroundColor: theme.colors.error,
  },
  fullWidthButton: {
    width: "100%",
    backgroundColor: theme.colors.primary,
  },
});
