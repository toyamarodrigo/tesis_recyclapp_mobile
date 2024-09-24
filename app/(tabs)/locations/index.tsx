import { colors } from "@constants/colors.constant";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const markers = [
  {
    latitude: -34.6037,
    longitude: -58.3816,
    title: "punto1",
    description: "punto1",
  },
  {
    latitude: -34.6137,
    longitude: -58.3916,
    title: "punto2",
    description: "punto2",
  },
];

const Locations = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.6037,
          longitude: -58.3816,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}`}
            coordinate={marker}
            pinColor={colors.red[500]}
            title="Reciclapp"
            description="Reciclapp"
          />
        ))}
        {/* <Marker
          coordinate={{ latitude: -34.6037, longitude: -58.3816 }}
          pinColor={colors.red[500]}
          title="Reciclapp"
          description="Reciclapp"
        /> */}
      </MapView>
    </View>
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
