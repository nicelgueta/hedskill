import { extendTheme, useColorMode } from "native-base"

export const useAppColors = () => {
    const { colorMode, } = useColorMode();
    let colors = {};
    const primaryLighter = "#6ee7b7"
    const primary = "#0e9c53"
    const primaryDarker = "#10b981"

    if (colorMode === "dark"){
        colors.bgLighter = "#002851"
        colors.bg = "#000e21"
        colors.bgDarker = "#18181b"

        colors.bgSecondaryLighter = colors.bgLighter 
        colors.bgSecondary = colors.bg // dark is same bg
        colors.bgSecondaryDarker = colors.bgDarker

        colors.foreLighter= primaryLighter
        colors.fore = primary
        colors.foreDarker = primaryDarker

        colors.foreSecondaryLighter= primaryLighter
        colors.foreSecondary = primary
        colors.foreSecondaryDarker = primaryDarker

        colors.foreActive = "#6366f1"
        colors.foreActiveLight = "#818cf8"
        colors.foreActiveDark = "#4f46e5"

        colors.scheme = "orange"
        colors.bgGradientDtL = {
            linearGradient: {
                colors: [colors.bgLighter, colors.bg, colors.bgDarker],
                start: [0, 0],
                end: [1, 0],
              },
        }
    } else {
        colors.bgSecondaryLighter = "#13ba64"
        colors.bgSecondary = primary
        colors.bgSecondaryDarker = "#0a8043"

        colors.bgLighter = "#fafaf9"
        colors.bg = "#fff"//"#ecfdf5"
        colors.bgDarker = "#e7e5e4"

        colors.fore = primary
        colors.foreLighter = "#fff"
        colors.foreDarker = "#0e9c53"

        colors.foreSecondary = "#ecfdf5"
        colors.foreSecondaryLighter= "#fff"
        colors.foreSecondaryDarker = "#d1fae5"
        
        colors.foreActive = "#06b6d4"
        colors.foreActiveLight = "#22d3ee"
        colors.foreActiveDark = "#0891b2"
        colors.scheme = "tertiary"
    }
    return { ...colors, primary, primaryLighter, primaryDarker };
};

export const useTheme = () => {
    const colors = useAppColors();
    const theme = {
        // dones't seem to recognise new colors for ssome reason
        // choosing to ignore this and use own custom hook
        colors: {
            bg: {
                lighter: "#6ee7b7",
            }
        },
        config: {
            initialColorMode: 'light',
        },
    }
    return (
        extendTheme(theme)
    )
}