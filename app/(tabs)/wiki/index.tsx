import { useState, useMemo } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CircleLink } from "@features/wiki/components/circle-link";
import type { MaterialSection } from "@features/wiki/models/card-material.type";
import { MaterialsSection } from "@features/wiki/components/materials-section";
import { useDeferredValue } from "@features/wiki/hooks/useDeferredValue";
import { normalizeText } from "@features/wiki/utils/normalize-text";

export default function Wiki() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery, 300);

  const allItems: MaterialSection[] = useMemo(
    () => [
      {
        title: "Materiales reciclables",
        data: [
          { name: "Papel y cartón", icon: "package-variant-closed" },
          { name: "Plásticos", icon: "bottle-soda" },
          { name: "Metales", icon: "trash-can" },
          { name: "Vidrio", icon: "bottle-wine" },
          { name: "Cajas", icon: "package-variant-closed" },
          { name: "Sobres", icon: "file-multiple" },
          { name: "Revistas", icon: "book-open-page-variant" },
          { name: "Diarios", icon: "newspaper" },
          { name: "Folletos", icon: "file-multiple" },
          { name: "Tetra brick", icon: "food-takeout-box" },
          { name: "Botellas", icon: "bottle-soda-classic" },
          { name: "Tapas", icon: "bottle-tonic" },
          { name: "Papel film", icon: "file-multiple" },
          { name: "Sachets", icon: "food-takeout-box" },
          { name: "Bidones", icon: "bottle-soda" },
          { name: "Potes", icon: "cup" },
          { name: "Vajilla descartable", icon: "silverware-fork-knife" },
          { name: "Latas", icon: "bottle-soda" },
          { name: "Desodorantes", icon: "spray" },
          { name: "Llaves", icon: "key" },
          { name: "Frascos", icon: "glass-fragile" },
        ],
      },
      {
        title: "Desechables especiales\n¡no van a la basura!",
        data: [
          { name: "Pilas", icon: "battery" },
          { name: "Papel carbónico", icon: "file-multiple" },
          { name: "Aceites Vegetales Usados", icon: "oil" },
          { name: "Aceites Minerales Usados", icon: "oil" },
          { name: "RAEEs", icon: "television-classic" },
          { name: "Pilas, baterías portátiles", icon: "battery" },
          {
            name: "Lámparas de bajo consumo conteniendo mercurio",
            icon: "lightbulb-fluorescent-tube",
          },
          { name: "Cartuchos y tonners", icon: "printer" },
          {
            name: "Envases de sustancias peligrosas",
            icon: "bottle-tonic-skull",
          },
          { name: "Envases vacíos de fitosanitarios", icon: "spray" },
          { name: "Neumáticos de desecho", icon: "tire" },
          { name: "Termómetros, esfigmomanómetros", icon: "thermometer" },
          { name: "Acumuladores de ácido plomo", icon: "car-battery" },
          { name: "Pinturas y solventes", icon: "brush" },
          { name: "Medicamentos", icon: "pill" },
          { name: "Membranas asfálticas", icon: "road-variant" },
        ],
      },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeText(deferredSearchQuery);
    if (!normalizedQuery) return allItems;
    return allItems
      .map((section) => ({
        ...section,
        data: section.data.filter(
          (item) =>
            normalizeText(item.name).includes(normalizedQuery) ||
            normalizeText(section.title).includes(normalizedQuery)
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [allItems, deferredSearchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.circleLinksContainer}>
        <CircleLink
          href="/wiki/compost"
          icon={<MaterialIcons name="compost" size={40} color="white" />}
          text="Compostaje"
          color="#8BC34A"
        />
        <CircleLink
          href="/wiki/how-to-recycle"
          icon={
            <MaterialCommunityIcons name="recycle" size={40} color="white" />
          }
          text="Cómo Reciclar"
          color="#4CAF50"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.searchBarContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#4CAF50"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Buscar material"
              placeholderTextColor="#81C784"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlashList
            data={filteredItems}
            renderItem={({ item }) => <MaterialsSection section={item} />}
            estimatedItemSize={200}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  circleLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: "#1B5E20",
  },
});
