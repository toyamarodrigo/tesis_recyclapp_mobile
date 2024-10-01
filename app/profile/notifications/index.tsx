import { Link } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Card, IconButton, Surface, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "src/theme";

export default function Notifications() {
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center"}}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>
          Notificaciones
        </Title>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>

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
      </ScrollView>
    </SafeAreaView>
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
