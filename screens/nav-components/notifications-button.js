import React from "react";
import {
    Box,
    Center,
    Icon,
    Menu,
    Pressable,
  } from "native-base"
import { useAppColors } from "../../colors";
import { useMenuOptions } from "../configHooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NotificationButton = (props) => {
    const colors = useAppColors();
    const menuOptions = useMenuOptions(props.navigation);
    const menuSections = Object.keys(menuOptions);
    return(
        <Center h="100%">
            <Box alignItems="flex-end">
                <Pressable onPress={()=> alert("open notifications modal")}>
                    <Icon
                        as={<MaterialCommunityIcons name="bell-outline" />}
                        size={5}
                        ml="2"
                        color={colors.foreSecondary}
                    />
                </Pressable>
            </Box>
        </Center>
    )
}
export default NotificationButton;