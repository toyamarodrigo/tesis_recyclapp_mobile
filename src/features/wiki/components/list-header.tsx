import { Fragment } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Text, Card, SegmentedButtons, IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useSelectedMaterialStore } from "../hooks/useSelectedMaterial";
import { useMaterialProductList } from "@hooks/useMaterialProduct";

export const ListHeader = ({ selectedMaterial, router }) => {
  const setSelectedMaterial = useSelectedMaterialStore(
    (state) => state.setSelectedMaterial
  );

  const {
    data: materials,
    isPending,
    isLoadingError,
  } = useMaterialProductList();

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(
      "https://buenosaires.gob.ar/espaciopublicoehigieneurbana/noticias/como-separar-tus-residuos"
    );
  };

  if (isLoadingError) return <Text>Error al cargar los materiales</Text>;

  return (
    <Fragment>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor="#1B5E20"
          style={styles.backButton}
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>¿Cómo reciclo?</Text>
      </View>

      <Card style={styles.card} onPress={() => handlePress()}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Primeros pasos
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            Aprende los conceptos básicos del reciclaje
          </Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.link}>Ver más</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>

      <AntDesign
        name="arrowdown"
        size={24}
        color="#1B5E20"
        style={styles.arrow}
      />

      {isPending ? (
        <ActivityIndicator size="large" color="#1B5E20" />
      ) : (
        materials && (
          <SegmentedButtons
            value={selectedMaterial}
            onValueChange={(value) => setSelectedMaterial(value)}
            buttons={materials?.map((material) => ({
              value: material.id,
              label: material.name,
              style: {
                backgroundColor:
                  selectedMaterial === material.id
                    ? material.color
                    : "transparent",
              },
              labelStyle: {
                color:
                  selectedMaterial === material.id ? "#FFFFFF" : material.color,
              },
            }))}
            style={styles.segmentedButtons}
          />
        )
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  backButton: {
    marginLeft: -8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  arrow: {
    alignSelf: "center",
    marginVertical: 24,
  },
  card: {
    paddingBottom: 8,
    backgroundColor: "#E8F5E9",
  },
  cardTitle: {
    color: "#1B5E20",
  },
  cardDescription: {
    color: "#2E7D32",
  },
  cardActions: {
    justifyContent: "flex-end",
    paddingRight: 16,
  },
  link: {
    color: "#1B5E20",
    textDecorationLine: "underline",
  },
  segmentedButtons: {
    backgroundColor: "transparent",
  },
});
