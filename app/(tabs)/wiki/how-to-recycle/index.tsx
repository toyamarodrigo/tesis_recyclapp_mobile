import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { CardRecyclingItem } from "@features/wiki/components/card-recycling-item";
import { ListHeader } from "@features/wiki/components/list-header";
import { materials } from "@features/wiki/models/materials";

const recyclingInfo = [
  {
    title: "Cajas",
    description: "Cómo reciclar cajas de cartón",
    materials: ["Papel y cartón"],
  },
  {
    title: "Sobres",
    description: "Cómo reciclar sobres",
    materials: ["Papel y cartón"],
  },
  {
    title: "Revistas",
    description: "Cómo reciclar revistas",
    materials: ["Papel y cartón"],
  },
  {
    title: "Diarios",
    description: "Cómo reciclar diarios",
    materials: ["Papel y cartón"],
  },
  {
    title: "Folletos",
    description: "Cómo reciclar folletos",
    materials: ["Papel y cartón"],
  },
  {
    title: "Tetra brick",
    description: "Cómo reciclar envases tetra brick",
    materials: ["Papel y cartón"],
  },
  {
    title: "Botellas",
    description: "Cómo reciclar botellas",
    materials: ["Plásticos", "Vidrio"],
  },
  {
    title: "Tapas",
    description: "Cómo reciclar tapas",
    materials: ["Plásticos", "Metales"],
  },
  {
    title: "Papel film",
    description: "Cómo reciclar papel film",
    materials: ["Plásticos"],
  },
  {
    title: "Sachets",
    description: "Cómo reciclar sachets",
    materials: ["Plásticos"],
  },
  {
    title: "Bidones",
    description: "Cómo reciclar bidones",
    materials: ["Plásticos"],
  },
  {
    title: "Potes",
    description: "Cómo reciclar potes",
    materials: ["Plásticos", "Vidrio"],
  },
  {
    title: "Vajilla descartable",
    description: "Cómo reciclar vajilla descartable",
    materials: ["Plásticos"],
  },
  {
    title: "Latas",
    description: "Cómo reciclar latas",
    materials: ["Metales"],
  },
  {
    title: "Desodorantes",
    description: "Cómo reciclar envases de desodorantes",
    materials: ["Metales", "Plásticos"],
  },
  {
    title: "Llaves",
    description: "Cómo reciclar llaves metálicas",
    materials: ["Metales"],
  },
  {
    title: "Frascos",
    description: "Cómo reciclar frascos",
    materials: ["Vidrio"],
  },
];

export default function HowToRecycle() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const router = useRouter();

  const filteredItems = recyclingInfo.filter((item) =>
    item.materials.includes(selectedMaterial)
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={filteredItems}
        renderItem={({ item }) => (
          <CardRecyclingItem
            item={item}
            onPress={() =>
              router.push(
                `/wiki/how-to-recycle/${item.title.toLowerCase().replace(/ /g, "-")}`
              )
            }
          />
        )}
        estimatedItemSize={100}
        ListHeaderComponent={
          <ListHeader
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            router={router}
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  listContent: {
    padding: 16,
  },
});
