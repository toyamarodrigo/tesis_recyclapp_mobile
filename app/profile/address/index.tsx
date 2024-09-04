import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Surface,
  Title,
  Button,
} from "react-native-paper";
import { theme, useAppTheme } from "src/theme";

export default function Address() {
  const theme = useAppTheme();

  return (
    <Surface style={{ flex: 1, padding: 24 }}>
      <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
        <Title style={{ color: theme.colors.primary, marginBottom: 20 }}>
          Mis direcciones
        </Title>
        <View style={{ flex: 1, width: "100%" }}>
          <View style={{ marginBottom: 20 }}>
            <AddressCard address={"Direcci asdas asd asd asdasd ads234234"} />
            <AddressCard address={"Direcci asdas asd asd asdasd ads234234"} />
          </View>
          <Button
            mode="contained"
            onPress={() => console.log("Nueva dirección")}
          >
            Nueva dirección
          </Button>
        </View>
      </View>
    </Surface>
  );
}

const AddressCard = ({ address }: { address: string }) => (
  <Card.Title
    title={address}
    titleVariant="titleMedium"
    style={styles.card}
    right={(props) => (
      <>
        <IconButton
          {...props}
          icon="delete"
          onPress={() => {
            console.log("delete");
          }}
        />
        <IconButton
          {...props}
          icon="pencil"
          onPress={() => {
            console.log("edit");
          }}
        />
      </>
    )}
  />
);

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
