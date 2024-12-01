import { colors } from "@constants/colors.constant";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  Text,
  Button,
  Searchbar,
  ActivityIndicator,
  FAB,
  SegmentedButtons,
} from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { useMapLogic } from "@features/locations/hooks/useMapLogic";
import { GreenPoint } from "@features/locations/components/card-green-point";
import { LocationControls } from "@features/locations/components/location-controls";
import { PermissionStatus } from "expo-location";
import { AddressCard } from "@features/locations/components/address-card";
import { theme } from "src/theme";

const Locations = () => {
  const {
    mapRef,
    filteredAndSortedGreenPoints,
    filteredAndSortedAddresses,
    selectedMarker,
    locationPermission,
    requestPermission,
    centerMapOnMarker,
    centerMapOnAddress,
    centerMapOnUserLocation,
    sortOrder,
    toggleSortOrder,
    searchQuery,
    handleSearch,
    userLocation,
    isPending,
    isPendingAddresses,
    error,
    flashListRef,
    flashListRefAddresses,
    scrollToTop,
    showScrollTopButton,
    handleScroll,
  } = useMapLogic();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "100%"], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [selectedView, setSelectedView] = useState("greenPoints");

  const displayedMarkers = useMemo(() => {
    return selectedView === "greenPoints"
      ? filteredAndSortedGreenPoints
      : filteredAndSortedAddresses;
  }, [selectedView, filteredAndSortedGreenPoints, filteredAndSortedAddresses]);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const handleSearchBarFocus = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      handleScroll(offsetY);
    },
    [handleScroll]
  );

  useEffect(() => {
    if (userLocation && locationPermission === PermissionStatus.GRANTED) {
      centerMapOnUserLocation();
    }
  }, [userLocation, locationPermission, centerMapOnUserLocation]);

  if (isPending || isPendingAddresses) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Error loading green points: {error.message}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: userLocation?.latitude || -34.6037,
          longitude: userLocation?.longitude || -58.3816,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={locationPermission === PermissionStatus.GRANTED}
        showsMyLocationButton={false}
      >
        {displayedMarkers.map((marker) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}`}
            coordinate={marker}
            pinColor={
              selectedMarker === marker ? colors.green[500] : colors.red[500]
            }
            title={
              "title" in marker ? marker.title : marker.displayName || "Tienda"
            }
            description={
              "description" in marker ? marker.description : marker.street
            }
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
        style={{ flex: 1 }}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={true}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.bottomSheetContent}>
            <SegmentedButtons
              value={selectedView}
              onValueChange={setSelectedView}
              buttons={[
                { value: "greenPoints", label: "Puntos Verdes" },
                { value: "addresses", label: "Tiendas" },
              ]}
              style={styles.segmentedButtons}
            />
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>
                {selectedView === "greenPoints" ? "Puntos Verdes" : "Tiendas"}
              </Text>
              <Button
                icon={
                  sortOrder === "asc"
                    ? "sort-alphabetical-ascending"
                    : "sort-alphabetical-descending"
                }
                onPress={toggleSortOrder}
              >
                {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
            </View>
            <Searchbar
              placeholder={`Buscar ${
                selectedView === "greenPoints" ? "puntos verdes" : "tiendas"
              }`}
              onChangeText={handleSearch}
              value={searchQuery}
              style={styles.searchbar}
              onFocus={handleSearchBarFocus}
            />
            {selectedView === "greenPoints" ? (
              <FlashList
                ref={flashListRef}
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
                onScroll={onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
              />
            ) : (
              <FlashList
                ref={flashListRefAddresses}
                data={filteredAndSortedAddresses}
                renderItem={({ item: address }) => (
                  <View style={styles.addressContainer}>
                    <AddressCard
                      address={address}
                      centerMapOnAddress={() => centerMapOnAddress(address)}
                      bottomSheetRef={bottomSheetRef}
                    />
                  </View>
                )}
                estimatedItemSize={100}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                onScroll={onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>

      <FAB
        icon="chevron-up"
        style={styles.fab}
        onPress={scrollToTop}
        visible={bottomSheetIndex === 1 && showScrollTopButton}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    backgroundColor: colors.gray[100],
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  greenPointContainer: {
    marginBottom: 8,
  },
  separator: {
    height: 8,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  segmentedButtons: {
    margin: 16,
  },
  addressContainer: {
    marginBottom: 8,
  },
});

export default Locations;
