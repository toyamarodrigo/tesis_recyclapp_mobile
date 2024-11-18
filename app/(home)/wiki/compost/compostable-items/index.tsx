import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import { router } from 'expo-router';

const compostableItems = [
  "Restos de frutas y verduras",
  "Posos y filtros de café",
  "Bolsitas de té (sin grapas)",
  "Cáscaras de huevo",
  "Cáscaras de frutos secos",
  "Rollos de cartón",
  "Papel limpio",
  "Recortes de jardín",
  "Recortes de césped",
  "Plantas de interior",
  "Heno y paja",
  "Hojas",
  "Aserrín",
  "Virutas de madera",
  "Trapos de algodón y lana",
  "Pelusa de secadora y aspiradora",
  "Pelo y pelaje",
  "Cenizas de chimenea"
];

export default function CompostableItems() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor="#1B5E20"
          style={styles.backButton}
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Elementos Compostables</Text>
      </View>
      <List.Section>
        {compostableItems.map((item) => (
          <List.Item
            key={item}
            title={<Text style={styles.listItemText}>{item}</Text>}
            left={props => <List.Icon {...props} icon="leaf" color="#1B5E20" />}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginLeft: -8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    flex: 1,
    flexWrap: 'wrap',
  },
  listItemText: {
    flexShrink: 1,
  },
});