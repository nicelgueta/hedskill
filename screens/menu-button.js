import React from "react";
import {
    Menu,
    Divider,
    HamburgerIcon,
    Box,
    Pressable,
    Center,
    NativeBaseProvider,
  } from "native-base"
import { useAppColors } from "../colors";
import { useMenuOptions } from "./configHooks";

const MenuButton = (props) => {
    const colors = useAppColors();
    const menuOptions = useMenuOptions(props.navigation);
    const menuSections = Object.keys(menuOptions);
    return(
        <Center h="100%">
            <Box alignItems="flex-end">
                <Menu
                    w="190"
                    closeOnSelect={true}
                    trigger={(triggerProps) => {
                    return (
                        <Pressable {...triggerProps}>
                        <HamburgerIcon color={colors.foreSecondary}/>
                        </Pressable>
                    )
                    }}
                >
                    {
                        menuSections.map((x,i)=>{return(
                            <React.Fragment key={"menu-"+x}>
                                <Menu.Group title={x}>
                                    {
                                        menuOptions[x].map(y=>{return(
                                            <Menu.Item 
                                                key={"menu-item-"+y.item} 
                                                onPress={y.action}
                                            >
                                                {y.item}
                                            </Menu.Item>
                                        )})
                                    }
                                </Menu.Group>
                                {
                                    i === menuSections.length - 1 ? 
                                    null :
                                    <Divider mt="3" w="100%" />
                                }
                            </React.Fragment>
                        )})
                    }
                </Menu>
            </Box>
        </Center>
    )
}
export default MenuButton;