import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  IconButton,
  Modal,
  Portal,
  Text,
  Button,
} from "react-native-paper";
import { theme, useAppTheme } from "src/theme";

export default function CardProfile({
  title,
  type,
  onDelete,
  onEdit,
}: {
  title: string;
  type: string;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const [visible, setVisible] = React.useState(false);
  const theme = useAppTheme();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const confirmDelete = () => {
    onDelete();
    hideModal();
  };

  const handleEdit = () => {
    onEdit();
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 18, padding: 10 }}>
              Eliminar {type}
            </Text>
            <Text style={{ padding: 10, fontSize: 16, textAlign: "center" }}>
              ¿Estás seguro de que quieres continuar con la eliminación?
            </Text>
            <Text
              style={{
                color: theme.colors.error,
                fontWeight: "600",
                fontSize: 16,
                padding: 10,
              }}
            >
              Esta acción es IRREVERSIBLE.
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => hideModal()}
            buttonColor={theme.colors.outline}
            style={{
              margin: 10,
            }}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={confirmDelete}
            buttonColor={theme.colors.error}
            style={{
              margin: 10,
            }}
          >
            Eliminar
          </Button>
        </Modal>
      </Portal>
      <Card.Title
        title={title}
        titleVariant="titleMedium"
        style={styles.card}
        right={(props) => (
          <>
            <IconButton
              {...props}
              icon="delete"
              onPress={() => {
                showModal();
              }}
            />
            <IconButton
              {...props}
              icon="pencil"
              onPress={() => {
                handleEdit();
              }}
            />
          </>
        )}
      />
    </>
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
