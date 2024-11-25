import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(0, 110, 34)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(128, 253, 136)",
    onPrimaryContainer: "rgb(0, 33, 5)",
    secondary: "#4CAF50",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(213, 232, 207)",
    onSecondaryContainer: "rgb(16, 31, 16)",
    tertiary: "rgb(57, 101, 107)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(188, 235, 241)",
    onTertiaryContainer: "rgb(0, 31, 35)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 253, 247)",
    onBackground: "rgb(26, 28, 25)",
    green: "rgb(2, 110, 35)",
    onGreen: "rgb(255, 255, 255)",
    greenContainer: "rgb(154, 248, 155)",
    onGreenContainer: "rgb(0, 33, 5)",
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
