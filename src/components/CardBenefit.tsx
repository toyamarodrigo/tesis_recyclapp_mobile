import { BENEFITTYPEICON, BENEFITTYPETEXT } from "@constants/enum.constant";
import {
  Card,
  IconButton,
  Modal,
  Portal,
  Text,
  Button,
  Avatar,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "src/theme";
import { transformDate } from "@utils/helpers";

export default function CardBenefit({
  benefit,
  userPoints,
  handlePoints,
}: {
  benefit: any;
  userPoints: number;
  handlePoints: () => void;
}) {
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
