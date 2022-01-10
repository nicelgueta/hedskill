import { extendTheme, useColorMode } from "native-base"

export const useAppColors = () => {
    const { colorMode, } = useColorMode();
    let colors = {};
    const primaryLighter = "#6ee7b7"
    const primary = "#34d399"
    const primaryDarker = "#10b981"

    if (colorMode === "dark"){
        colors.bgLighter = "#002851"
        colors.bg = "#000e21"
        colors.bgDarker = "#18181b"

        colors.bgSecondaryLighter = "#002851"
        colors.bgSecondary = colors.bg // dark is same bg
        colors.bgSecondaryDarker = "#18181b"

        colors.foreLighter= primaryLighter
        colors.fore = primary
        colors.foreDarker = primaryDarker

        colors.foreSecondaryLighter= primaryLighter
        colors.foreSecondary = primary
        colors.foreSecondaryDarker = primaryDarker

        colors.foreActive = "#00B5D8"
        colors.foreActiveLight = "#0BC5EA"
        colors.foreActiveDark = "#00A3C4"

        colors.scheme = "orange"
        colors.bgGradientDtL = {
            linearGradient: {
                colors: [colors.bgLighter, colors.bg, colors.bgDarker],
                start: [0, 0],
                end: [1, 0],
              },
        }
    } else {
        colors.bgLighter = primaryLighter
        colors.bg = primary
        colors.bgDarker = primaryDarker

        colors.bgSecondaryLighter = "#fafaf9"
        colors.bgSecondary = "#f5f5f4"
        colors.bgSecondaryDarker = "#e7e5e4"

        colors.fore = "#ecfdf5"
        colors.foreLighter = "#fff"
        colors.foreDarker = "#d1fae5"

        colors.foreSecondary = primary
        colors.foreSecondaryLighter= primaryLighter
        colors.foreSecondaryDarker = primaryDarker
        
        colors.foreActive = "#48BB78"
        colors.foreActiveLight = "#68D391"
        colors.foreActiveDark = "#38A169"
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
            initialColorMode: 'dark',
        },
    }
    return (
        extendTheme(theme)
    )
}