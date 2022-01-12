import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useScreenConfig } from './configHooks';
import { useAppColors } from '../colors';
import MenuButton from "./menu-button";

export const useHeaderOptions = (navigation) => {
    const colors = useAppColors();
    return (
        {
            headerRight: () => (
                <MenuButton navigation={navigation} />
            ),
            headerStyle: {
                backgroundColor: colors.bgSecondary,
                textAlign: "center",
                borderBottomColor: colors.bgSecondaryLighter
            },
            headerTintColor: colors.foreSecondary,
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
    return(
        <Stack.Navigator>
            {useScreenConfig().map(x=>{return(
                <Stack.Screen 
                    key={`screen-${x.name}`}
                    name={x.name} 
                    component={x.component} 
                    options={
                        ({ navigation, route }) => (
                            {...useHeaderOptions(navigation), ...x.customOptions}
                        )
                    }
                />
            )})}
        </Stack.Navigator>
    )
}

export default StackNavigator;