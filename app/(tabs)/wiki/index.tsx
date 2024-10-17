import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const useDeferredValue = (value: string, delay: number) => {
  const [deferredValue, setDeferredValue] = useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDeferredValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return deferredValue;
};

const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
};

type IconName = "bottle-wine" | "bottle-soda" | "battery" | "file-multiple" | "package-variant-closed";

interface Item {
  name: string;
  icon: IconName;
}

interface Section {
  title: string;
  data: Item[];
}

export default function Wiki() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery, 300);

  // TODO: add all recyclable items and special waste items from the database
  const allItems: Section[] = useMemo(
    () => [
      {
        title: "Materiales reciclables",
        data: [
          { name: "Vidrio", icon: "bottle-wine" },
          { name: "Cartón y Papel", icon: "package-variant-closed" },
          { name: "Plástico", icon: "bottle-soda" },
        ],
      },
      {
        title: "Desechables especiales\n¡no van a la basura!",
        data: [
          { name: "Pilas", icon: "battery" },
          { name: "Papel carbónico", icon: "file-multiple" },
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

  const renderItem = useCallback(
    ({ item, section }: { item: Item; section: Section }) => (
      <View style={[
        styles.card,
        section.title === "Materiales reciclables" ? styles.recyclableCard : styles.specialWasteCard
      ]}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={24} 
          color="#1B5E20"
          style={styles.cardIcon} 
        />
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
    ),
    []
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: Section }) => (
      <Text style={styles.listTitle}>{title}</Text>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.circleLinksContainer}>
        <Link href="/wiki/compost" asChild>
          <TouchableOpacity style={styles.circleLinkWrapper}>
            <View style={[styles.circleLink, { backgroundColor: '#8BC34A' }]}>
              <MaterialIcons name="compost" size={40} color="white" />
            </View>
            <Text style={styles.circleLinkText}>Compostaje</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/wiki/how-to-recycle" asChild>
          <TouchableOpacity style={styles.circleLinkWrapper}>
            <View style={[styles.circleLink, { backgroundColor: '#4CAF50' }]}>
              <MaterialCommunityIcons name="recycle" size={40} color="white" />
            </View>
            <Text style={styles.circleLinkText}>Cómo Reciclar</Text>
          </TouchableOpacity>
        </Link>
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
            renderItem={({ item }) => (
              <FlashList
                data={item.data}
                renderItem={({ item: subItem }) => renderItem({ item: subItem, section: item })}
                estimatedItemSize={50}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListHeaderComponent={() => renderSectionHeader({ section: item })}
              />
            )}
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
    backgroundColor: '#E8F5E9',
  },
  circleLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  circleLinkWrapper: {
    alignItems: "center",
    width: 80,
  },
  circleLink: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleLinkText: {
    color: "#1B5E20",
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
    flexWrap: "wrap",
    width: 80,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 10,
    color: "#2E7D32",
  },
  card: {
    borderRadius: 8,
    padding: 16,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  recyclableCard: {
    backgroundColor: "#C8E6C9",
  },
  specialWasteCard: {
    backgroundColor: "#FFECB3",
  },
  cardIcon: {
    marginRight: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#1B5E20",
    flex: 1,
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
  separator: {
    height: 8,
  },
});
