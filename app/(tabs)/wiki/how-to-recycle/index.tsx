import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Text,
  Card,
  Chip,
  SegmentedButtons,
  IconButton,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

const materials = ["Papel y cartón", "Plásticos", "Metales", "Vidrio"];

const materialColors = {
  "Papel y cartón": "#4CAF50",
  "Plásticos": "#2196F3",
  "Metales": "#FFC107",
  "Vidrio": "#9C27B0"
};

const recyclingInfo = [
  { title: "Cajas", description: "Cómo reciclar cajas de cartón", materials: ["Papel y cartón"] },
  { title: "Sobres", description: "Cómo reciclar sobres", materials: ["Papel y cartón"] },
  { title: "Revistas", description: "Cómo reciclar revistas", materials: ["Papel y cartón"] },
  { title: "Diarios", description: "Cómo reciclar diarios", materials: ["Papel y cartón"] },
  { title: "Folletos", description: "Cómo reciclar folletos", materials: ["Papel y cartón"] },
  { title: "Tetra brick", description: "Cómo reciclar envases tetra brick", materials: ["Papel y cartón"] },
  { title: "Botellas", description: "Cómo reciclar botellas", materials: ["Plásticos", "Vidrio"] },
  { title: "Tapas", description: "Cómo reciclar tapas", materials: ["Plásticos", "Metales"] },
  { title: "Papel film", description: "Cómo reciclar papel film", materials: ["Plásticos"] },
  { title: "Sachets", description: "Cómo reciclar sachets", materials: ["Plásticos"] },
  { title: "Bidones", description: "Cómo reciclar bidones", materials: ["Plásticos"] },
  { title: "Potes", description: "Cómo reciclar potes", materials: ["Plásticos", "Vidrio"] },
  { title: "Vajilla descartable", description: "Cómo reciclar vajilla descartable", materials: ["Plásticos"] },
  { title: "Latas", description: "Cómo reciclar latas", materials: ["Metales"] },
  { title: "Desodorantes", description: "Cómo reciclar envases de desodorantes", materials: ["Metales", "Plásticos"] },
  { title: "Llaves", description: "Cómo reciclar llaves metálicas", materials: ["Metales"] },
  { title: "Frascos", description: "Cómo reciclar frascos", materials: ["Vidrio"] },
];

export default function HowToRecycle() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const router = useRouter();

  const filteredItems = useMemo(() => 
    recyclingInfo.filter(item => item.materials.includes(selectedMaterial)),
    [selectedMaterial]
  );

  const renderItem = useCallback(({ item }) => (
    <Card style={[styles.card, styles.materialCard]}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.chipContainer}>
          {item.materials.map((material) => (
            <Chip 
              key={material} 
              compact 
              style={[styles.chip, { backgroundColor: materialColors[material] }]} 
              textStyle={styles.chipText}
            >
              {material}
            </Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/wiki/how-to-recycle/${item.title.toLowerCase().replace(/ /g, '-')}`
            )
          }
        >
          <Text style={styles.link}>Ver más</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  ), [router]);

  const ListHeaderComponent = useCallback(() => (
    <>
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
          <Text variant="titleLarge" style={styles.cardTitle}>Primeros pasos</Text>
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
            backgroundColor: selectedMaterial === material ? materialColors[material] : 'transparent',
          },
          labelStyle: {
            color: selectedMaterial === material ? '#FFFFFF' : materialColors[material],
          },
        }))}
        style={styles.segmentedButtons}
      />
    </>
  ), [selectedMaterial, router]);

  return (
    <View style={styles.container}>
      <FlashList
        data={filteredItems}
        renderItem={renderItem}
        estimatedItemSize={100}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  listContent: {
    padding: 16,
  },
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
    color: '#1B5E20',
  },
  arrow: {
    alignSelf: "center",
    marginVertical: 24,
  },
  card: {
    paddingBottom: 8,
    backgroundColor: '#E8F5E9',
  },
  materialCard: {
    marginTop: 16,
  },
  cardTitle: {
    color: '#1B5E20',
  },
  cardDescription: {
    color: '#2E7D32',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    color: '#FFFFFF',
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
    backgroundColor: 'transparent',
  },
});
