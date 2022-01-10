import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useScreenConfig } from './configHooks';
import { useAppColors } from '../colors';
import MenuButton from "./menu-button";

export const useHeaderOptions = () => {
    const colors = useAppColors();
    return (
        {
            headerRight: () => (
                <MenuButton />
            ),
            headerStyle: {
                backgroundColor: colors.bg,
                textAlign: "center",
                borderBottomColor: colors.bgLighter
            },
            headerTintColor: colors.fore,
            headerTitleStyle: {
                // fontFamily: "Proxima Nova",
                fontSize: 25
            },
        }
    )
}

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const colors = useAppColors();
    const commonOptions = useHeaderOptions();
    return(
        <Stack.Navigator>
            {useScreenConfig().map(x=>{return(
                <Stack.Screen 
                    key={`screen-${x.name}`}
                    name={x.name} 
                    component={x.component} 
                    options={{...commonOptions, ...x.customOptions}}
                />
            )})}
        </Stack.Navigator>
    )
}

export default StackNavigator;