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
  disabled,
  handlePoints,
}: {
  benefit: any;
  disabled: boolean;
  handlePoints: () => void;
}) {
  return (
    <Card>
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
      <Card.Actions>
        <Button
          mode="contained"
          onPress={handlePoints}
          style={{ marginBottom: 8 }}
          disabled={disabled}
        >
          Cambiar mis puntos
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
