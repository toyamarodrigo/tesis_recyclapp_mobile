import { useState, useMemo, useRef, useCallback } from 'react';
import { greenPointApi, type TransformedGreenPoint } from '@api/api.greenPoint';
import type MapView from "react-native-maps";
import { useUserLocation } from "@hooks/useUserLocation";
import { useQuery } from '@tanstack/react-query';
import type { FlashList } from "@shopify/flash-list";

export type SortOrder = "asc" | "desc";

export const useMapLogic = () => {
  const { userLocation, locationPermission, requestPermission } =
    useUserLocation();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: greenPoints = [], isPending, error } = useQuery({
    queryKey: ['greenPoints'],
    queryFn: greenPointApi.getGreenPoint,
  });

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
  const [selectedMarker, setSelectedMarker] = useState<TransformedGreenPoint | null>(null);

  const centerMapOnMarker = useCallback((marker: TransformedGreenPoint) => {
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

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const flashListRef = useRef<FlashList<TransformedGreenPoint>>(null);

  const scrollToTop = useCallback(() => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const handleScroll = useCallback((offset: number) => {
    setShowScrollTopButton(offset > 100); // Show button when scrolled more than 100 pixels
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
    isPending,
    error,
    flashListRef,
    scrollToTop,
    showScrollTopButton,
    handleScroll,
  };
};
