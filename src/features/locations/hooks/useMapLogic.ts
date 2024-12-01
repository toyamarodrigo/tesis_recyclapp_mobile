import { useState, useMemo, useRef, useCallback } from "react";
import { greenPointApi } from "@api/api.greenPoint";
import type MapView from "react-native-maps";
import { useUserLocation } from "@hooks/useUserLocation";
import { useQuery } from "@tanstack/react-query";
import type { FlashList } from "@shopify/flash-list";
import type { TransformedGreenPoint } from "@models/greenPoint.type";
import type { Address } from "@models/address.type";
import { useAddressListStores } from "@hooks/useAddress";

export type SortOrder = "asc" | "desc";

export const useMapLogic = () => {
  const { userLocation, locationPermission, requestPermission } =
    useUserLocation();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarker, setSelectedMarker] =
    useState<TransformedGreenPoint | null>(null);

  const {
    data: greenPoints = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["greenPoints"],
    queryFn: greenPointApi.getGreenPoint,
  });

  const { data: addresses = [], isPending: isPendingAddresses } =
    useAddressListStores();

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

  const filteredAndSortedAddresses = useMemo(() => {
    return [...addresses]
      .filter((address) =>
        address.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        return sortOrder === "asc"
          ? (a.displayName ?? "").localeCompare(b.displayName ?? "")
          : (b.displayName ?? "").localeCompare(a.displayName ?? "");
      });
  }, [addresses, sortOrder, searchQuery]);

  const mapRef = useRef<MapView>(null);

  const centerMapOnMarker = useCallback((marker) => {
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

  const centerMapOnAddress = useCallback((address) => {
    setSelectedMarker(address);
    mapRef.current?.animateToRegion(
      {
        latitude: address.latitude,
        longitude: address.longitude,
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
  const flashListRefAddresses = useRef<FlashList<Address>>(null);

  const scrollToTop = useCallback(() => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const handleScroll = useCallback((offsetY: number) => {
    setShowScrollTopButton(offsetY > 100);
  }, []);

  return {
    mapRef,
    filteredAndSortedGreenPoints,
    filteredAndSortedAddresses,
    selectedMarker,
    userLocation,
    locationPermission,
    requestPermission,
    centerMapOnMarker,
    centerMapOnAddress,
    centerMapOnUserLocation,
    sortOrder,
    toggleSortOrder,
    searchQuery,
    handleSearch,
    isPending,
    isPendingAddresses,
    error,
    flashListRef,
    flashListRefAddresses,
    scrollToTop,
    showScrollTopButton,
    handleScroll,
  };
};
