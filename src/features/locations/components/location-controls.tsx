import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { PermissionStatus } from 'expo-location';
import { colors } from '@constants/colors.constant';
import { Fragment } from 'react';

interface LocationControlsProps {
  locationPermission: PermissionStatus | null;
  requestPermission: () => void;
  centerMapOnUserLocation: () => void;
}

export const LocationControls = ({
  locationPermission,
  requestPermission,
  centerMapOnUserLocation,
}: LocationControlsProps) => {
  return (
    <Fragment>
      {locationPermission === PermissionStatus.GRANTED && (
        <View style={styles.locationButton}>
          <Button
            icon="crosshairs-gps"
            mode="contained"
            onPress={centerMapOnUserLocation}
          >
            Mi ubicación
          </Button>
        </View>
      )}
      {locationPermission !== PermissionStatus.GRANTED && (
        <View style={styles.permissionWarning}>
          <Text>
            Se requiere permiso de ubicación para mostrar tu posición en el
            mapa.
          </Text>
          <Button
            mode="contained"
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            Solicitar permiso
          </Button>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  locationButton: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  permissionWarning: {
    padding: 16,
    backgroundColor: colors.yellow[100],
    marginBottom: 16,
  },
  permissionButton: {
    marginTop: 8,
  },
});