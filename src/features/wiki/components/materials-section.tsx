import { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CardMaterial } from "./card-material";
import type { MaterialSection } from "../models/card-material.type";

export const MaterialsSection: React.FC<{ section: MaterialSection }> = ({
  section,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedItems = isExpanded ? section.data : section.data.slice(0, 3);

  return (
    <View>
      <Text style={styles.listTitle}>{section.title}</Text>
      {displayedItems.map((item, index) => (
        <Fragment key={item.name}>
          <CardMaterial item={item} sectionTitle={section.title} />
          {index < displayedItems.length - 1 && (
            <View style={styles.separator} />
          )}
        </Fragment>
      ))}
      {section.data.length > 3 && (
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.showMoreText}>
            {isExpanded ? "Mostrar menos" : "Mostrar más"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 10,
    color: "#2E7D32",
  },
  separator: {
    height: 8,
  },
  showMoreButton: {
    alignItems: "center",
    padding: 10,
    marginTop: 8,
    width: "100%",
  },
  showMoreText: {
    color: "#1B5E20",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
