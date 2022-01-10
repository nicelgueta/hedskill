import HomeScreen from './home';
import { useAppColors } from '../colors';
import { useColorMode } from "native-base";

export const useScreenConfig = () => {
    const colors = useAppColors();

    return ([
        {
            name: "Home",
            component: HomeScreen,
            customOptions: {
                title: "hedskill"
            }
        }
    ])
};

export const useMenuOptions = () => {
    const { colorMode, toggleColorMode} = useColorMode();
    const inverseColorMode = colorMode == 'dark' ? 'light' : 'dark';
    return ({
            Profile: [
                {
                    item: "Account Settings",
                    action: () => alert("open settings")
                },
                {
                    item: "Leagues",
                    action: () => alert("open leagues")
                },
            ],
            App: [
                {
                    item: `Switch to ${inverseColorMode} mode`,
                    action: toggleColorMode
                }
            ]

        })
}