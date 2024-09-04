import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1ea367",
    secondary: "#4E6354",
    tertiary: "#3B6471",
    error: "rgb(186, 26, 26)",
    // "primary": "rgb(0, 109, 65)",
    // "onPrimary": "rgb(255, 255, 255)",
    // "primaryContainer": "rgb(114, 252, 176)",
    // "onPrimaryContainer": "rgb(0, 33, 16)",
    // "secondary": "rgb(78, 99, 84)",
    // "onSecondary": "rgb(255, 255, 255)",
    // "secondaryContainer": "rgb(209, 232, 214)",
    // "onSecondaryContainer": "rgb(12, 31, 20)",
    // "tertiary": "rgb(59, 100, 113)",
    // "onTertiary": "rgb(255, 255, 255)",
    // "tertiaryContainer": "rgb(191, 233, 248)",
    // "onTertiaryContainer": "rgb(0, 31, 39)",
    // "error": "rgb(186, 26, 26)",
    // "onError": "rgb(255, 255, 255)",
    // "errorContainer": "rgb(255, 218, 214)",
    // "onErrorContainer": "rgb(65, 0, 2)",
    // "background": "rgb(251, 253, 248)",
    // "onBackground": "rgb(25, 28, 26)",
    // "surface": "rgb(251, 253, 248)",
    // "onSurface": "rgb(25, 28, 26)",
    // "surfaceVariant": "rgb(220, 229, 220)",
    // "onSurfaceVariant": "rgb(65, 73, 66)",
    // "outline": "rgb(113, 121, 114)",
    // "outlineVariant": "rgb(192, 201, 192)",
    // "shadow": "rgb(0, 0, 0)",
    // "scrim": "rgb(0, 0, 0)",
    // "inverseSurface": "rgb(46, 49, 46)",
    // "inverseOnSurface": "rgb(240, 241, 237)",
    // "inversePrimary": "rgb(82, 223, 150)",
    // "elevation": {
    //   "level0": "transparent",
    //   "level1": "rgb(238, 246, 239)",
    //   "level2": "rgb(231, 242, 233)",
    //   "level3": "rgb(223, 237, 228)",
    //   "level4": "rgb(221, 236, 226)",
    //   "level5": "rgb(216, 233, 222)"
    // },
    // "surfaceDisabled": "rgba(25, 28, 26, 0.12)",
    // "onSurfaceDisabled": "rgba(25, 28, 26, 0.38)",
    // "backdrop": "rgba(42, 50, 44, 0.4)"
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
