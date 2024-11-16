import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { CardRecyclingItem } from "@features/wiki/components/card-recycling-item";
import { ListHeader } from "@features/wiki/components/list-header";
import { recyclingInfo } from "@features/wiki/constants/recycling-info";
import { useSelectedMaterialStore } from "@features/wiki/hooks/useSelectedMaterial";

export default function HowToRecycle() {
  const selectedMaterial = useSelectedMaterialStore(
    (state) => state.selectedMaterial
  );
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
          <ListHeader selectedMaterial={selectedMaterial} router={router} />
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
