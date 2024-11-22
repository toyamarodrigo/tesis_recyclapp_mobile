import { BENEFITTYPEICON, BENEFITTYPETEXT } from "@constants/enum.constant";
import { Card, Text, Button, Avatar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "src/theme";
import { transformDate } from "@utils/helpers";

export default function CardBenefit({
  benefit,
  isActiveBenefit,
  userPoints,
  handlePoints,
  setSelectedBenefitAssignment,
  setModalContent,
  setModalTitle,
}: {
  benefit: any;
  isActiveBenefit: boolean;
  userPoints: number;
  handlePoints: () => void;
  setSelectedBenefitAssignment: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setModalContent?: React.Dispatch<React.SetStateAction<string>>;
  setModalTitle?: React.Dispatch<React.SetStateAction<string>>;
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
    <Card style={{ margin: 15 }}>
      <Card.Title
        title={BENEFITTYPETEXT[benefit.type]}
        subtitle={`Por ${benefit.pointsCost} puntos`}
        left={(props) => (
          <Avatar.Icon {...props} icon={BENEFITTYPEICON[benefit.type]} />
        )}
      />
      <Card.Content>
        <Text variant="titleLarge">{benefit.name}</Text>
        <Text variant="bodyMedium">
          Válido hasta {transformDate(benefit.endDate)}
        </Text>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "center" }}>
        {isActiveBenefit ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Button
              mode="contained"
              onPress={handleCanjear}
              style={{
                flex: 1,
                marginRight: 5,
                padding: 0,
                backgroundColor: theme.colors.primary,
              }}
            >
              Canjear
            </Button>
            <Button
              mode="contained"
              onPress={handleRestaurar}
              style={{
                flex: 1,
                marginLeft: 5,
                padding: 0,
                backgroundColor: theme.colors.error,
              }}
            >
              Restaurar
            </Button>
          </View>
        ) : (
          <Button
            mode="contained"
            onPress={handlePoints}
            style={{
              marginBottom: 20,
              marginTop: 20,
              alignSelf: "center",
              width: "100%",
            }}
            disabled={benefit.pointsCost > userPoints}
          >
            {benefit.pointsCost > userPoints
              ? "No tienes puntos suficientes"
              : "Cambiar mis puntos"}
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: theme.colors.surfaceVariant,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
