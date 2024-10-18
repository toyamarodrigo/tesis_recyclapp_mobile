import { Fragment } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card, SegmentedButtons, IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { materialColors, materials } from "../models/materials";

export const ListHeader = ({ selectedMaterial, setSelectedMaterial, router }) => (
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

    <Card
      style={styles.card}
      onPress={() => router.push("/wiki/how-to-recycle/first-steps")}
    >
      <Card.Content>
        <Text variant="titleLarge" style={styles.cardTitle}>
          Primeros pasos
        </Text>
        <Text variant="bodyMedium" style={styles.cardDescription}>
          Aprende los conceptos básicos del reciclaje
        </Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => router.push("/wiki/how-to-recycle/first-steps")}
        >
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

    <SegmentedButtons
      value={selectedMaterial}
      onValueChange={setSelectedMaterial}
      buttons={materials.map((material) => ({
        value: material,
        label: material,
        style: {
          backgroundColor:
            selectedMaterial === material
              ? materialColors[material]
              : "transparent",
        },
        labelStyle: {
          color:
            selectedMaterial === material
              ? "#FFFFFF"
              : materialColors[material],
        },
      }))}
      style={styles.segmentedButtons}
    />
  </Fragment>
);


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
