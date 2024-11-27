import { View, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { useAppTheme } from "src/theme";

interface PostCardActionsProps {
  isArchived?: boolean;
  userId: string;
  postUserId?: string;
  onEdit: () => void;
  onComment: () => void;
  isLoading: boolean;
}

export function PostCardActions({
  isArchived,
  userId,
  postUserId,
  onEdit,
  onComment,
  isLoading,
}: PostCardActionsProps) {
  const theme = useAppTheme();

  return (
    <Card.Actions style={styles.cardActions}>
      <View style={styles.buttonContainer}>
        {userId === postUserId && !isArchived && (
          <Button
            mode="contained-tonal"
            onPress={onEdit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.editButton}
            buttonColor={theme.colors.secondaryContainer}
            textColor={theme.colors.onSecondaryContainer}
          >
            Editar publicación
          </Button>
        )}
        {!isArchived && (
          <Button
            mode="contained"
            onPress={onComment}
            loading={isLoading}
            disabled={isLoading}
            style={styles.commentButton}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            Dejar un comentario
          </Button>
        )}
      </View>
    </Card.Actions>
  );
}

const styles = StyleSheet.create({
  cardActions: {
    padding: 16,
    paddingTop: 0,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  editButton: {
    borderRadius: 8,
    minWidth: 160,
  },
  commentButton: {
    borderRadius: 8,
    minWidth: 160,
  },
});
