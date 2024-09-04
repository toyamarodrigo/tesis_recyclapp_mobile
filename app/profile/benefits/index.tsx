import { View } from "react-native";
import { Avatar, Card, Surface, Title } from "react-native-paper";
import { theme } from "src/theme";

export default function Benefits() {
  return (
    <Surface style={{ flex: 1, padding: 24 }}>
      <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
        <Title style={{ color: theme.colors.primary, marginBottom: 20 }}>
          Mis beneficios
        </Title>
        <View style={{ flex: 1, width: "100%" }}>
          <View style={{ marginBottom: 20 }}></View>
        </View>
      </View>
    </Surface>
  );
}

const BenefitCard = ({
  title,
  subtitle,
  avatar,
}: {
  title: string;
  subtitle: string;
  avatar: string;
}) => {
  return (
    <Card.Title
      title={title}
      subtitle={subtitle}
      left={(props) => <Avatar.Icon {...props} icon="folder" />}
    />
  );
};
