import { type Href, Link } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const CircleLink: React.FC<{ href: Href; icon: React.ReactNode; text: string; color: string }> = ({ href, icon, text, color }) => (
  <Link href={href} asChild>
    <TouchableOpacity style={styles.circleLinkWrapper}>
      <View style={[styles.circleLink, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.circleLinkText}>{text}</Text>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  circleLinkWrapper: {
    alignItems: "center",
    width: 80,
  },
  circleLink: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circleLinkText: {
    color: "#1B5E20",
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
    flexWrap: "wrap",
    width: 80,
  },
});
