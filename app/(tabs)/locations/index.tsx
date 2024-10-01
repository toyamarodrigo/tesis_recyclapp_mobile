import { colors } from "@constants/colors.constant";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Text, Button, Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { useMapLogic } from "@features/locations/hooks/useMapLogic";
import { GreenPoint } from "@features/locations/components/card-green-point";
import { LocationControls } from "@features/locations/components/location-controls";
import { PermissionStatus } from "expo-location";

const Locations = () => {
  const {
    mapRef,
    filteredAndSortedGreenPoints,
    selectedMarker,
    locationPermission,
    requestPermission,
    centerMapOnMarker,
    centerMapOnUserLocation,
    sortOrder,
    toggleSortOrder,
    searchQuery,
    handleSearch,
    userLocation,
  } = useMapLogic();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "100%"], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const handleSearchBarFocus = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (userLocation && locationPermission === PermissionStatus.GRANTED) {
      centerMapOnUserLocation();
    }
  }, [userLocation, locationPermission, centerMapOnUserLocation]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || -34.6037,
          longitude: userLocation?.longitude || -58.3816,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={locationPermission === PermissionStatus.GRANTED}
        showsMyLocationButton={false}
      >
        {filteredAndSortedGreenPoints.map((marker) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}`}
            coordinate={marker}
            pinColor={
              selectedMarker === marker ? colors.green[500] : colors.red[500]
            }
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>

      <LocationControls
        locationPermission={locationPermission}
        requestPermission={requestPermission}
        centerMapOnUserLocation={centerMapOnUserLocation}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Puntos Verdes</Text>
              <Button
                icon={sortOrder === "asc" ? "sort-alphabetical-ascending" : "sort-alphabetical-descending"}
                onPress={toggleSortOrder}
              >
                {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
            </View>
            <Searchbar
              placeholder="Buscar puntos verdes"
              onChangeText={handleSearch}
              value={searchQuery}
              style={styles.searchbar}
              onFocus={handleSearchBarFocus}
            />
            <FlashList
              data={filteredAndSortedGreenPoints}
              renderItem={({ item: marker }) => (
                <View style={styles.greenPointContainer}>
                  <GreenPoint
                    marker={marker}
                    centerMapOnMarker={centerMapOnMarker}
                    bottomSheetRef={bottomSheetRef}
                    selectedMarker={selectedMarker}
                  />
                </View>
              )}
              estimatedItemSize={100}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchbar: {
    margin: 16,
  },
  listContainer: {
    padding: 16,
  },
  greenPointContainer: {
    marginBottom: 8, // Add some bottom margin to each item
  },
  separator: {
    height: 8, // Add a separator between items
  },
});

export default Locations;