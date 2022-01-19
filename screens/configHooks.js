import HomeScreen from './home';
import LeagueScreen from './league';
import FriendScreen from './friends';
import { useAppColors } from '../colors';
import { useColorMode } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';

export const useScreenConfig = () => {
    const colors = useAppColors();

    return ([
        {
            name: "Home",
            component: HomeScreen,
            customOptions: {
                title: "hedskill",
                headerTitleStyle: {
                    fontSize: 28
                }
            }
        },
        {
            name: "League",
            component: LeagueScreen,
            customOptions: {
                title: "Create new league"
            }
        },
        {
            name: "Friends",
            component: FriendScreen,
            customOptions: {
                headerRight: null
            }
        },
        
    ])
};

export const useMenuOptions = () => {
    const navigation = useNavigation();
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