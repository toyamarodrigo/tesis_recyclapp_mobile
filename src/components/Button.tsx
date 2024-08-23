import { colors } from "@constants/colors.constant";
import { Text, StyleSheet, Pressable, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  onPress: () => void;
  title?: string;
  colorText?: string;
  colorBg?: string;
}

const Button = ({
  onPress,
  title = "Button",
  colorText = colors.gray[700],
  colorBg = "none",
  ...rest
}: ButtonProps) => {
  const styles = createStyles(colorText, colorBg);

  return (
    <Pressable style={styles.button} onPress={onPress} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const createStyles = (colorText: string, colorBg: string) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colorBg,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "600",
      letterSpacing: 0.25,
      color: colorText,
    },
  });

export default Button;
