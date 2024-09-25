import { colors } from "@constants/colors.constant";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import greenpointjson from "@api/green-point.json";

const Locations = () => {
  const greenPoints = greenpointjson.features.map((feature) => ({
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
    title: feature.properties.nombre,
    description: feature.properties.direccion,
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.6037,
          longitude: -58.3816,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {greenPoints.map((marker) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}`}
            coordinate={marker}
            pinColor={colors.red[500]}
            title="Reciclapp"
            description="Reciclapp"
          />
        ))}
      </MapView>
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
});

export default Locations;
