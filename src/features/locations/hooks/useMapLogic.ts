import { useCallback, useMemo, useRef, useState } from "react";
import type MapView from "react-native-maps";
import { useUserLocation } from "@hooks/useUserLocation";
import greenpointjson from "@api/green-point.json";

export type SortOrder = "asc" | "desc";

export const useMapLogic = () => {
  const { userLocation, locationPermission, requestPermission } =
    useUserLocation();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const greenPoints = useMemo(
    () =>
      greenpointjson.features.map((feature) => ({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        title: feature.properties.nombre,
        description: feature.properties.direccion,
      })),
    []
  );

  const filteredAndSortedGreenPoints = useMemo(() => {
    return [...greenPoints]
      .filter(
        (point) =>
          point.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          point.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
  }, [greenPoints, sortOrder, searchQuery]);

  const mapRef = useRef<MapView>(null);
  const [selectedMarker, setSelectedMarker] = useState<
    (typeof greenPoints)[0] | null
  >(null);

  const centerMapOnMarker = useCallback((marker: (typeof greenPoints)[0]) => {
    setSelectedMarker(marker);
    mapRef.current?.animateToRegion(
      {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  }, []);

  const centerMapOnUserLocation = useCallback(() => {
    if (userLocation) {
      mapRef.current?.animateToRegion(
        {
          ...userLocation,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  }, [userLocation]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    mapRef,
    filteredAndSortedGreenPoints,
    selectedMarker,
    userLocation,
    locationPermission,
    requestPermission,
    centerMapOnMarker,
    centerMapOnUserLocation,
    sortOrder,
    toggleSortOrder,
    searchQuery,
    handleSearch,
  };
};
