import { TouchableOpacity, View, StyleSheet } from "react-native";

export const CarouselPagination = ({ length, activeIndex, onPress }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length }).map((_, index) => (
        <TouchableOpacity
          key={index.toString()}
          style={[
            styles.paginationButton,
            index === activeIndex && styles.paginationButtonActive,
          ]}
          onPress={() => onPress(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  paginationButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: "rgba(0, 128, 0, 0.3)", // Light green color
  },
  paginationButtonActive: {
    backgroundColor: "rgb(0, 128, 0)", // Solid green color
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
