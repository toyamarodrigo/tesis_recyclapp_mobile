import { MaterialProduct } from "@models/materialProduct.type";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { theme, useAppTheme } from "src/theme";

interface PostCardContentProps {
  purpose?: "HAVE" | "WANT";
  materialId?: string;
  quantity?: number;
  description?: string;
  materials?: MaterialProduct[];
}

export function PostCardContent({
  purpose,
  materialId,
  quantity,
  description,
  materials,
}: PostCardContentProps) {
  const theme = useAppTheme();

  const materialName = materials
    ?.find((material) => material.id === materialId)
    ?.name.toLowerCase();

  return (
    <Card.Content style={styles.cardContent}>
      <Text variant="titleLarge" style={styles.titleText}>
        {purpose === "HAVE" ? "Ofrezco " : "Busco "}
        {materialName || "material"}
        {", unidades: "}
        {quantity}
      </Text>
      <Text variant="bodyMedium" style={styles.descriptionText}>
        {description}
      </Text>
    </Card.Content>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    padding: 16,
  },
  titleText: {
    color: theme.colors.onSurface,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  descriptionText: {
    marginBottom: 16,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
});
