import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, type Href } from "expo-router";
import type { ReactNode } from "react";

interface CircleLinkProps {
  href: Href;
  icon: ReactNode;
  text: string;
  color: string;
}

export const CircleLink = ({ href, icon, text, color }: CircleLinkProps) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={[styles.circle, { backgroundColor: color }]}>{icon}</View>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
});
