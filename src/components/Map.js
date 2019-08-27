import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import MapView, { Polyline } from "react-native-maps";

const Map = () => {
  let points = [];
  for (let i = 0; i < 20; i++) {
    points.push({
      latitude: -23.55051 + i * 0.001,
      longitude: -46.6333 + i * 0.001
    });
  }

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        initialRegion={{
          // Para que o mapa se inicie em uma região pre-definida...
          latitude: -23.55051,
          longitude: -46.6333,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Polyline coordinates={points} />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
