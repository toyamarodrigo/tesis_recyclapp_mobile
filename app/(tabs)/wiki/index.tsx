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
import { Ionicons } from "@expo/vector-icons";

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

const Wiki = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery, 300);

  const allItems = useMemo(
    () => [
      {
        title: "Materiales reciclables",
        data: [
          { name: "Vidrio" },
          { name: "Cartón y Papel" },
          { name: "Plástico" },
        ],
      },
      {
        title: "Desechables especiales\n¡no van a la basura!",
        data: [{ name: "Pilas" }, { name: "Papel carbónico" }],
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
    ({ item }: { item: { name: string } }) => (
      <View style={styles.card}>
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
    ),
    []
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: { title: string } }) => (
      <Text style={styles.listTitle}>{title}</Text>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.circleLinksContainer}>
        <Link href="/wiki/compost" asChild>
          <TouchableOpacity style={styles.circleLinkWrapper}>
            <View style={styles.circleLink} />
            <Text style={styles.circleLinkText}>Compost</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/wiki/how-to-recycle" asChild>
          <TouchableOpacity style={styles.circleLinkWrapper}>
            <View style={styles.circleLink} />
            <Text style={styles.circleLinkText}>How to Recycle</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar material"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlashList
        data={filteredItems}
        renderItem={({ item }) => (
          <FlashList
            data={item.data}
            renderItem={renderItem}
            estimatedItemSize={50}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={() => renderSectionHeader({ section: item })}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  circleLinksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 28,
  },
  circleLinkWrapper: {
    alignItems: "center",
    width: 80,
  },
  circleLink: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
  },
  circleLinkText: {
    color: "black",
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
    flexWrap: "wrap",
    width: 80,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 28,
    width: "100%",
    alignItems: "center",
  },
  cardText: {
    fontSize: 14,
    textAlign: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderColor: "gray",
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
  },
  separator: {
    height: 8,
  },
});

export default Wiki;
