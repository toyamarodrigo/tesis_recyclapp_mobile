import { View, StyleSheet } from "react-native";
import { Avatar, Card, Surface, Title } from "react-native-paper";
import { theme } from "src/theme";

export default function Notifications() {
  return (
    <Surface style={{ flex: 1, padding: 24 }}>
      <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
        <Title style={{ color: theme.colors.primary, marginBottom: 20 }}>
          Notificaciones
        </Title>
        <View style={{ flex: 1, width: "100%" }}>
          <View style={{ marginBottom: 20 }}>
            <NotificationCard
              date="04/09/2024"
              detail="Reciclaje en punto verde"
            />
            <NotificationCard
              date="04/09/2024"
              detail="Reciclaje en punto verde"
            />
          </View>
        </View>
      </View>
    </Surface>
  );
}

const NotificationCard = ({
  date,
  detail,
}: {
  date: string;
  detail: string;
}) => {
  return (
    <Card.Title
      title={detail}
      subtitle={date}
      style={styles.card}
      left={(props) => (
        <Avatar.Icon {...props} icon="recycle" style={styles.icon} />
      )}
    />
  );
};

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
  icon: {
    backgroundColor: theme.colors.secondaryContainer,
    color: theme.colors.onSecondaryContainer,
  },
});
