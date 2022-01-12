import HomeScreen from './home';
import LeagueScreen from './league';
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
        },
        {
            name: "League",
            component: LeagueScreen,
            customOptions: {
                title: "Create new league"
            }
        },
        
    ])
};

export const useMenuOptions = (navigation) => {
    const { colorMode, toggleColorMode} = useColorMode();
    const inverseColorMode = colorMode == 'dark' ? 'light' : 'dark';
    return ({
            Profile: [
                {
                    item: "Account Settings",
                    action: () => alert("open settings")
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