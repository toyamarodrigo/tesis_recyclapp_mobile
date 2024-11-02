import { View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "src/theme";

export default function DataEmpty({ displayText }: { displayText: string }) {
  return (
    <View>
      <Text
        style={{
          fontWeight: "300",
          fontSize: 20,
          color: theme.colors.tertiary,
          textAlign: "center",
        }}
      >
        {displayText}
      </Text>
    </View>
  );
}
