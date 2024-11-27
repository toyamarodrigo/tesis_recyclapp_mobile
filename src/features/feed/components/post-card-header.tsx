import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { theme, useAppTheme } from "src/theme";

interface PostCardHeaderProps {
  username?: string;
  imageUrl: string;
  isActive?: boolean;
}

export function PostCardHeader({
  username,
  imageUrl,
  isActive,
}: PostCardHeaderProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.cardHeader}>
      <Avatar.Image
        size={56}
        style={styles.avatar}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={styles.headerContent}>
        <Text style={[styles.username, { color: theme.colors.primary }]}>
          @{username}
        </Text>
        <Text
          style={[
            styles.statusText,
            { color: isActive ? theme.colors.secondary : theme.colors.error },
          ]}
        >
          {isActive ? "Publicación activa" : "Publicación finalizada"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  avatar: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "700",
  },
  statusText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
  },
});
