import React from "react";
import { StyleSheet, View, Platform } from "react-native";
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
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eliminar {type}</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro de que quieres continuar con la eliminación?
            </Text>
            <Text style={styles.modalWarning}>
              Esta acción es IRREVERSIBLE.
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => hideModal()}
            buttonColor={theme.colors.outline}
            style={styles.modalButton}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={confirmDelete}
            buttonColor={theme.colors.error}
            style={styles.modalButton}
          >
            Eliminar
          </Button>
        </Modal>
      </Portal>
      <Card style={styles.card}>
        <Card.Title
          title={title}
          titleVariant="titleMedium"
          titleStyle={styles.cardTitle}
          right={(props) => (
            <View style={styles.actionButtons}>
              <IconButton
                {...props}
                icon="delete"
                onPress={showModal}
                style={styles.iconButton}
              />
              <IconButton
                {...props}
                icon="pencil"
                onPress={handleEdit}
                style={styles.iconButton}
              />
            </View>
          )}
        />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  actionButtons: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
  },
  iconButton: {
    margin: 4,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 24,
    margin: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalContent: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 16,
    color: "#2c3e50",
  },
  modalText: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#34495e",
    lineHeight: 24,
  },
  modalWarning: {
    color: theme.colors.error,
    fontWeight: "600",
    fontSize: 16,
    padding: 16,
  },
  modalButton: {
    margin: 8,
    borderRadius: 8,
  },
});
