import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useScreenConfig } from './configHooks';
import { useAppColors } from '../colors';
import MenuButton from "./nav-components/menu-button";
import NotificationButton from "./nav-components/notifications-button";
import { HStack } from 'native-base';

export const useHeaderOptions = () => {
    const colors = useAppColors();
    return (
        {
            headerRight: () => (
                <HStack space={3}>
                    <NotificationButton />
                    <MenuButton />
                </HStack>
            ),
            headerStyle: {
                backgroundColor: colors.bgSecondary,
                textAlign: "center",
                borderBottomColor: colors.bgSecondaryLighter
            },
            headerTintColor: colors.foreSecondary,
            headerTitleStyle: {
                // fontFamily: "Proxima Nova",
                fontSize: 21
            },
        }
    )
}

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const colors = useAppColors();
    return(
        <Stack.Navigator>
            {useScreenConfig().map(x=>{return(
                <Stack.Screen 
                    key={`screen-${x.name}`}
                    name={x.name} 
                    component={x.component} 
                    options={
                        ({ route, navigation}) => (
                            {...useHeaderOptions(), ...x.customOptions}
                        )
                    }
                />
            )})}
        </Stack.Navigator>
    )
}

export default StackNavigator;